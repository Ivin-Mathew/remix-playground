import gsap from 'gsap';
import { Flip, Observer } from 'gsap/all';
import React, { useEffect, useRef } from 'react'

type Props = {}

/* Try out FLIP animations using observer, card info display when hover card, animated to center of screen  */
const Screen2 = (props: Props) => {
  const boxRef = useRef(null);


  useEffect(()=>{
    gsap.registerPlugin(Flip, Observer);
  },[]);

  return (
    <div className={`absolute screen2 h-screen w-screen bg-amber-600`}>
      <div ref={boxRef} className='flex justify-center items-center bg-green-600 h-40 w-40 border-3'>
        This is the first state
      </div>
    </div>
  )
}

export default Screen2