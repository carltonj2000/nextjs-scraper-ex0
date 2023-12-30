"use server";
import path from "path";

import { dataSrc } from "@/app/devilsDrainCanyon/dataSrc";
import { groupWpT } from "@/app/devilsDrainCanyon/getData";

export const onExport = (groupWps: Array<groupWpT>) => {
  console.log("exporting ...");
  const filename = dataSrc.filename[dataSrc.idx];
  const dir = path.dirname(filename);
  const base = path.basename(filename);
  const ext = path.extname(filename);
  const fout = path.join(dir, base.replace(ext, "") + ".gpx");
  console.log({ dir, base, ext, fout });
  fs.writeFileSync(fout, JSON.stringify(groupWps, null, 2));
  console.log("exported");
};
