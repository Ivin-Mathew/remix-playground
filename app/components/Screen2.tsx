import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Flip, Observer } from 'gsap/all';
import React, { useEffect, useRef } from 'react'

type Props = {}

/* Try out FLIP animations using observer, card info display when hover card, animated to center of screen  */
const Screen2 = (props: Props) => {
  const boxRef1 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(Flip, Observer);
  }, [])

  useGSAP(() => {
    const box = boxRef1.current;
    if (!box) return;

    const obs = Observer.create({
      target: box,
      type: "pointer",
      onClick: () => {
        const state = Flip.getState(box);
        const isExpanded = box.classList.contains("expanded");
        
        if (isExpanded) 
          box.classList.remove("expanded");
        else 
          box.classList.add("expanded");

        // animate from previous state to new layout
        Flip.from(state, {
          duration: 1,
          ease: "power2.inOut",
          absolute: true,
        });
      },
    });

    return () => {
      if (obs && typeof obs.kill === "function") obs.kill();
    };
  })



  return (
    <div className={`absolute screen2 h-screen w-screen bg-amber-600`}>
      <div className='relative h-full w-full'>
        <div 
          ref={boxRef1} 
          className='absolute state1 justify-center items-center bg-green-600 h-40 w-40 border-3'
        >
          This is the first state
        </div>

        <style>{`
        .state1.expanded {
          bottom:300px;
          right:0px;
          }
          `}</style>
      </div>
    </div>
  )
}


export default Screen2