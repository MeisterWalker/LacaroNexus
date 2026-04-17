"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTED_PROMPTS = [
  "What has he built?",
  "Is he available?",
  "What's his stack?",
];

export const PortfolioChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "> SYSTEM ONLINE. ASK ME ANYTHING.\n> \"What has he built?\" / \"Is he available?\" / \"What's his stack?\"",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const currentMessages = [...messages.filter(m => !m.content.includes("SYSTEM ONLINE")), userMessage];
      
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: currentMessages }),
      });

      if (!res.ok) {
        throw new Error("Failed response");
      }

      const data = await res.json();
      
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `> ${data.text}` },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "> CONNECTION ERROR. PLEASE TRY AGAIN LATER.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] font-mono text-xs flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-[320px] h-[420px] mb-4 bg-[rgba(4,8,12,0.95)] border border-[rgba(79,255,176,0.2)] backdrop-blur-md flex flex-col shadow-2xl"
          >
            <div className="border-b border-[rgba(79,255,176,0.1)] p-3 text-[#4FFFB0] tracking-widest text-[11px] flex justify-between items-center bg-[rgba(4,8,12,0.5)]">
              <span>[ ASK MY PORTFOLIO ]</span>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-white transition-colors px-2"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] whitespace-pre-wrap leading-relaxed ${
                    msg.role === "assistant"
                      ? "self-start text-[#4FFFB0] opacity-80"
                      : "self-end text-[rgba(226,232,240,0.8)] text-right"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              
              {messages.length === 1 && (
                <div className="flex flex-col gap-2 mt-2">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSend(prompt)}
                      className="self-start text-[10px] border border-[rgba(79,255,176,0.2)] px-2 py-1 text-[#4FFFB0] opacity-60 hover:opacity-100 hover:bg-[rgba(79,255,176,0.05)] transition-all text-left"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {isLoading && (
                <div className="self-start text-[#4FFFB0] opacity-80">
                  {">"} <span className="animate-pulse">...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-[rgba(79,255,176,0.1)] p-3 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
                className="bg-transparent border-none outline-none text-[rgba(226,232,240,0.8)] flex-1 placeholder:text-[rgba(226,232,240,0.3)]"
                placeholder="TYPE A QUERY..."
              />
              <button
                onClick={() => handleSend(inputValue)}
                disabled={isLoading || !inputValue.trim()}
                className="border border-[rgba(79,255,176,0.3)] text-[#4FFFB0] px-3 py-1 hover:bg-[rgba(79,255,176,0.1)] transition-colors disabled:opacity-50"
              >
                [ SEND ]
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-[rgba(4,8,12,0.9)] border border-[rgba(79,255,176,0.2)] text-[#4FFFB0] flex items-center justify-center relative backdrop-blur-md shadow-lg"
      >
        <span className="absolute inset-0 border border-[#4FFFB0] opacity-30 animate-pulse" />
        {"> _"}
      </button>
    </div>
  );
};
