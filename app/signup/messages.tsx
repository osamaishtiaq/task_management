"use client";

import { useSearchParams } from "next/navigation";

export default function Messages() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");
  return (
    <>
      {error && (
        <p className="mt-4 p-4  text-neutral-300 text-center bg-red-900">
          {error}
        </p>
      )}
      {message && (
        <p className="mt-4 p-4 bg-green-800 text-neutral-300 text-center">
          {message}
        </p>
      )}
    </>
  );
}
