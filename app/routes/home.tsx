import gsap from "gsap";
import type { Route } from "./+types/home";
import { Observer } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "React Router Playground" },
    { name: "description", content: "Play test area for various components and libraries." },
  ];
}





export default function Home() {


  const [index, setIndex] = useState(0);
  const isAnimating = useRef(false);

  const screens = [0, 1, 2, 3, 4];

  const wrapper = useRef<(n: number) => number>(() => 0);

  function ChangeScreen(direction: number) { // set direction +1 or -1 only
    if (isAnimating.current)
      return;
    isAnimating.current = true;



    setIndex((current) => {
      let next = wrapper.current((current + direction) % screens.length);

      let tl = gsap.timeline({
        defaults: { duration: 0.4, ease: "power1.inOut" },
        onComplete: () => { isAnimating.current = false },
      });

      console.log("Current index is", screens[current]);
      console.log("Next index is", screens[next]);

      if (direction == 1) {
        tl.set(`.screen${screens[next]}`, {
          y: "100dvh",
        });
        tl.to(`.screen${screens[current]}`, {
          y: "-100dvh",
        });
        tl.to(`.screen${screens[next]}`, {
          y: 0,
        });
      }
      else {
        tl.set(`.screen${screens[next]}`, {
          y: "-100dvh",
        });
        tl.to(`.screen${screens[current]}`, {
          y: "100dvh",
        });
        tl.to(`.screen${screens[next]}`, {
          y: 0,
        });
      }

      return next;
    });
  }



  useGSAP(() => {
    wrapper.current = gsap.utils.wrap(0, screens.length);
    gsap.set(".screen0", {
      y: 0,
    })
    gsap.set([".screen1", ".screen2", ".screen3", ".screen4"], {
      y: "100dvh",
    })

    gsap.registerPlugin(Observer);
    Observer.create({
      onUp: () => {
        if (!isAnimating.current) ChangeScreen(-1);
        console.log("Scrolled up. Animating = ", isAnimating.current);
      },
      onDown: () => {
        if (!isAnimating.current) ChangeScreen(1);
        console.log("Scrolled down. Animating = ", isAnimating.current);
      },
      preventDefault: true,
    })
  }, [])

  return (
    <div className="w-screen h-screen overflow-clip flex flex-col gap-10">
      {screens.map((item, index) => (
        <div key={index} className={`screen${item} h-[400px] w-screen bg-amber-600`}>
          {item}
        </div>
      )
      )}

    </div>

  )
}
