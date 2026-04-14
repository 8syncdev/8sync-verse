import { DashboardLayout } from "@8sync/ui";
import { Button } from "@8sync/ui";
import { Bot, Sparkles, Zap, Brain, Code2 } from "lucide-react";
import Link from "next/link";

function AgentSidebar() {
  return (
    <div className="flex flex-col h-full p-4 gap-2">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-verse-primary" />
        <span className="font-semibold text-sm">8 Sync Agent</span>
      </div>
      <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-verse-surface text-sm">
        <Bot className="h-4 w-4" /> Home
      </Link>
      <Link href="/chat" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-verse-surface text-sm">
        <Sparkles className="h-4 w-4" /> Chat
      </Link>
      <Link href="/agents" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-verse-primary/10 text-verse-primary text-sm font-medium">
        <Bot className="h-4 w-4" /> Agents
      </Link>
    </div>
  );
}

const AGENTS = [
  {
    id: "code-assistant",
    name: "Code Assistant",
    description: "Helps you write, review, and debug code across any language.",
    icon: Code2,
    category: "Development",
  },
  {
    id: "research-agent",
    name: "Research Agent",
    description: "Deep-dives into topics and synthesizes information for you.",
    icon: Brain,
    category: "Research",
  },
  {
    id: "automation-agent",
    name: "Automation Agent",
    description: "Automates repetitive tasks and workflows with AI.",
    icon: Zap,
    category: "Productivity",
  },
];

export default function AgentsPage() {
  return (
    <DashboardLayout sidebar={<AgentSidebar />} header={<span className="font-semibold text-sm">Agent Marketplace</span>}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-verse-text-heading mb-2">Agent Marketplace</h1>
          <p className="text-verse-text-muted">Discover and deploy AI agents for every task.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AGENTS.map((agent) => {
            const Icon = agent.icon;
            return (
              <div key={agent.id} className="rounded-verse-xl border border-border bg-card p-5 flex flex-col gap-3 hover:border-verse-primary/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-verse-lg bg-verse-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-verse-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{agent.name}</div>
                    <div className="text-xs text-verse-text-muted">{agent.category}</div>
                  </div>
                </div>
                <p className="text-sm text-verse-text-muted flex-1">{agent.description}</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/chat?agent=${agent.id}`}>Use Agent</Link>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
