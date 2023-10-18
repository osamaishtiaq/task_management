import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../schema";
import { Task, Team } from "../types";

export const createTasksRepository = (
  supabaseClient: SupabaseClient<Database>
) => ({
  fetchTeamTasks: async (teamId: string): Promise<Task[]> => {
    const teamTasks = await supabaseClient
      .from("tasks")
      .select("*")
      .eq("team", teamId);

    if (teamTasks.error) {
      console.error("Error fetching teams:", teamTasks.error);
      return [];
    }

    return teamTasks.data;
  },
  fetchTaskBy: async (taskId: string): Promise<Task | undefined> => {
    const teamTasks = await supabaseClient
      .from("tasks")
      .select("*")
      .eq("id", taskId);

    if (teamTasks.error) {
      console.error("Error fetching teams:", teamTasks.error);
      return;
    }

    return teamTasks?.data.length > 0 ? teamTasks.data[0] : undefined;
  },
  createNewTask: async (task: Task) => {
    const { data, error } = await supabaseClient.from("tasks").insert(task);

    if (error) {
      console.error("Error creating task:", error);
      return;
    }

    return true;
  },
  updateTask: async (taskUpdated: Task) => {
    const { data, error } = await supabaseClient
      .from("tasks")
      .upsert({ ...taskUpdated });

    if (error) {
      console.error("Error creating task:", error);
      return;
    }

    return taskUpdated;
  },
  deleteTask: async (taskId: string) => {
    const { data, error } = await supabaseClient
      .from("tasks")
      .delete()
      .eq("id", taskId);

    if (error) {
      console.error("Error creating task:", error);
      return;
    }

    return true;
  },
});
