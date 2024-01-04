"use client";
import { inputFromE } from "@/app/devilsDrainCanyon/dataSrc";
import { dataSourceT } from "./dataSrc";
import { SpanL } from "./page";
export default function DataSource({ data }: { data: dataSourceT }) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log({ value: e.target.value });
  };
  return (
    <div className="flex flex-col">
      <div className="flex gap-1">
        <input
          type="checkbox"
          checked={data.inputFrom === inputFromE.file}
          value={data.inputs[data.idx].filename}
          onChange={onChange}
        />
        <SpanL file={true}>File: {data.inputs[data.idx].filename}</SpanL>
      </div>
      <div className="flex gap-1">
        <input
          type="checkbox"
          checked={(data.inputFrom as inputFromE) === inputFromE.url}
          value={data.inputs[data.idx].url}
          onChange={onChange}
        />
        <SpanL>URL: {data.inputs[data.idx].url}</SpanL>
      </div>
    </div>
  );
}
