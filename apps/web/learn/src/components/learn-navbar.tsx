"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Button } from "@8sync/ui";

export function LearnNavbar() {
  return (
    <nav className="flex w-full items-center justify-between">
      <Link href="/" className="flex items-center gap-2 font-bold text-lg text-verse-text-heading">
        <BookOpen className="h-5 w-5 text-verse-primary" />
        <span>8Sync <span className="text-verse-primary">Learn</span></span>
      </Link>
      <div className="flex items-center gap-6 text-sm text-verse-text-muted">
        <Link href="/courses" className="hover:text-verse-text-heading transition-colors">
          Courses
        </Link>
        <Button size="sm">Get Started</Button>
      </div>
    </nav>
  );
}
