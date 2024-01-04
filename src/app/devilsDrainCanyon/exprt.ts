"use server";
import fs from "fs";
import path from "path";

import { dataSrc, wpT } from "@/app/devilsDrainCanyon/dataSrc";
import { groupWpT } from "@/app/devilsDrainCanyon/getData";

export const onExport = (groupWps: Array<groupWpT>) => {
  console.log("exporting ...");
  const filename = dataSrc.inputs[dataSrc.idx].filename;
  const dir = path.dirname(filename);
  const base = path.basename(filename);
  const ext = path.extname(filename);
  const fout = path.join(dir, base.replace(ext, "") + ".gpx");
  fs.writeFileSync(fout, exportGpx(groupWps));
  console.log("exported");
};

const exportGpx = (groupWps: Array<groupWpT>) => {
  const wps = groupWps[0].wps
    .map((wps: wpT) => {
      const { wgs84, name, elevation, details } = wps;
      const lat = wgs84!.lat.split(" ")[1];
      const lng = wgs84!.lng.split(" ")[1];
      return `
	<rtept lat="${lat}" lon="${lng}">
		<ele>${elevation!.split(" ")[0]}</ele>
		<name>${name}</name>
		<desc>${details}</desc>
	</rtept>
      `;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.0">
<name>Example gpx</name>
<rte>
<name>Route Name</name>
<desc>Route Description</desc>
${wps}
<rte>
</gpx>`;
};
