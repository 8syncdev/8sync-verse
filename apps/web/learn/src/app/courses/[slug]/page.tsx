import { Button, MarketingLayout } from "@8sync/ui";
import { ArrowLeft, BookOpen, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LearnFooter } from "@/components/learn-footer";
import { LearnNavbar } from "@/components/learn-navbar";

// Minimal static course data — replace with DB/CMS fetch in production
const coursesData: Record<
  string,
  { title: string; description: string; level: string; lessons: string[] }
> = {
  "nextjs-fullstack": {
    title: "Next.js Fullstack",
    description: "Build production-grade apps with Next.js 15 and the App Router.",
    level: "Intermediate",
    lessons: [
      "Introduction & Project Setup",
      "App Router Fundamentals",
      "Server Components",
      "Data Fetching Patterns",
      "API Routes with tRPC",
      "Authentication with NextAuth",
      "Database with Drizzle ORM",
      "Deployment on Vercel",
    ],
  },
  "ai-agent-dev": {
    title: "AI Agent Development",
    description: "Create autonomous agents with LangChain, tools, and memory.",
    level: "Advanced",
    lessons: [
      "LLM Fundamentals",
      "LangChain Setup",
      "Tool Calling",
      "Memory Systems",
      "Agent Loops",
      "Multi-Agent Orchestration",
    ],
  },
  "typescript-mastery": {
    title: "TypeScript Mastery",
    description: "From zero to expert with modern TypeScript patterns.",
    level: "Beginner",
    lessons: [
      "Types & Interfaces",
      "Generics",
      "Utility Types",
      "Conditional Types",
      "Declaration Files",
      "Advanced Patterns",
    ],
  },
  "database-design": {
    title: "Database Design",
    description: "Relational and document database design for scalable apps.",
    level: "Intermediate",
    lessons: [
      "Normalization",
      "Indexing Strategies",
      "Drizzle ORM",
      "MongoDB Patterns",
      "Migrations",
    ],
  },
  "web-security": {
    title: "Web Security",
    description: "Auth, CSRF, XSS, and production hardening essentials.",
    level: "Intermediate",
    lessons: ["OWASP Top 10", "Auth Best Practices", "CSRF & XSS", "HTTPS & HSTS", "Rate Limiting"],
  },
  "api-design": {
    title: "API Design",
    description: "REST and tRPC API design patterns for real-world apps.",
    level: "Beginner",
    lessons: ["REST Principles", "tRPC Setup", "Input Validation", "Error Handling", "Versioning"],
  },
};

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(coursesData).map((slug) => ({ slug }));
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const course = coursesData[slug];

  if (!course) {
    notFound();
  }

  return (
    <MarketingLayout navbar={<LearnNavbar />} footer={<LearnFooter />}>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        {/* Back link */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-sm text-verse-text-muted hover:text-verse-text-heading mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All Courses
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs px-2 py-0.5 rounded-full bg-verse-primary/10 text-verse-primary font-medium">
              {course.level}
            </span>
            <span className="flex items-center gap-1 text-xs text-verse-text-muted">
              <Clock className="h-3.5 w-3.5" />
              {course.lessons.length} lessons
            </span>
          </div>
          <h1 className="text-4xl font-bold text-verse-text-heading mb-3">{course.title}</h1>
          <p className="text-verse-text-muted text-lg">{course.description}</p>
        </div>

        {/* CTA */}
        <Button size="lg" className="mb-12">
          Start Learning
        </Button>

        {/* Curriculum */}
        <section>
          <h2 className="text-xl font-semibold text-verse-text-heading mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-verse-primary" />
            Curriculum
          </h2>
          <ol className="space-y-2">
            {course.lessons.map((lesson, i) => (
              <li
                key={lesson}
                className="flex items-center gap-3 rounded-lg border border-border/60 bg-card px-4 py-3 text-sm"
              >
                <CheckCircle className="h-4 w-4 text-verse-primary/40 shrink-0" />
                <span className="text-verse-text-muted mr-auto">
                  <span className="text-verse-text-heading font-medium">
                    {String(i + 1).padStart(2, "0")}.
                  </span>{" "}
                  {lesson}
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </MarketingLayout>
  );
}
