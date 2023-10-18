"use client";

import { Task } from "@/app/shared/types";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="task-card flex flex-col max-h-96 h-52 cursor-pointer mb-2 mt-2 text-slate-800 bg-slate-200">
      <h3 className="text-lg p-2 font-bold">{task?.title}</h3>
      <p className="overflow-y-clip p-2 text-sm">{task?.description}</p>
    </div>
  );
}
