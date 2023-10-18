import { Task, TaskStatus } from "@/app/shared/types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { taskSchema } from "./validation";
import { Database } from "@/app/shared/schema";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const requestUrl = new URL(request.url);
  const formData = await request.formData();

  const validatedTask = taskSchema.safeParse(formData);

  if (!validatedTask.success) {
    return NextResponse.json({ success: false, error: validatedTask.error });
  }

  const taskId = validatedTask.data.id ? validatedTask.data.id : randomUUID();

  const updatedTask: Task = {
    ...validatedTask.data,
    created_at: new Date().toUTCString(),
    id: taskId,
    status: validatedTask.data.status as TaskStatus,
    created_by: (await supabase.auth.getUser()).data.user?.id || "",
    modified_at: new Date().toUTCString(),
  };

  await supabase.from("tasks").insert(updatedTask);
  return NextResponse.redirect(
    `${requestUrl.origin}/task?teamId=${validatedTask.data.team}&taskId=${taskId}`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  );
}
