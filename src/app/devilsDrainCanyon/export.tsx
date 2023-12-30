"use client";

import { onExport } from "@/app/devilsDrainCanyon/exprt";
import { groupWpT } from "@/app/devilsDrainCanyon/getData";

export default function Export({ groupWps }: { groupWps: Array<groupWpT> }) {
  return <button onClick={() => onExport(groupWps)}>Export</button>;
}
