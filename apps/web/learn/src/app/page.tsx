import { Button } from "@8sync/ui";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex p-4 rounded-verse-xl bg-verse-primary/10 mb-6">
          <Sparkles className="h-8 w-8 text-verse-primary" />
        </div>
        <h1 className="text-4xl font-bold text-verse-text-heading mb-2">
          Learn <span className="text-gradient">App</span>
        </h1>
        <p className="text-verse-text-muted mb-6">Coming soon — 8 Sync Verse</p>
        <Button>
          Go to Main <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
