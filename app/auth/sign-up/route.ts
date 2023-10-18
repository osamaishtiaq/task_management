import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { nodeEnv } from "../../shared/config";
import { createTeamsRepository } from "@/app/shared/db/teams-repository";
import { randomUUID } from "crypto";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const fullname = String(formData.get("fullname"));

  const supabase = createRouteHandlerClient({ cookies });

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      data: {
        fullname,
      },
    },
  });

  // create default team for the user
  const teamsRepository = createTeamsRepository(supabase);
  await teamsRepository.createNewTeam(
    {
      description: `Personal Board for ${fullname}`,
      id: randomUUID(),
      name: "My Board",
    },
    data.user?.id || ""
  );

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Could not authenticate user`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  return NextResponse.redirect(
    nodeEnv === "development"
      ? `${requestUrl.origin}/login`
      : `${requestUrl.origin}/login?message=Check email to continue sign in process`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  );
}
