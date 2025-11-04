import gsap from "gsap";
import type { Route } from "./+types/home";
import { Observer } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "React Router Playground" },
    { name: "description", content: "Play test area for various components and libraries." },
  ];
}





export default function Home() {

  const [isAnimating, setIsAnimating] = useState(false);
  const [index, setIndex] = useState(0);

  const screens = [0, 1, 2, 3, 4];
  const screenLength = 5;

  function ChangeScreen(direction: number) { // set direction +1 or -1 only
    if (isAnimating) return;
    setIsAnimating(true);

    setIndex((current) => {
      const next = (current + direction + screenLength) % screenLength;

      console.log("Next index is", screens[next]);

      gsap.to(`.screen${screens[current]}`, {
        x: -100,
        duration: 0.5,
      });
      gsap.to(`.screen${screens[next]}`, {
        x: +100,
        duration: 0.5,
        onComplete: () => setIsAnimating(false),
      });

      return next;
    });
  }



  useGSAP(() => {
    gsap.to(".screen0", {
      x: 100
    })

    gsap.registerPlugin(Observer);
    Observer.create({
      onUp: () => {
        !isAnimating && ChangeScreen(1);
        console.log("Scrolled up");
      },
      onDown: () => {
        !isAnimating && ChangeScreen(-1);
        console.log("Scrolled down");
      }
    })
  })

  return (
    <div className="h-screen w-screen flex flex-col gap-10">
      Clean React Router Project
      <div className="screen0 bg-blue-500 h-[10dvh] w-[10dvw]">
        Screen 1
      </div>

      <div className="screen1 bg-blue-500 h-[10dvh] w-[10dvw]">
        Screen 2
      </div>

      <div className="screen2 bg-blue-500 h-[10dvh] w-[10dvw]">
        Screen 3
      </div>

      <div className="screen3 bg-blue-500 h-[10dvh] w-[10dvw]">
        Screen 4
      </div>

      <div className="screen4 bg-blue-500 h-[10dvh] w-[10dvw]">
        Screen 5
      </div>

    </div>

  )
}
