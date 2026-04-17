"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// Configuration
const CONFIG = {
  NODE_COLOR: 0x4fffb0,
  NODE_OPACITY: 0.5,
  NODE_RADIUS: 2.0, // mapped to Point size
  EDGE_COLOR: 0x4fffb0,
  EDGE_OPACITY_MAX: 0.12,
  EDGE_DISTANCE_THRESHOLD: 150,
  PULSAR_COLOR: 0xffffff,
  PULSAR_RADIUS: 2.5, // mapped to sphere radius in world space or point size
  PULSAR_OPACITY: 0.4,
  PULSAR_PAUSE_MS: 200,
  MOUSE_REPEL_RADIUS: 100,
  MOUSE_REPEL_STRENGTH: 2,
};

export const ThreeBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // SCENE SETUP
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 768;

    const scene = new THREE.Scene();

    // Setup camera so 1 unit roughly equals 1 pixel at z=0
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 2000);
    // distance required to make fov height match window height
    const cameraZ = height / (2 * Math.tan((camera.fov * Math.PI) / 360));
    camera.position.z = cameraZ;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // STATE
    const numNodes = isMobile ? 50 : 100;
    const numPulsars = isMobile ? 2 : 5;

    // Generate Nodes
    const nodes: {
      pos: THREE.Vector3;
      basePos: THREE.Vector3;
      velocity: THREE.Vector3;
      phase: number;
    }[] = [];

    const spreadX = width * 1.2;
    const spreadY = height * 1.2;
    const spreadZ = 200;

    for (let i = 0; i < numNodes; i++) {
      const x = (Math.random() - 0.5) * spreadX;
      const y = (Math.random() - 0.5) * spreadY;
      const z = (Math.random() - 0.5) * spreadZ;
      const vec = new THREE.Vector3(x, y, z);
      nodes.push({
        pos: vec.clone(),
        basePos: vec.clone(),
        velocity: new THREE.Vector3(0, 0, 0),
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Node Mesh (Points)
    const pointsGeo = new THREE.BufferGeometry();
    const pointsPos = new Float32Array(numNodes * 3);
    pointsGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(pointsPos, 3)
    );
    const pointsMat = new THREE.PointsMaterial({
      color: CONFIG.NODE_COLOR,
      size: CONFIG.NODE_RADIUS,
      transparent: true,
      opacity: CONFIG.NODE_OPACITY,
    });
    const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    
    // Group to hold the mesh so we can rotate the entire network
    const networkGroup = new THREE.Group();
    networkGroup.add(pointsMesh);
    scene.add(networkGroup);

    // Edges Mesh
    // Max possible edges is n(n-1)/2, but we cap it and use dynamic drawing
    const maxEdges = numNodes * 10; 
    const linesGeo = new THREE.BufferGeometry();
    const linesPos = new Float32Array(maxEdges * 6); // 2 verts per edge * 3
    const linesColors = new Float32Array(maxEdges * 8); // RGBA per vertex
    
    linesGeo.setAttribute("position", new THREE.BufferAttribute(linesPos, 3));
    linesGeo.setAttribute("color", new THREE.BufferAttribute(linesColors, 4));
    
    const linesMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      depthWrite: false,
    });
    const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
    networkGroup.add(linesMesh);

    // Pulsars Configuration
    const pulsarGeo = new THREE.SphereGeometry(CONFIG.PULSAR_RADIUS, 8, 8);
    const pulsarMat = new THREE.MeshBasicMaterial({
      color: CONFIG.PULSAR_COLOR,
      transparent: true,
      opacity: CONFIG.PULSAR_OPACITY,
      depthWrite: false,
    });

    type Pulsar = {
      mesh: THREE.Mesh;
      fromIdx: number;
      toIdx: number;
      progress: number;
      speed: number;
      pauseUntil: number;
    };

    const pulsars: Pulsar[] = [];
    for (let i = 0; i < numPulsars; i++) {
      const mesh = new THREE.Mesh(pulsarGeo, pulsarMat);
      mesh.visible = false; 
      networkGroup.add(mesh);

      pulsars.push({
        mesh,
        fromIdx: -1,
        toIdx: -1,
        progress: 0,
        speed: 1,
        pauseUntil: 0,
      });
    }

    // Mouse Tracking
    const mouse = new THREE.Vector2(-9999, -9999);
    const targetMouse = new THREE.Vector2(-9999, -9999);
    
    const onPointerMove = (e: PointerEvent) => {
      // transform to world units at z=0 plane
      targetMouse.x = e.clientX - width / 2;
      targetMouse.y = -(e.clientY - height / 2);
    };
    window.addEventListener("pointermove", onPointerMove);

    // Resize Handler
    const resizeObserver = new ResizeObserver(() => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.position.z = h / (2 * Math.tan((camera.fov * Math.PI) / 360));
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(document.body);

    // Animation Loop
    const clock = new THREE.Clock();
    let edgeConnections: number[][] = Array(numNodes).fill(0).map(() => []);

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Slow overall rotation
      networkGroup.rotation.y += delta * 0.05;

      // Mouse smoothing
      mouse.lerp(targetMouse, 0.1);

      edgeConnections = Array(numNodes).fill(0).map(() => []);

      // 1. Update Nodes
      const positions = pointsMesh.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < numNodes; i++) {
        const node = nodes[i];
        
        // Sinusoidal drift
        node.basePos.y += Math.sin(time + node.phase) * delta * 5;
        node.basePos.x += Math.cos(time * 0.8 + node.phase) * delta * 5;

        // Mouse Repulse
        // Map node position from local group space to screen space to check with mouse vector
        const nodeWorld = node.pos.clone().applyMatrix4(networkGroup.matrixWorld);
        const dist = nodeWorld.distanceTo(new THREE.Vector3(mouse.x, mouse.y, nodeWorld.z));

        if (dist < CONFIG.MOUSE_REPEL_RADIUS) {
          const force = (CONFIG.MOUSE_REPEL_RADIUS - dist) / CONFIG.MOUSE_REPEL_RADIUS;
          const push = nodeWorld.clone().sub(new THREE.Vector3(mouse.x, mouse.y, nodeWorld.z)).normalize().multiplyScalar(force * CONFIG.MOUSE_REPEL_STRENGTH);
          node.velocity.add(push);
        }

        // Return to base
        node.velocity.add(node.basePos.clone().sub(node.pos).multiplyScalar(0.05));
        node.velocity.multiplyScalar(0.9); // friction
        node.pos.add(node.velocity);

        positions[i * 3] = node.pos.x;
        positions[i * 3 + 1] = node.pos.y;
        positions[i * 3 + 2] = node.pos.z;
      }
      pointsMesh.geometry.attributes.position.needsUpdate = true;

      // 2. Compute Edges
      let edgeCount = 0;
      const t = CONFIG.EDGE_DISTANCE_THRESHOLD;
      const tSq = t * t;

      for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
          const ni = nodes[i];
          const nj = nodes[j];

          // Manhattan boundary cheap check
          if (
            Math.abs(ni.pos.x - nj.pos.x) > t ||
            Math.abs(ni.pos.y - nj.pos.y) > t ||
            Math.abs(ni.pos.z - nj.pos.z) > t
          ) {
            continue;
          }

          const distSq = ni.pos.distanceToSquared(nj.pos);
          if (distSq < tSq) {
            edgeConnections[i].push(j);
            edgeConnections[j].push(i);

            if (edgeCount < maxEdges) {
              const dist = Math.sqrt(distSq);
              const opacity = (1 - dist / t) * CONFIG.EDGE_OPACITY_MAX;

              // Setup line verts
              linesPos[edgeCount * 6] = ni.pos.x;
              linesPos[edgeCount * 6 + 1] = ni.pos.y;
              linesPos[edgeCount * 6 + 2] = ni.pos.z;

              linesPos[edgeCount * 6 + 3] = nj.pos.x;
              linesPos[edgeCount * 6 + 4] = nj.pos.y;
              linesPos[edgeCount * 6 + 5] = nj.pos.z;

              // Is there a pulsar on this edge?
              let drawBright = false;
              for (const p of pulsars) {
                if (
                  (p.fromIdx === i && p.toIdx === j) ||
                  (p.fromIdx === j && p.toIdx === i)
                ) {
                  drawBright = true;
                  break;
                }
              }

              const finalOpacity = drawBright ? 0.25 : opacity;
              
              const hexColor = CONFIG.EDGE_COLOR;
              const r = ((hexColor >> 16) & 255) / 255;
              const g = ((hexColor >> 8) & 255) / 255;
              const b = (hexColor & 255) / 255;

              // Node A color
              linesColors[edgeCount * 8] = r;
              linesColors[edgeCount * 8 + 1] = g;
              linesColors[edgeCount * 8 + 2] = b;
              linesColors[edgeCount * 8 + 3] = finalOpacity;

              // Node B color
              linesColors[edgeCount * 8 + 4] = r;
              linesColors[edgeCount * 8 + 5] = g;
              linesColors[edgeCount * 8 + 6] = b;
              linesColors[edgeCount * 8 + 7] = finalOpacity;

              edgeCount++;
            }
          }
        }
      }
      
      linesGeo.setDrawRange(0, edgeCount * 2);
      linesGeo.attributes.position.needsUpdate = true;
      linesGeo.attributes.color.needsUpdate = true;

      // 3. Update Pulsars
      for (let i = 0; i < numPulsars; i++) {
        const p = pulsars[i];
        const now = performance.now();

        if (p.pauseUntil > now) continue;

        // Needs new destination?
        if (p.fromIdx === -1 || p.toIdx === -1) {
          // find random node with connections
          let validStart = -1;
          for (let attempt = 0; attempt < 10; attempt++) {
            const idx = Math.floor(Math.random() * numNodes);
            if (edgeConnections[idx].length > 0) {
              validStart = idx;
              break;
            }
          }
          if (validStart !== -1) {
            p.fromIdx = validStart;
            const neighbors = edgeConnections[validStart];
            p.toIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
            p.progress = 0;
            p.speed = 1 / (1.5 + Math.random() * 1.5); // 1.5s to 3s travel
            p.mesh.visible = true;
          }
        }

        if (p.fromIdx !== -1 && p.toIdx !== -1) {
          const fromPos = nodes[p.fromIdx].pos;
          const toPos = nodes[p.toIdx].pos;

          p.progress += delta * p.speed;

          if (p.progress >= 1) {
            p.mesh.position.copy(toPos);
            // Snap & Pause
            p.pauseUntil = now + CONFIG.PULSAR_PAUSE_MS;
            p.fromIdx = p.toIdx;
            
            // Pick next
            const neighbors = edgeConnections[p.toIdx];
            if (neighbors.length > 0) {
              p.toIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
            } else {
              // Dead end
              p.fromIdx = -1;
              p.toIdx = -1;
              p.mesh.visible = false;
            }
            p.progress = 0;
          } else {
            // lerp
            p.mesh.position.lerpVectors(fromPos, toPos, p.progress);
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      pointsGeo.dispose();
      pointsMat.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      pulsarGeo.dispose();
      pulsarMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[-1] bg-bgPrimary"
    />
  );
};
