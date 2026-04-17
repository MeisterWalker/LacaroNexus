import { NextResponse } from "next/server";
import { chatSystemPrompt } from "../../../lib/data";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "Missing API Key" },
        { status: 500 }
      );
    }

    const anthropicPayload = {
      model: "claude-sonnet-4-6",
      max_tokens: 300,
      system: chatSystemPrompt,
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
    };

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify(anthropicPayload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Anthropic Error:", errorData);
      return NextResponse.json(
        { error: "Failed to connect to AI" },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // We expect the text content at data.content[0].text in standard Anthropic format
    if (data.content && data.content[0] && data.content[0].text) {
      return NextResponse.json({ text: data.content[0].text });
    }
    
    return NextResponse.json({ error: "No response text found" }, { status: 500 });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
