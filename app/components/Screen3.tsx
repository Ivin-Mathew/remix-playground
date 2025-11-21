import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/all";
import { useEffect, useRef } from "react";

type Props = {}

/* Using batch and flip fit */
const Screen3 = (props: Props) => {
  const items = [0, 1, 2, 3, 4];
  const currentIndex = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(Flip);
  }, [])

  function swapPos(curr: number) {
    
    useGSAP(() => {
      Flip.fit(`.item${curr}`,'expanded');
    })

  }


  return (
    <div className={`absolute screen3 h-screen w-screen bg-green-600`}>
      <div className='grid grid-cols-3 w-full h-full'>
        <div className='flex flex-col gap-10 col-span-1 border-2 border-black'>{/* For the sidebar */}
          {items.map((item, index) => (
            <div
              key={index}
              className={`item${index} flex items-center justify-center w-full h-20 border-3 border-blue-500 bg-fuchsia-400`}
              onClick={() => swapPos(index)}
            >
              Item {item}
            </div>
          ))}
        </div>
        <div className='flex col-span-2 border-2 border-black'>
          <div className='w-full h-full expanded'>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Screen3