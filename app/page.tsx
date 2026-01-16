import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sword, Shield, Trophy, Target } from "lucide-react";
import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) {
    console.log("❌ Dashboard Access Denied");
    console.log("   Cookie Header:", headersList.get("cookie"));
  }

  const user = session?.user;

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-foreground"
          >
            <Shield className="h-6 w-6 text-primary" />
            <span>Knight Quest</span>
          </Link>

          <div className="flex items-center gap-3">
            <Button
              asChild
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href={user ? "/dashboard" : "/register"}>
                {user ? "Dashboard" : "Get Started"}
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="text-foreground hover:text-primary"
            >
              <Link href={user ? "/" : "/login"}>
                {user ? "Sign Out" : "Sign In"}
              </Link>
            </Button>
          </div>
        </nav>
      </header>
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary">
            <Sword className="h-4 w-4" />
            <span>Gamified Productivity System</span>
          </div>

          <h1 className="mb-6 text-balance font-sans text-5xl font-bold tracking-tight text-foreground md:text-7xl">
            Forge Your Legend,
            <br />
            <span className="text-primary">One Quest at a Time</span>
          </h1>

          <p className="mb-12 text-pretty text-lg text-muted-foreground md:text-xl">
            Transform your daily tasks into epic quests. Level up your knight
            character, earn achievements, and conquer your goals in this
            medieval-themed productivity adventure.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/register">
                <Sword className="mr-2 h-5 w-5" />
                Begin Your Journey
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/20 text-foreground hover:bg-primary/10 bg-transparent"
            >
              <Link href="/login">
                <Shield className="mr-2 h-5 w-5" />
                Sign In
              </Link>
            </Button>
          </div>
        </div>

        {/* Decorative Knight Image */}
        <div className="relative z-10 mt-16 w-full max-w-2xl">
          <Image
            src="/pixel-art-.jpg"
            alt="Knight character"
            width={800}
            height={600}
            className="mx-auto h-auto w-full rounded-xl border border-border shadow-2xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">
            Your Path to Productivity
          </h2>
          <p className="mb-16 text-center text-lg text-muted-foreground">
            Every task completed brings you closer to knighthood
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border bg-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                Quest System
              </h3>
              <p className="text-muted-foreground">
                Turn your tasks into quests with difficulty levels and XP
                rewards
              </p>
            </Card>

            <Card className="border-border bg-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Sword className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                Level Up Your Knight
              </h3>
              <p className="text-muted-foreground">
                Watch your character evolve from squire to legendary warrior
              </p>
            </Card>

            <Card className="border-border bg-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                Track Your Stats
              </h3>
              <p className="text-muted-foreground">
                Monitor your productivity with RPG-style attributes and charts
              </p>
            </Card>

            <Card className="border-border bg-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                Unlock Achievements
              </h3>
              <p className="text-muted-foreground">
                Earn badges and titles as you conquer your productivity goals
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
            Ready to Start Your Quest?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join the ranks of productive knights and transform how you tackle
            your daily tasks
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/register">
              <Shield className="mr-2 h-5 w-5" />
              Create Your Knight
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
