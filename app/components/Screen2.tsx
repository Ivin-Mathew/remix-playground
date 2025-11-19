import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Flip, Observer } from 'gsap/all';
import React, { useEffect, useRef } from 'react'

type Props = {}

/* Try out FLIP animations using observer, card info display when hover card, animated to center of screen  */
/* const Screen2 = (props: Props) => {
  const boxRef1 = useRef<HTMLDivElement>(null);
  const boxRef2 = useRef<HTMLDivElement>(null);

  // const state = Flip.getState(boxRef1.current);

  useGSAP(() => {
    gsap.registerPlugin(Flip, Observer);
    if (boxRef1.current) {

      Observer.create({
        target: boxRef1.current,
        type: "pointer",
        onHover: () => {
          console.log("Hover over box1")
        },
      })

      Flip.from(Flip.getState(boxRef1.current), {
        duration: 2,
        ease: "power1.inOut",
        absolute: true
      })
    }


  })



  return (
    <div className={`absolute screen2 h-screen w-screen bg-amber-600`}>
      <div ref={boxRef1} className='flex justify-center items-center bg-green-600 h-40 w-40 border-3'>
        This is the first state
      </div>
      <div ref={boxRef2} className='absolute right-0 top-[50%] p-20 bg-cyan-600'>
        This is the second state
      </div>
    </div>
  )
}
 */

function Screen2(_: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // register plugin once on client
    gsap.registerPlugin(Flip);
  }, []);

  function expand() {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    if (!card || !overlay) return;

    // remember original place to restore later
    (card as any).__origParent = card.parentElement;
    (card as any).__origNext = card.nextElementSibling;

    // capture layout BEFORE DOM change
    const state = Flip.getState(card);

    // move the actual node into overlay and add expanded class
    overlay.appendChild(card);
    card.classList.add("expanded");

    // animate from previous state -> new
    Flip.from(state, {
      duration: 0.45,
      ease: "power2.inOut",
      absolute: true,
    });
  }

  function collapse() {
    const card = cardRef.current;
    if (!card) return;

    const origParent = (card as any).__origParent as HTMLElement | null;
    const origNext = (card as any).__origNext as Element | null;

    // capture layout BEFORE DOM change
    const state = Flip.getState(card);

    // restore DOM position
    if (origParent) {
      if (origNext) origParent.insertBefore(card, origNext);
      else origParent.appendChild(card);
    }

    card.classList.remove("expanded");

    Flip.from(state, {
      duration: 0.45,
      ease: "power2.inOut",
      absolute: true,
    });
  }

  // toggle on click for simplicity (safe on mobile)
  function toggle() {
    const card = cardRef.current;
    if (!card) return;
    if (card.classList.contains("expanded")) collapse();
    else expand();
  }

  return (
    <div className="screen2 absoslute h-screen w-screen p-8 bg-amber-600">
      <div className='relative h-full w-full'>

        {/* overlay host (center) */}
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
        />
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1">
              <div
                ref={cardRef}
                onClick={toggle}
                className="flip-card cursor-pointer rounded bg-white p-6 shadow-md w-40 h-40 flex items-center justify-center"
              >
                Click to flip
              </div>
            </div>

            <div className="col-span-2">
              <div className="h-40 bg-cyan-300 rounded flex items-center justify-center">
                Other content
              </div>
            </div>
          </div>
        </div>

        <style>{`
        .flip-card.expanded {
          width: min(80vw, 800px) !important;
          height: min(70vh, 600px) !important;
          padding: 1.5rem !important;
          border-radius: 0.75rem !important;
          pointer-events: auto !important;
          }
          `}</style>
      </div>
    </div>
  );
}

export default Screen2