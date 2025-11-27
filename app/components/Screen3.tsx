// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { Flip } from "gsap/all";
// import { useEffect, useRef, useState } from "react";

// type Props = {}

// /* Using batch and flip fit */
// const Screen3 = (props: Props) => {
//   const items = [0, 1, 2, 3, 4];
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const expandedRef = useRef<HTMLDivElement>(null);
//   const currentExpandedRef = useRef<HTMLElement | null>(null);
//   const isAnimatingRef = useRef(false);

//   useEffect(() => {
//     gsap.registerPlugin(Flip);
//   }, []);

//   function swapPos(index: number) {
//     if (isAnimatingRef.current)
//       return;

//     const clickedItem = document.querySelector(`.item${index}`) as HTMLElement;
//     if (!clickedItem || !expandedRef.current || !sidebarRef.current)
//       return;

//     isAnimatingRef.current = true;

//     if (currentExpandedRef.current === clickedItem) {
//       retractItem(clickedItem);
//       return;
//     }

//     if (currentExpandedRef.current) {
//       retractItem(currentExpandedRef.current, () => {
//         expandItem(clickedItem);
//       })
//     } else {
//       expandItem(clickedItem);
//     }
//   }

//   function expandItem(item: HTMLElement) {
//     if (!expandedRef.current)
//       return;
//     const state = Flip.getState(item);
//     expandedRef.current.appendChild(item);
//     item.classList.add('expanded');

//     Flip.from(state, {
//       duration: 0.5,
//       ease: 'power1.inOut',
//       absolute: true,
//       onComplete: () => {
//         currentExpandedRef.current = item;
//         isAnimatingRef.current = false;
//       }
//     })
//   }

//   function retractItem(item: HTMLElement, callback?: () => void) {
//     if (!sidebarRef.current)
//       return;

//     const state = Flip.getState(item);
//     sidebarRef.current.appendChild(item);
//     item.classList.remove('expanded');

//     Flip.from(state, {
//       duration: 0.5,
//       ease: 'power2.inOut',
//       absolute: true,
//       onComplete: () => {
//         currentExpandedRef.current = null;
//         isAnimatingRef.current = false;
//         if (callback) {
//           callback();
//         }
//       }
//     })
//   }

//   return (
//     <div className={`absolute screen3 h-screen w-screen overflow-hidden bg-green-600`}>
//       <div className='grid grid-cols-3 w-full h-full'>
//         <div className='flex flex-col gap-10 col-span-1 border-2 border-black'>{/* For the sidebar */}
//           {items.map((item, index) => (
//             <div
//               key={index}
//               className={`item${index} flex items-center justify-center w-full h-20 border-3 border-blue-500 bg-fuchsia-400`}
//               onClick={() => swapPos(index)}
//             >
//               Item {item}
//             </div>
//           ))}
//         </div>
//         <div className='flex col-span-2 border-2 border-black p-4'>
//           <div ref={expandedRef} className='w-full h-full bg-amber-300 rounded-lg flex items-center justify-center text-gray-600'>
//             Click an item to expand
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .expanded{
//           width: 100% !important;
//           height: 100% !important;
//           margin: 0 !important;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default Screen3

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

type Props = {};

export default function Screen3(_: Props) {
  const items = [0, 1, 2, 3, 4];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const isAnimatingRef = useRef(false);
  const pendingFlipState = useRef<any>(null);
  const pendingNext = useRef<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(Flip);
  }, []);

  // click handler: capture state first, then change React state
  function handleClick(i: number) {
    if (isAnimatingRef.current) return;

    // clicking the already-expanded item -> retract
    if (expandedIndex === i) {
      pendingFlipState.current = Flip.getState(".flip-item");
      setExpandedIndex(null);
      return;
    }

    // different item clicked while one is expanded -> retract first, then expand
    if (expandedIndex !== null && expandedIndex !== i) {
      isAnimatingRef.current = true;
      pendingFlipState.current = Flip.getState(".flip-item");
      pendingNext.current = i;
      setExpandedIndex(null); // will trigger useLayoutEffect -> Flip.from(retract)
      return;
    }

    // no item expanded -> expand clicked
    pendingFlipState.current = Flip.getState(".flip-item");
    setExpandedIndex(i);
  }

  // run Flip.from AFTER React applied the DOM mutation (useLayoutEffect)
  useLayoutEffect(() => {
    const state = pendingFlipState.current;
    if (!state) return;
    pendingFlipState.current = null;

    Flip.from(state, {
      duration: 0.45,
      ease: "power2.inOut",
      absolute: true,
      onComplete: () => {
        // if we were retracting to then expand another, do that now
        if (pendingNext.current !== null) {
          const next = pendingNext.current;
          pendingNext.current = null;
          // capture pre-expand state and set expandedIndex -> triggers another Flip in next layout effect
          pendingFlipState.current = Flip.getState(".flip-item");
          setExpandedIndex(next);
          return;
        }
        isAnimatingRef.current = false;
      },
    });
  }, [expandedIndex]);

  return (
    <div className="absolute screen3 h-screen w-screen overflow-hidden bg-green-600">
      <div className="grid grid-cols-3 w-full h-full">
        <div className="flex flex-col gap-4 col-span-1 border-r p-4">
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`flip-item item-${index} cursor-pointer rounded-lg bg-fuchsia-400 m-2 p-4 flex items-center justify-center
                ${expandedIndex === index ? "expanded" : ""}`}
            >
              Item {item}
            </div>
          ))}
        </div>

        <div className="col-span-2 p-4">
          <div className="w-full h-full bg-amber-300 rounded-lg flex items-center justify-center text-gray-600">
            Right (expanded target area)
          </div>
        </div>
      </div>

      <style>{`
        /* baseline small items */
        .flip-item {
          width: 100%;
          height: 4.5rem;
        }
        /* expanded uses a different layout (absolute center) so Flip has something to animate */
        .flip-item.expanded {
          position: fixed !important;
          left: 50% !important;
          top: 50% !important;
          transform: translate(-50%, -50%) !important;
          width: min(70vw, 800px) !important;
          height: min(60vh, 600px) !important;
          z-index: 60 !important;
          border-radius: 12px !important;
        }
      `}</style>
    </div>
  );
}