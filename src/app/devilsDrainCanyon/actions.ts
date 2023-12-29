"use server";

import { SomeData } from "@/app/devilsDrainCanyon/getData";

export async function loadFile() {
  const data = await SomeData();
}
