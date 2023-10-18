"use client";

import { Task } from "@/app/shared/types";
import TaskCard from "./TaskCard";

export default function TaskList({
  columnHeading,
  taskList,
}: {
  columnHeading: string;
  taskList: Task[];
}) {
  return (
    <div className="flex flex-col px-2 py-2 border-solid border-2 border-slate-500 mr-2">
      <h2 className="px-1 py-1 text-2xl">{columnHeading}</h2>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      <div className="task-list-container flex flex-col px-1 py-1 lg:w-96 w-80 overflow-auto">
        {taskList.length === 0 ? (
          <p className="p-12 text-center">No Tasks</p>
        ) : (
          taskList.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
