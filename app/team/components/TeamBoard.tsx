"use client";

import { Task, Team } from "@/app/shared/types";
import TaskList from "../../task/components/TaskList";
import { useRouter } from "next/navigation";

export default function TeamBoard({
  taskStatuses,
  team,
  taskList,
}: {
  taskStatuses: string[];
  team?: Team;
  taskList: Task[];
}) {
  const router = useRouter();

  function createNewTask(): void {
    router.push("/task?teamId=" + team?.id);
  }

  return (
    <div className="flex flex-col mb-8 border-solid border-2 border-slate-500 h-screen max-w-full">
      <div className="flex flex-row text-foreground px-2 py-2 justify-between">
        <h2 className="py-2 text-3xl">{team?.name}</h2>
        <div className="flex flex-row">
          <button
            onClick={createNewTask}
            className="bg-green-700 rounded px-4 py-2 text-white mb-2 ml-4"
          >
            New Issue
          </button>
        </div>
      </div>
      <div className="flex flex-row px-2 py-2 justify-start mr-4 p-8 text-white  overflow-x-auto">
        {taskStatuses.map((taskStatus) => {
          const filteredTasks = taskList.filter((x) => x.status === taskStatus);
          return (
            <TaskList
              columnHeading={taskStatus}
              taskList={filteredTasks}
              key={taskStatus}
            />
          );
        })}
      </div>
    </div>
  );
}
