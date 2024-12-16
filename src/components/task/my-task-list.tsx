"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TaskList, TaskListCol } from "./task-list";
import { Plus } from "lucide-react";
import { useMyTasks } from "@/hooks/use-my-tasks";

export const MyTaskList = () => {
  const { tasks } = useMyTasks();
  const cols = new Set<TaskListCol>(["title", "creator", "status", "actions"]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">My Tasks</h1>
        <Link href="/task/create">
          <Button variant="secondary">
            <Plus />
            Create Task
          </Button>
        </Link>
      </div>
      <TaskList cols={cols} tasks={tasks} />
    </div>
  );
};