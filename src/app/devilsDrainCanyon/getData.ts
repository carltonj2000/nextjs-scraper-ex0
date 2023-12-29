"use server";
import { inputFromE } from "@/app/devilsDrainCanyon/page";
import { readFile } from "fs/promises";
import { parse } from "node-html-parser";
import puppeteer from "puppeteer";

export type dataT = {
  inputFrom: inputFromE;
  filename: Array<string>;
  url: Array<string>;
  content: Array<string>;
  first: any;
  idx: number;
};

export type wgs84T = {
  lat: string;
  lng: string;
};

export type wpT = {
  name: string;
  wgs84: wgs84T;
  elevation: number;
  details: string;
};

export type groupWpT = {
  name: string;
  details: string;
  wps: Array<wpT>;
};

export async function SomeData(): Promise<dataT> {
  const idx = 0;
  const filename = [
    "/media/renderws/carltonData/cj2023/hikingEtc/carlVinegaroonDv/VinegaroonCanyonDeathValley.html",
    "/media/renderws/carltonData/cj2023/hikingEtc/gabyDevilsDrainCanyon/lake-mead_devils-drain.html",
  ];
  const url = [
    "https://bluugnome.com/cyn_route/dv/dv_vinegaroon/dv_vinegaroon.aspx",
    "https://www.bluugnome.com/cyn_route/lake-mead/lake-mead_devils-drain/lake-mead_devils-drain.aspx",
  ];

  const inputFrom: inputFromE = inputFromE.file;

  const content = inputFrom
    ? await parseSite(filename[idx])
    : await fetch(url[idx]);

  let first: Array<groupWpT> = [];
  content.forEach((item, idx) => {
    if (idx % 2 === 1) {
      const second = parse(item).querySelectorAll("td ol li");
      console.log({ second });
      first[(idx - 1) / 2].wps.push(second.innerHTML);
    } else {
      const [name, details] = parse(item)
        .querySelector("strong")!
        .innerHTML.split("-")
        .map((i) => i.trim());
      const groupWp: groupWpT = { name, details, wps: [] };
      first.push(groupWp);
    }
  });
  return { inputFrom, filename, url, idx, content, first };
}

async function parseSite(filename: string): Promise<Array<string>> {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const contentHtml = await readFile(filename, { encoding: "utf-8" });
  await page.setContent(contentHtml);
  const data = await page.evaluate(() => {
    const tds = Array.from(
      document.querySelectorAll(".div_tr-waypoint table tbody tr")
    );
    return tds.map((td) => {
      var txt = td.innerHTML;
      return txt.replace(/<a [^>]+>[^<]*<\/a>/g, "").trim();
    });
  });

  await browser.close();
  return data;
}
