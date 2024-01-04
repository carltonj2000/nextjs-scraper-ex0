"use server";
import { readFile } from "fs/promises";
import { parse } from "node-html-parser";
import puppeteer from "puppeteer";
import { dataSrc, dataT, groupWpT, wpT } from "./dataSrc";

export async function SomeData(): Promise<dataT> {
  const content = await parseSite(dataSrc.inputs[dataSrc.idx].filename);
  // const content = dataSrc.inputFrom
  //   ? await parseSite(dataSrc.inputs[dataSrc.idx].filename)
  //   : await fetch(dataSrc.inputs[dataSrc.idx].url);

  let groupWps: Array<groupWpT> = [];

  content.forEach((item, idx) => {
    if (idx % 2 === 1) {
      const second = parse(item).querySelectorAll("td ol li");
      const parentArr = groupWps[(idx - 1) / 2].wps;
      second.map((wpEle) => {
        const items = wpEle.textContent.split("\n").map((i) => i.trim());
        const itemsReq = 5;
        let wp: wpT | null = null;
        if (items.length < itemsReq) {
          wp = {
            name: `Error!!! Need ${itemsReq} items but see ${items.length}`,
            details: items.join(","),
          };
        } else {
          wp = {
            name: items[0],
            elevation: items[3].split(":")[1].trim(),
            wgs84: { lat: items[1].split(":")[1].trim(), lng: items[2] },
            details: items[items.length - 1],
          };
        }
        parentArr.push(wp);
      });
    } else {
      const [name, details] = parse(item)
        .querySelector("strong")!
        .innerHTML.split("-")
        .map((i) => i.trim());
      const groupWp: groupWpT = { name, details, wps: [] };
      groupWps.push(groupWp);
    }
  });
  return { ...dataSrc, groupWps };
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
