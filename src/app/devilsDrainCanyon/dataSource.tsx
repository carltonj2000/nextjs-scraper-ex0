"use client";
import { dataT } from "./getData";
import { SpanL, inputFromE } from "./page";
export default function DataSource({ data }: { data: dataT }) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log({ value: e.target.value });
  };
  return (
    <div className="flex flex-col">
      <div className="flex gap-1">
        <input
          type="checkbox"
          checked={data.inputFrom === inputFromE.file}
          value={data.filename[data.idx]}
          onChange={onChange}
        />
        <SpanL file={true}>File: {data.filename[data.idx]}</SpanL>
      </div>
      <div className="flex gap-1">
        <input
          type="checkbox"
          checked={(data.inputFrom as inputFromE) === inputFromE.url}
          value={data.url[data.idx]}
          onChange={onChange}
        />
        <SpanL>URL: {data.url[data.idx]}</SpanL>
      </div>
    </div>
  );
}
