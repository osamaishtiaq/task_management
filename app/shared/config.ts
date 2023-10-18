import { config } from "strongly-env";
import { TaskStatus } from "./types";

export const supabase_url = config.loadString("NEXT_PUBLIC_SUPABASE_URL");
export const anon_key = config.loadString("NEXT_PUBLIC_SUPABASE_ANON_KEY");
export const nodeEnv = config.loadString("NODE_ENV", "development");

export const taskStatuses: TaskStatus[] = [
  "ToDo",
  "InProgress",
  "InReview",
  "Testing",
  "Done",
];
