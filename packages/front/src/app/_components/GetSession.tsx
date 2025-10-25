"use client";

import { useSession } from "@/app/_hooks";

export default function GetSession() {
  useSession();
  return null;
}
