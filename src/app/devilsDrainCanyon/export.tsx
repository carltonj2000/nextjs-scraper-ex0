"use client";

import { groupWpT } from "@/app/devilsDrainCanyon/dataSrc";
import { onExport } from "@/app/devilsDrainCanyon/exprt";

export default function Export({ groupWps }: { groupWps: Array<groupWpT> }) {
  return (
    <button className="bg-pink-100" onClick={() => onExport(groupWps)}>
      Export
    </button>
  );
}
