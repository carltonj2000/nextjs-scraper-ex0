import DataSource from "@/app/devilsDrainCanyon/dataSource";
import Export from "@/app/devilsDrainCanyon/export";
import { SomeData } from "@/app/devilsDrainCanyon/getData";
import { ReactNode } from "react";
// import { loadFile } from "./actions";
// import GetFile from "./getFile";

export function SpanL({
  children,
  file,
}: {
  children: ReactNode;
  file?: boolean;
}) {
  const color = file ? "bg-slate-800" : "bg-slate-600";
  return <span className={`${color} px-1 rounded-sm`}>{children}</span>;
}

export default async function Home() {
  const dataIn = await SomeData();
  const { groupWps, ...data } = dataIn;
  return (
    <main className="flex flex-col">
      <h1 className="text-3xl font-bold">Devil&apos;s Drain Canyon</h1>
      <h2 className="text-xl font-semibold">Bluugnome.com Scraper</h2>
      <div>
        <p>
          The GPS coordinates for Devil&apos;s Drain Canyon can be found at the{" "}
          <SpanL>URL</SpanL> noted below. Wrote a webscraper to get the gps
          coordinates from that web page and automatically convert them to a gpx
          file. During development used a local version of the web page saved to
          a <SpanL file={true}>file</SpanL>.
        </p>
        <DataSource data={data} />
        <Export groupWps={groupWps} />
        <code>
          <pre>{JSON.stringify(groupWps, null, 2)}</pre>
        </code>
        {/* <GetFile loadFile={loadFile} /> */}
      </div>
    </main>
  );
}
