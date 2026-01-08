"use client";

import { useState } from "react";
import { Crown, ScrollText, Trophy, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AddTaskModal } from "@/components/add-task-modal";
import { TasksTab } from "@/components/tasks-tab";
import { AchievementsTab } from "@/components/achievements-tab";
import { KnightDashboard } from "@/components/knight-dashboard";
import { logOutKnight } from "@/app/login/action";

export function DashboardTabs({ user }: any) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  return (
    <>
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">
                Knight Quest
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setIsAddTaskOpen(true)}
                size="sm"
                className="gap-2 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Add Quest
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 cursor-pointer"
                onClick={logOutKnight}
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl p-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
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

          <TabsContent value="overview" className="space-y-6">
            <KnightDashboard />
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <TasksTab onAddTask={() => setIsAddTaskOpen(true)} />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <AchievementsTab />
          </TabsContent>
        </Tabs>
      </div>

      <AddTaskModal
        id={user.id}
        open={isAddTaskOpen}
        onOpenChange={setIsAddTaskOpen}
      />
    </>
  );
}
