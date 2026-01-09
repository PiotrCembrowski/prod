"use client";

import { useState } from "react";
import { Crown, ScrollText, Trophy, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AddTaskModal } from "@/components/add-task-modal";
import TasksTab from "./tasks-tab";
import { AchievementsTab } from "./achievements-tab";
import { KnightDashboard } from "./knight-dashboard";
import { logOutKnight } from "@/app/login/action";

export default function DashboardShell({ user }: any) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  return (
    <>
      <nav className="border-b">
        <div className="flex justify-between p-4">
          <Crown />
          <Button onClick={() => setIsAddTaskOpen(true)}>
            <Plus /> Add Quest
          </Button>
        </div>
      </nav>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <KnightDashboard />
        </TabsContent>

        <TabsContent value="tasks">
          <TasksTab userId={user.id} />
        </TabsContent>

        <TabsContent value="achievements">
          <AchievementsTab />
        </TabsContent>
      </Tabs>

      <AddTaskModal
        id={user.id}
        open={isAddTaskOpen}
        onOpenChange={setIsAddTaskOpen}
      />
    </>
  );
}
