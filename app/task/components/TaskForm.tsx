import { Task, TaskStatus, Team } from "@/app/shared/types";
import { User } from "@supabase/supabase-js";

export const TaskForm = ({
  currentUser,
  currTeam,
  usersOfTeam,
  taskStatuses,
  currTask,
}: {
  currentUser?: User;
  currTeam?: Team;
  usersOfTeam: User[];
  taskStatuses: TaskStatus[];
  currTask?: Task;
}) => {
  return (
    <form
      className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      action="/api/task"
      method="post"
    >
      <div className="flex flex-row">
        <div className="flex flex-col flex-1 min-w-100">
          <label className="text-md" htmlFor="title">
            Title
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="text"
            name="title"
            placeholder="Task Title"
            required
          />

          <label className="text-md" htmlFor="description">
            Description
          </label>
          <textarea
            className="rounded-md px-4 py-2 bg-inherit border mb-6 text-area block p-2.5 w-full text-sm h-80"
            name="description"
            placeholder="Task Description"
            required
          />
        </div>
        <div className="flex flex-col flex-initial ml-4 w-96">
          <label className="text-md" htmlFor="created_by">
            Owner
          </label>
          <span className="rounded-md px-4 py-2 bg-inherit border mb-6">
            {currentUser?.user_metadata.fullname}
          </span>

          <label className="text-md">Team</label>
          <span className="rounded-md px-4 py-2 bg-inherit border mb-6">
            {currTeam?.name}
          </span>

          <label className="text-md" htmlFor="assigned_to_name">
            Assign To
          </label>
          <select
            name="assigned_to_name"
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
          >
            <option key={currentUser?.id}>
              {currentUser?.user_metadata?.fullname}
            </option>
            {usersOfTeam.map((x) => (
              <option key={x.id} value={x.id}>
                {x.user_metadata?.fullname}
              </option>
            ))}
          </select>

          <label className="text-md" htmlFor="deadline">
            Deadline
          </label>
          <input
            className="bg-slate-200 text-slate-900 rounded-md px-4 py-2 bg-inherit border mb-6"
            type="date"
            name="deadline"
            placeholder="2023/12/12"
            required
          />

          <label className="text-md" htmlFor="status">
            Status
          </label>
          <select
            name="status"
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
          >
            {taskStatuses.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>

          <input type="hidden" name="team" value={currTeam?.id} />
          <input type="hidden" name="assigned_to" value={currentUser?.id} />

          <button className="bg-green-700 rounded px-4 py-2 text-white mb-2">
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};
