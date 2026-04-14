import { Button, MarketingLayout } from "@8sync/ui";
import { ArrowRight, BookOpen, Code2, Cpu } from "lucide-react";
import Link from "next/link";
import { LearnFooter } from "@/components/learn-footer";
import { LearnNavbar } from "@/components/learn-navbar";

const featuredCourses = [
  {
    slug: "nextjs-fullstack",
    title: "Next.js Fullstack",
    description: "Build production-grade apps with Next.js 15",
    icon: Code2,
  },
  {
    slug: "ai-agent-dev",
    title: "AI Agent Development",
    description: "Create autonomous agents with LangChain & tools",
    icon: Cpu,
  },
  {
    slug: "typescript-mastery",
    title: "TypeScript Mastery",
    description: "From zero to expert with modern TypeScript",
    icon: BookOpen,
  },
];

export default function HomePage() {
  return (
    <MarketingLayout navbar={<LearnNavbar />} footer={<LearnFooter />}>
      {/* Hero */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-verse-primary/10 px-4 py-1.5 text-sm text-verse-primary mb-6">
          <BookOpen className="h-4 w-4" />
          <span>Learn · Build · Sync</span>
        </div>
        <h1 className="text-5xl font-bold text-verse-text-heading mb-4">
          Master <span className="text-gradient">Modern Tech</span>
          <br />
          with 8Sync Verse
        </h1>
        <p className="text-verse-text-muted text-lg max-w-xl mx-auto mb-8">
          Structured courses on Next.js, AI agents, TypeScript, and more — built for engineers who
          ship.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/courses">
              Browse Courses <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured courses */}
      <section className="container mx-auto px-4 pb-24">
        <h2 className="text-2xl font-bold text-verse-text-heading mb-8">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCourses.map(({ slug, title, description, icon: Icon }) => (
            <Link
              key={slug}
              href={`/courses/${slug}`}
              className="group rounded-verse-xl border border-border/60 bg-card p-6 hover:border-verse-primary/60 transition-colors"
            >
              <div className="mb-4 inline-flex rounded-lg bg-verse-primary/10 p-2">
                <Icon className="h-5 w-5 text-verse-primary" />
              </div>
              <h3 className="font-semibold text-verse-text-heading mb-1 group-hover:text-verse-primary transition-colors">
                {title}
              </h3>
              <p className="text-sm text-verse-text-muted">{description}</p>
            </Link>
          ))}
        </div>
      </section>
    </MarketingLayout>
  );
}
