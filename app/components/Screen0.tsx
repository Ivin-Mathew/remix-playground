import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { Observer } from 'gsap/all';
import React from 'react'

type Props = {}

const Screen0 = (props: Props) => {
  gsap.registerPlugin(Observer);
  useGSAP(() => {
    {
      Observer.create({
        target: "disk",
        type: "mouse",
        onChangeX: () => {
        },
        onChangeY: () => {
        }
      })
    }
  })
  return (
    /* This is the landing screen, so set up higher z so it always appears on top */
    <div className={`absolute screen0 h-screen w-screen z-10`}>
      <div className='h-full w-full flex flex-col items-center justify-center'>
        <div className='disk bg-blue-600 h-40 w-100 rounded-xl p-10'>
          Center of the screen
        </div>
      </div>

    </div>
  )
}

export default Screen0