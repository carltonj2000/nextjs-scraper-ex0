import { dataSourceT } from "@/app/devilsDrainCanyon/getData";

export enum inputFromE {
  file = "file",
  url = "url",
}

const filename = [
  "/media/renderws/carltonData/cj2023/hikingEtc/carlVinegaroonDv/VinegaroonCanyonDeathValley.html",
  "/media/renderws/carltonData/cj2023/hikingEtc/gabyDevilsDrainCanyon/lake-mead_devils-drain.html",
];

const url = [
  "https://bluugnome.com/cyn_route/dv/dv_vinegaroon/dv_vinegaroon.aspx",
  "https://www.bluugnome.com/cyn_route/lake-mead/lake-mead_devils-drain/lake-mead_devils-drain.aspx",
];

export const dataSrc: dataSourceT = {
  idx: 0,
  inputFrom: inputFromE.file,
  filename,
  url,
};
