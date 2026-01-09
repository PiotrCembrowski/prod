"use client";

import { useState } from "react";
import { Crown, ScrollText, Trophy, Plus } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AddTaskModal } from "@/components/add-task-modal";
import TasksTab from "@/components/tasks-tab"; // ✅ server component
import { AchievementsTab } from "@/components/achievements-tab";
import { KnightDashboard } from "@/components/knight-dashboard";
import { logOutKnight } from "@/app/login/action";

type DashboardTabsProps = {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
  };
};

export function DashboardTabs({ user }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "tasks" | "achievements"
  >("overview");

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  return (
    <>
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-card/60 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Knight Quest</span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="gap-2"
              onClick={() => setIsAddTaskOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Quest
            </Button>

            <Button variant="ghost" size="sm" onClick={logOutKnight}>
              Log out
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl p-6">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as typeof activeTab)}
          className="space-y-6"
        >
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview" className="gap-2">
              <Crown className="h-4 w-4" />
              Overview
            </TabsTrigger>

            <TabsTrigger value="tasks" className="gap-2">
              <ScrollText className="h-4 w-4" />
              Tasks
            </TabsTrigger>

            <TabsTrigger value="achievements" className="gap-2">
              <Trophy className="h-4 w-4" />
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <KnightDashboard />
          </TabsContent>

          <TabsContent value="tasks">
            {/* ✅ Server component pulls tasks from DB */}
            <TasksTab
              userId={user.id}
              onAddTask={() => setIsAddTaskOpen(true)}
            />
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementsTab />
          </TabsContent>
        </Tabs>
      </main>

      {/* Add Task Modal */}
      <AddTaskModal
        id={user.id}
        open={isAddTaskOpen}
        onOpenChange={setIsAddTaskOpen}
      />
    </>
  );
}
