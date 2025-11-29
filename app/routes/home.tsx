import gsap from "gsap";
import type { Route } from "./+types/home";
import { Observer } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import Screen1 from "~/components/Screen1";
import Screen0 from "~/components/Screen0";
import Screen2 from "~/components/Screen2";
import Screen3 from "~/components/Screen3";
import Screen4 from "~/components/Screen4";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "React Router Playground" },
    { name: "description", content: "Play test area for various components and libraries." },
  ];
}

export default function Home() {
  const [index, setIndex] = useState(4); // change here when start screen changed
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
        defaults: { duration: 0.6, ease: "circ.inOut" },
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
        }, "<");
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
        }, "<");
      }

      return next;
    });
  }

  useGSAP(() => {
    wrapper.current = gsap.utils.wrap(0, screens.length);
    gsap.set(".screen4", {// change here when start screen changed
      y: 0,
    })
    gsap.set([".screen0", ".screen1", ".screen2", ".screen3"], {// change here when start screen changed
      y: "100dvh",
    })

    gsap.registerPlugin(Observer);
    // Observer.create({
    //   onUp: () => {
    //     if (!isAnimating.current) ChangeScreen(-1);
    //     console.log("Scrolled up. Animating = ", isAnimating.current);
    //   },
    //   onDown: () => {
    //     if (!isAnimating.current) ChangeScreen(1);
    //     console.log("Scrolled down. Animating = ", isAnimating.current);
    //   },
    //   preventDefault: true,
    //   dragMinimum: 50,
    // })
  }, [])

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <div>
        <Screen0 />
        <Screen1 />
        <Screen2 />
        <Screen3 />
        <Screen4 />
      </div>
    </div>
  )
}
