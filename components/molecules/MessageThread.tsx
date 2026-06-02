"use client";

import * as React from "react";
import { MessageBubble } from "@/components/molecules/MessageBubble";
import { MessageInput } from "@/components/molecules/MessageInput";
import type { Message } from "@/lib/dashboard-data";

interface MessageThreadProps {
  messages: Message[];
  applicationCode: string;
}

export function MessageThread({ messages: initialMessages, applicationCode }: MessageThreadProps) {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const [isSending, setIsSending] = React.useState(false);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(text: string) {
    const optimistic: Message = {
      id: `opt-${Date.now()}`,
      sender: "client",
      senderName: "You",
      body: text,
      sentAt: new Date().toISOString(),
      status: "sending",
    };
    setMessages((prev) => [...prev, optimistic]);
    setIsSending(true);

    // Mock: resolve after 1.2s
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === optimistic.id ? { ...m, status: "sent" } : m
        )
      );
      setIsSending(false);
    }, 1200);
  }

  return (
    <div className="flex flex-col" aria-label={`Message thread for ${applicationCode}`}>
      {/* Thread */}
      <div
        role="log"
        aria-live="polite"
        aria-label="Message history"
        className="flex flex-col gap-1 overflow-y-auto max-h-[500px] py-4"
      >
        {messages.length === 0 && (
          <p className="text-center font-sans text-[13px] text-[var(--ink-muted)] py-8">
            No messages yet. Send a message to your agent below.
          </p>
        )}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} aria-hidden="true" />
      </div>

      {/* Composer */}
      <MessageInput onSend={handleSend} isSending={isSending} />
    </div>
  );
}
