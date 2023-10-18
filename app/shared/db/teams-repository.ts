import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../schema";
import { Team, UserTeam } from "../types";

export const createTeamsRepository = (
  supabaseClient: SupabaseClient<Database>
) => ({
  fetchTeamsOfUser: async (userId: string): Promise<Team[]> => {
    const userteams = await supabaseClient
      .from("userteams")
      .select("*")
      .eq("userid", userId);

    const { data, error } = await supabaseClient
      .from("teams")
      .select(`id, description, name`)
      .in("id", [userteams.data?.map((x) => x.teamid)]);

    if (error) {
      console.error("Error fetching teams:", error);
      return [];
    }

    return data;
  },
  fetchTeamById: async (teamId: string): Promise<Team | undefined> => {
    const userteams = await supabaseClient
      .from("teams")
      .select("*")
      .eq("id", teamId);

    if (userteams.error) {
      console.error("Error occurred fetching Team by Id: ", userteams.error);
      return;
    }

    return userteams?.data?.length > 0 ? userteams.data[0] : undefined;
  },
  createNewTeam: async (team: Team, userId: string) => {
    const { data, error } = await supabaseClient.from("teams").insert({
      id: team.id,
      description: team.description,
      name: team.name,
    });

    if (error) {
      console.error("Error creating teams:", error);
      return;
    }

    const { data: data1, error: error1 } = await supabaseClient
      .from("userteams")
      .insert({ teamid: team.id, userid: userId });

    if (error1) {
      console.error("Error creating teams users relationship:", error);
      return;
    }

    return true;
  },
  deleteTeam: async (teamId: string) => {
    const { error } = await supabaseClient
      .from("teams")
      .delete()
      .eq("id", teamId);

    if (error) {
      console.error("Error creating teams:", error);
      return;
    }

    return true;
  },
});
