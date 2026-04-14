import { DashboardLayout } from "@8sync/ui";
import { Button } from "@8sync/ui";
import { Bot, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

function AgentSidebar() {
  return (
    <div className="flex flex-col h-full p-4 gap-2">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-verse-primary" />
        <span className="font-semibold text-sm">8 Sync Agent</span>
      </div>
      <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-verse-primary/10 text-verse-primary text-sm font-medium">
        <Bot className="h-4 w-4" /> Home
      </Link>
      <Link href="/chat" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-verse-surface text-sm">
        <Sparkles className="h-4 w-4" /> Chat
      </Link>
      <Link href="/agents" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-verse-surface text-sm">
        <Bot className="h-4 w-4" /> Agents
      </Link>
    </div>
  );
}

export default function HomePage() {
  return (
    <DashboardLayout sidebar={<AgentSidebar />} header={<span className="font-semibold text-sm">AI Agent Platform</span>}>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
        <div className="inline-flex p-4 rounded-verse-xl bg-verse-primary/10">
          <Sparkles className="h-10 w-10 text-verse-primary" />
        </div>
        <h1 className="text-4xl font-bold text-verse-text-heading">
          Welcome to <span className="text-gradient">8 Sync Agent</span>
        </h1>
        <p className="text-verse-text-muted max-w-md">
          Your AI-powered workspace. Start a conversation or explore the agent marketplace.
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/chat">Start Chat <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/agents">Browse Agents</Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
