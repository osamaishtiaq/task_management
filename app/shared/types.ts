import { Database } from "./schema";

export type Team = Database["public"]["Tables"]["teams"]["Row"];
export type UserTeam = Database["public"]["Tables"]["userteams"]["Row"];

export type TaskStatus = Database["public"]["Enums"]["taskstatus"];

export type Task = Database["public"]["Tables"]["tasks"]["Row"];
