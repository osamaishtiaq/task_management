import {
  User,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { taskStatuses } from "../shared/config";
import { Task, Team } from "../shared/types";
import { Database } from "../shared/schema";
import { cookies } from "next/headers";
import { createTasksRepository } from "../shared/db/tasks.repository";
import { createUsersRepository } from "../shared/db/users-repository";
import { createTeamsRepository } from "../shared/db/teams-repository";
import { TaskForm } from "./components/TaskForm";

export default async function Task({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  let selectedTask: Task | undefined;
  let usersOfTeam: User[] = [];
  let currentUser = (await supabase.auth.getSession()).data.session?.user;
  let currTeam: Team | undefined;

  const currentSelectedTaskId = searchParams?.id;
  const currentSelectedTeam = searchParams?.teamId;

  if (currentSelectedTaskId) {
    const taskRepo = createTasksRepository(supabase);
    selectedTask = await taskRepo.fetchTaskBy(currentSelectedTaskId || "");

    usersOfTeam = await createUsersRepository(supabase).fetchUsersByTeam(
      selectedTask?.team || ""
    );
  }

  const teamRepo = createTeamsRepository(supabase);
  currTeam = await teamRepo.fetchTeamById(currentSelectedTeam || "");

  return !currentSelectedTaskId ? (
    <div className="animate-in flex-1 flex flex-col w-full px-8 justify-center gap-2">
      <TaskForm
        currTeam={currTeam}
        currentUser={currentUser}
        taskStatuses={taskStatuses}
        usersOfTeam={usersOfTeam}
      />
    </div>
  ) : (
    <div className="animate-in flex-1 flex flex-col w-full px-8 justify-center gap-2">
      <h1>{selectedTask?.title}</h1>
    </div>
  );
}
