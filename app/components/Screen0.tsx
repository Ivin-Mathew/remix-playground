import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { Observer } from 'gsap/all';
import React, { useEffect, useRef, useState } from 'react'

type Props = {}

const Screen0 = (props: Props) => {
  const screenRef = useRef<HTMLDivElement>(null);
  const diskRef = useRef<HTMLDivElement>(null);

  const [originalCoords, setOriginalCoords] = useState({ x: 0, y: 0 });

  const [diskCoords, setDiskCoords] = useState({ x: 0, y: 0 });
  const [diskBevel, setDiskBevel] = useState({ x: 0, y: 0 });


  function updateCoords(event: globalThis.Observer) {
    if (diskRef.current && screenRef.current && event) {
      const rect = diskRef.current.getBoundingClientRect();
      const window = screenRef.current?.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = (event.x - centerX) / (window.width);
      const distY = (event.y - centerY) / (window.height);

      setDiskBevel({ x: (distX * 30), y: (-distY * 30) });
      setDiskCoords({ x: distX, y: distY });
    }
  }

  useEffect(() => {
    if (diskRef.current) {
      setOriginalCoords({ x: diskRef.current?.getBoundingClientRect().top, y: diskRef.current?.getBoundingClientRect().left })
    }
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(Observer);
    Observer.create({
      target: screenRef.current,
      type: "pointer",
      onMove: (event) => {
        const x = event.x;
        const y = event.y;
        // console.log("Move mouse",x, y);
        updateCoords(event);
      }
    });
  }, [])

  useGSAP(() => {
    gsap.to(diskRef.current, {
      x: (diskCoords.x * 100),
      y: (diskCoords.y * 100),
      rotateX: diskBevel.y,
      rotateY: diskBevel.x,
      rotateZ: diskCoords.x * 5,
    })
  }, [diskBevel, diskCoords])

  useEffect(() => {
    console.log("Disk rotation = ", diskBevel, "\nDisk coords = ", diskCoords, "\nOriginal Coords =", originalCoords);
  }, [diskBevel, diskCoords, originalCoords]);


  return (
    /* This is the landing screen, so set up higher z so it always appears on top */
    <div className={`absolute screen0 h-screen w-screen z-10`}>
      <div ref={screenRef} className='relative h-full w-full flex flex-col items-center justify-center perspective-normal'>
        <div ref={diskRef} className='absolute transform bg-blue-600 h-40 w-100 rounded-xl p-10'>
          Bevel Animation try out
        </div>
      </div>
    </div>
  )
}

export default Screen0