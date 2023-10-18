import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import DeployButton from "../components/DeployButton";
import { redirect } from "next/navigation";
import TeamBoard from "@/app/team/components/TeamBoard";
import { TeamCard } from "@/app/team/components/TeamCard";
import { Database } from "./shared/schema";
import { TaskStatus } from "./shared/types";
import { createTeamsRepository } from "./shared/db/teams-repository";
import { taskStatuses } from "./shared/config";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?message=Please login to use app");
  }

  const teams =
    (await createTeamsRepository(supabase).fetchTeamsOfUser(user.id)) ?? [];

  return (
    <div className="w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <DeployButton />
          {user ? (
            <div className="flex items-center gap-4">
              Hey, {user.user_metadata?.fullname ?? "there"}!
              <LogoutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-full px-8 text-foreground">
        <div className="flex flex-col items-center mb-2 mt-12 lg:mb-2">
          <h1 className="text-3xl">Your Teams/Boards</h1>
        </div>
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        <div className="w-full grid gap-x-8 gap-y-4 grid-cols-6">
          {teams.map((item) => (
            <TeamCard team={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
