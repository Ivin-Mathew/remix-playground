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

  let isAnimating = false;
  const [index, setIndex] = useState(0);

  const screens = [0, 1, 2, 3, 4];

  let wrapper : any;

  function ChangeScreen(direction: number) { // set direction +1 or -1 only
    isAnimating = true;

    let tl = gsap.timeline({
      defaults: { duration: 0.4, ease: "power1.inOut" },
      onComplete: () => {isAnimating = false},
    });

    setIndex((current) => {
      let next = wrapper((current + direction) % screens.length);

      console.log("Next index is", screens[next]);
      if(direction == 1){
        tl.to(`.screen${screens[current]}`, {
          y: "-100dvh",
        });
        tl.to(`.screen${screens[next]}`, {
          y:0,
        });
      }
      else{
       tl.to(`.screen${screens[current]}`, {
          y: "100dvh",
        });
        tl.to(`.screen${screens[next]}`, {
          y:0,
        });
      } 

      return next;
    });
  }



  useGSAP(() => {
    wrapper = gsap.utils.wrap(0,screens.length);
    gsap.set(".screen0", {
      y:0,
    })
    gsap.set([".screen1",".screen2",".screen3",".screen4"],{
      y: "100dvh",
    })

    gsap.registerPlugin(Observer);
    Observer.create({
      onUp: () => {
        !isAnimating && ChangeScreen(-1);
        console.log("Scrolled up. Animating = ",isAnimating);
      },
      onDown: () => {
        !isAnimating && ChangeScreen(1);
        console.log("Scrolled down. Animating = ",isAnimating);
      },
      // preventDefault: true,
    })
  })

  return (
    <div className="w-screen h-screen overflow-clip flex flex-col gap-10">
      {screens.map((item, index) =>(
        <div key={index} className={`screen${item} h-[400px] w-screen bg-amber-600`}>
          {item}
        </div> 
      )
    )}

    </div>

  )
}
