export type dataSourceT = {
  idx: number;
  inputFrom: inputFromE;
  inputs: Array<inputT>;
};
export type dataT = dataSourceT & {
  groupWps: Array<groupWpT>;
};

export type wgs84T = {
  lat: string;
  lng: string;
};

export type wpT = {
  name: string;
  wgs84?: wgs84T;
  elevation?: string;
  details?: string;
};

export type groupWpT = {
  name: string;
  details: string;
  wps: Array<wpT>;
};

export enum inputFromE {
  file = "file",
  url = "url",
}

export type inputT = {
  filename: string;
  url: string;
};

const inputs: Array<inputT> = [
  {
    filename:
      "/media/renderws/carltonData/cj2024/hiking/carlVinegaroonDv/VinegaroonCanyonDeathValley.html",
    url: "https://bluugnome.com/cyn_route/dv/dv_vinegaroon/dv_vinegaroon.aspx",
  },
  {
    filename:
      "/media/renderws/carltonData/cj2023/hikingEtc/carlVinegaroonDv/VinegaroonCanyonDeathValley.html",
    url: "https://bluugnome.com/cyn_route/dv/dv_vinegaroon/dv_vinegaroon.aspx",
  },
  {
    filename:
      "/media/renderws/carltonData/cj2023/hikingEtc/gabyDevilsDrainCanyon/lake-mead_devils-drain.html",
    url: "https://www.bluugnome.com/cyn_route/lake-mead/lake-mead_devils-drain/lake-mead_devils-drain.aspx",
  },
];

export const dataSrc: dataSourceT = {
  idx: 0,
  inputFrom: inputFromE.file,
  inputs,
};
