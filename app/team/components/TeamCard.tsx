"use client";

import { Team } from "@/app/shared/types";
import { useRouter } from "next/navigation";

export function TeamCard({ team }: { team: Team }) {
  const router = useRouter();

  function onTeamButtonClick(): void {
    router.push("/team?id=" + team.id);
  }

  return (
    <button
      className="bg-slate-800 text-white w-30 h-40 w-40"
      onClick={onTeamButtonClick}
      key={team.name}
    >
      <h1 className="text-lg">{team.name}</h1>
      <p className="text-xs">{team.description}</p>
    </button>
  );
}
