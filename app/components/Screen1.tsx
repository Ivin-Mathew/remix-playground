import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react";

type Props = {}

const Screen1 = (props: Props) => {
  const scrollbar1 = useRef<HTMLDivElement>(null);
  const scrollbar2 = useRef<HTMLDivElement>(null);
  
  useGSAP(()=>{
    gsap.fromTo(scrollbar1.current,{
      //from
      x:"100dvw"
    },{
      //to
      x:"-100dvw",
      duration:8,
      repeat:-1,
      repeatDelay:0,
      ease:"none",
    })

    gsap.fromTo(scrollbar2.current,{
      //from
      x:"100dvw",
    },{
      //to
      x:"-100dvw",
      delay:4,
      duration:8,
      repeat:-1,
      repeatDelay:0,
      ease:"none",
    })
  },[]);
  
  return (
    /* Infinite horizontal scrolling bar */
    <div className={`absolute screen1 h-screen w-screen bg-amber-600`}>
      <div className="relative top-20 rotate-3">
        <div ref={scrollbar1} className="absolute w-dvw h-20 bg-violet-600">This is the first scrollbar</div>
        <div ref={scrollbar2} className="absolute w-dvw h-20 bg-purple-600">This is the second scrollbar</div>
      </div>
    </div>
  )
}

export default Screen1