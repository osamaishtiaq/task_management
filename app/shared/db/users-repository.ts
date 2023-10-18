import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../schema";

export const createUsersRepository = (
  supabaseClient: SupabaseClient<Database>
) => ({
  fetchUserById: async (userId: string) => {
    const { data, error } = await supabaseClient
      .from("users")
      .select(`*`)
      .eq("id", userId);

    if (error) {
      console.error("Error fetching user:", error);
      return;
    }

    return data;
  },
  fetchUsersByTeam: async (teamId: string) => {
    const { data } = await supabaseClient.auth.admin.listUsers({
      perPage: 500,
    });

    const { data: teamUsers, error } = await supabaseClient
      .from("userteams")
      .select(`*`)
      .eq("teamid", teamId);

    if (error) {
      console.error("Error fetching user:", error);
      return [];
    }

    // TODO: this is not efficient, creating a user table in public schema and joining will be better
    return data.users.filter((user) =>
      teamUsers.map((x) => x.userid).includes(user.id)
    );
  },
});
