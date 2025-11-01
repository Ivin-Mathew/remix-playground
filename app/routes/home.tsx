import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Router Playground" },
    { name: "description", content: "Play test area for various components and libraries." },
  ];
}

export default function Home() {
  return(
    <div className="h-screen w-screen">
      Clean React Router Project
    </div>
  )
}
