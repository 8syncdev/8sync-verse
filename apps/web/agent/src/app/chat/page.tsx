import { Button, DashboardLayout } from "@8sync/ui";
import { Bot, Send, Sparkles } from "lucide-react";
import Link from "next/link";

function AgentSidebar() {
  return (
    <div className="flex flex-col h-full p-4 gap-2">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-verse-primary" />
        <span className="font-semibold text-sm">8 Sync Agent</span>
      </div>
      <Link
        href="/"
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-verse-surface text-sm"
      >
        <Bot className="h-4 w-4" /> Home
      </Link>
      <Link
        href="/chat"
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-verse-primary/10 text-verse-primary text-sm font-medium"
      >
        <Sparkles className="h-4 w-4" /> Chat
      </Link>
      <Link
        href="/agents"
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-verse-surface text-sm"
      >
        <Bot className="h-4 w-4" /> Agents
      </Link>
    </div>
  );
}

export default function ChatPage() {
  return (
    <DashboardLayout
      sidebar={<AgentSidebar />}
      header={<span className="font-semibold text-sm">Chat</span>}
    >
      <div className="flex flex-col h-full max-w-3xl mx-auto gap-6">
        <h1 className="text-2xl font-bold text-verse-text-heading">AI Chat</h1>

        {/* Message list placeholder */}
        <div className="flex-1 flex flex-col gap-4 min-h-[400px] rounded-verse-lg border border-border bg-card p-6">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-verse-primary/20 flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4 text-verse-primary" />
            </div>
            <div className="bg-verse-surface rounded-verse-lg px-4 py-2 text-sm max-w-[80%]">
              Hello! I am your 8 Sync AI assistant. How can I help you today?
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message…"
            className="flex-1 rounded-verse-lg border border-border bg-card px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-verse-primary/50"
          />
          <Button size="icon" aria-label="Send message">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
