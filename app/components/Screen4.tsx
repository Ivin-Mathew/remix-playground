import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { MotionPathHelper, MotionPathPlugin } from 'gsap/all'
import React, { useEffect } from 'react'

type Props = {}

/* Something with scrolltrigger since i didnt use that across the website. try to make this section longer than the others, and transition to the next screen when end of section reached rather than on motion */
const Screen4 = (props: Props) => {
  useGSAP(() => {
    gsap.registerPlugin(MotionPathHelper, MotionPathPlugin);

    const tl = gsap.timeline({
      yoyo: true,
      repeat: -1,
      delay: 1,
      repeatDelay: 1,
    });

    tl.to(".grid1", {
      motionPath: {
        path: [{ x: "-100%", y: "-100%", }],
      },
      opacity: 0,
      duration: 3,
      ease: "power2"
    }, 0)
    tl.to(".grid2", {
      motionPath: {
        path: [{ x: "100%", y: "-100%" }],
      },
      opacity: 0,
      duration: 3,
      ease: "power2"
    }, 0)
    tl.to(".grid3", {
      motionPath: {
        path: [{ x: "-100%", y: "100%" }],
      },
      opacity: 0,
      duration: 3,
      ease: "power2"
    }, 0)
    tl.to(".grid4", {
      motionPath: {
        path: [{ x: "100%", y: "100%" }],
      },
      opacity: 0,
      duration: 3,
      ease: "power2"
    }, 0)

    // MotionPathHelper.create(g);
  })


  return (
    <div className={`absolute screen4 h-screen w-screen p-20 bg-blue-600`}>
      <div className='relative bg-red-600 w-full h-full'>
        This is the content in this page
        <div className='absolute top-0 w-full h-full z-10 grid grid-cols-2 grid-rows-2'>
          <div className='grid1 border-2 border-black bg-green-600'>
            This is grid 1
          </div>
          <div className='grid2 border-2 border-black bg-green-600'>
            This is grid 2
          </div>
          <div className='grid3 border-2 border-black bg-green-600'>
            This is grid 3
          </div>
          <div className='grid4 border-2 border-black bg-green-600'>
            This is grid 4
          </div>
        </div>
      </div>
      {/* Using Arc for perfect quarter circles */}
      <path id="path1" d="M 50 50 A 35 35 0 0 0 15 15" fill="none" />
      <path id="path2" d="M 50 50 A 35 35 0 0 1 85 15" fill="none" />
      <path id="path3" d="M 50 50 A 35 35 0 0 1 15 85" fill="none" />
      <path id="path4" d="M 50 50 A 35 35 0 0 0 85 85" fill="none" />
    </div>
  )
}

export default Screen4