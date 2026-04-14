import { MarketingLayout } from "@8sync/ui";
import { BookOpen, Code2, Cpu, Database, Globe, Shield } from "lucide-react";
import Link from "next/link";
import { LearnFooter } from "@/components/learn-footer";
import { LearnNavbar } from "@/components/learn-navbar";

const courses = [
  {
    slug: "nextjs-fullstack",
    title: "Next.js Fullstack",
    description: "Build production-grade apps with Next.js 15 and the App Router",
    level: "Intermediate",
    lessons: 24,
    icon: Code2,
  },
  {
    slug: "ai-agent-dev",
    title: "AI Agent Development",
    description: "Create autonomous agents with LangChain, tools, and memory",
    level: "Advanced",
    lessons: 18,
    icon: Cpu,
  },
  {
    slug: "typescript-mastery",
    title: "TypeScript Mastery",
    description: "From zero to expert with modern TypeScript patterns",
    level: "Beginner",
    lessons: 30,
    icon: BookOpen,
  },
  {
    slug: "database-design",
    title: "Database Design",
    description: "Relational and document database design for scalable apps",
    level: "Intermediate",
    lessons: 16,
    icon: Database,
  },
  {
    slug: "web-security",
    title: "Web Security",
    description: "Auth, CSRF, XSS, and production hardening essentials",
    level: "Intermediate",
    lessons: 12,
    icon: Shield,
  },
  {
    slug: "api-design",
    title: "API Design",
    description: "REST and tRPC API design patterns for real-world apps",
    level: "Beginner",
    lessons: 20,
    icon: Globe,
  },
];

const levelColor: Record<string, string> = {
  Beginner: "text-green-400 bg-green-400/10",
  Intermediate: "text-yellow-400 bg-yellow-400/10",
  Advanced: "text-red-400 bg-red-400/10",
};

export default function CoursesPage() {
  return (
    <MarketingLayout navbar={<LearnNavbar />} footer={<LearnFooter />}>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-verse-text-heading mb-2">All Courses</h1>
        <p className="text-verse-text-muted mb-10">
          {courses.length} courses covering modern web development and AI.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(({ slug, title, description, level, lessons, icon: Icon }) => (
            <Link
              key={slug}
              href={`/courses/${slug}`}
              className="group flex flex-col rounded-verse-xl border border-border/60 bg-card p-6 hover:border-verse-primary/60 transition-colors"
            >
              <div className="mb-4 inline-flex rounded-lg bg-verse-primary/10 p-2 self-start">
                <Icon className="h-5 w-5 text-verse-primary" />
              </div>
              <h2 className="font-semibold text-verse-text-heading mb-1 group-hover:text-verse-primary transition-colors">
                {title}
              </h2>
              <p className="text-sm text-verse-text-muted flex-1 mb-4">{description}</p>
              <div className="flex items-center gap-3 text-xs">
                <span className={`px-2 py-0.5 rounded-full font-medium ${levelColor[level]}`}>
                  {level}
                </span>
                <span className="text-verse-text-muted">{lessons} lessons</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MarketingLayout>
  );
}
