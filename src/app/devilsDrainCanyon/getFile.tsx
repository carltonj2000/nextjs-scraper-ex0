"use client";

export default function GetFile({ loadFile }) {
  return (
    <form action={loadFile}>
      <button type="submit">Load File</button>
    </form>
  );
}
