import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { taskStatuses } from "../shared/config";
import { createTeamsRepository } from "../shared/db/teams-repository";
import { Task, Team } from "../shared/types";
import TeamBoard from "./components/TeamBoard";
import { Database } from "../shared/schema";
import { cookies } from "next/headers";
import { createTasksRepository } from "../shared/db/tasks.repository";

export default async function Team({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  let selectedTeam: Team | undefined;
  let teamTasks: Task[] = [];

  const supabase = createServerComponentClient<Database>({ cookies });

  const currentTeamSelectedId = searchParams?.id;

  const teamRepo = createTeamsRepository(supabase);
  selectedTeam = await teamRepo.fetchTeamById(currentTeamSelectedId || "");

  const taskRepo = createTasksRepository(supabase);
  teamTasks = await taskRepo.fetchTeamTasks(selectedTeam?.id || "");

  return selectedTeam === null ? (
    <h1 className="text-white p-96">Team not found</h1>
  ) : (
    <div className="animate-in flex-1 flex flex-col w-full px-8 justify-center gap-2">
      <h1>{selectedTeam?.name}</h1>
      <TeamBoard
        team={selectedTeam}
        taskStatuses={taskStatuses}
        key={selectedTeam?.id}
        taskList={teamTasks}
      />
    </div>
  );
}
