import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center h-screen justify-center">
      <Link
        href="./devilsDrainCanyon"
        className="bg-slate-500 px-2 py-1 rounded-md shadow-md hover:shadow shadow-slate-100 hover:shadow-slate-100"
      >
        Devils Drain Canyon
      </Link>
    </main>
  );
}
