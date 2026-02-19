"use client";

import { useState } from "react";
import { Crown, ScrollText, Trophy, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import TasksTabClient from "@/components/tasks-tab-client";
import { AddTaskModal } from "@/components/add-task-modal";
import { AchievementsTab } from "@/components/achievements-tab";
import { KnightDashboard } from "@/components/knight-dashboard";
import { logOutKnight } from "@/app/login/action";
import { ClientOnly } from "./client-only";

export default function DashboardShell({
  user,
  tasks,
}: {
  user: { id: string };
  tasks: {
    id: number;
    title: string;
    description: string | null;
    xp: number;
    completed: boolean;
  }[];
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  return (
    <>
      {/* NAV */}
      <nav className="border-b bg-card/60 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Knight Quest</span>
          </div>

          <div className="flex gap-2">
            <Button size="sm" onClick={() => setIsAddTaskOpen(true)}>
              <Plus className="h-4 w-4 mr-1" /> Add Quest
            </Button>
            <Button size="sm" variant="ghost" onClick={logOutKnight}>
              Log out
            </Button>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="mx-auto max-w-7xl p-6">
        <ClientOnly>
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
            className="space-y-6"
          >
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="overview">
                <Crown className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="tasks">
                <ScrollText className="h-4 w-4 mr-2" />
                Tasks
              </TabsTrigger>
              <TabsTrigger value="achievements">
                <Trophy className="h-4 w-4 mr-2" />
                Achievements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <KnightDashboard />
            </TabsContent>

            <TabsContent value="tasks">
              <TasksTabClient tasks={tasks} />
            </TabsContent>

            <TabsContent value="achievements">
              <AchievementsTab tasks={tasks} />
            </TabsContent>
          </Tabs>
        </ClientOnly>
      </main>

      <AddTaskModal
        id={user.id}
        open={isAddTaskOpen}
        onOpenChange={setIsAddTaskOpen}
      />
    </>
  );
}
