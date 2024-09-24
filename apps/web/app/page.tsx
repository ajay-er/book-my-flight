import { Button } from "@repo/ui/button";

export default function Home() {
  return (
    <div className="bg-red-300">
    <h1 className="text-3xl bg-slate-600 font-bold underline">
      Hello world!
    </h1>
    <Button appName="Hello">Hello</Button>
    </div>
  );
}
