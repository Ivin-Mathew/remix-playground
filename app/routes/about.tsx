import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap";
import { Observer } from "gsap/all";
import { useGSAP } from "@gsap/react";


type Props = {}

const about = (props: Props) => {
    gsap.registerPlugin(Observer);
    
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [scroll, setScroll] = useState(0);
    
    const circleRef = useRef<HTMLDivElement>(null);
    const boxRef1 = useRef<HTMLDivElement>(null);
    const boxRef2 = useRef<HTMLDivElement>(null);

    let originalColor = "";

    useEffect(()=>{
        originalColor = circleRef.current?.style.backgroundColor || "";
    },[])


    function onMove(e: MouseEvent) {
        setMouse({ x: e.clientX, y: e.clientY });
    }

    function onScroll(e: WheelEvent) {
        const lineHeight = 16;
        const pageHeight = window.innerHeight || 800;

        const scale = e.deltaMode === 1 ? lineHeight :
            e.deltaMode === 2 ? pageHeight : 2;

        const deltaPixels = e.deltaY * scale;

        setScroll(scroll + deltaPixels);
    }

    function changeColor(colour: string) {
        gsap.set(circleRef.current, {
            backgroundColor: colour,
        })
    }

    useGSAP(() => {
        gsap.to(circleRef.current, {
            x: mouse.x,
            y: mouse.y,
            ease: "power2.out",
            duration: 0.3,
        })
    }, [mouse]);

    useGSAP(() => {

        Observer.create({
            target: boxRef1.current,
            type: "pointer",
            onHover: () => {
                console.log("Testing OnHover prop for box 1. Current Color: ",getComputedStyle(boxRef1.current).backgroundColor);
                changeColor(getComputedStyle(boxRef1.current).backgroundColor);
            },
            onHoverEnd: () =>{
                console.log("Hover end for box ref 1");
                changeColor(originalColor);
            }
        })

        Observer.create({
            target: boxRef2.current,
            type: "pointer",
            onHover: () => {
                console.log("Testing OnHover prop for box 2. Current Color: ",getComputedStyle(boxRef2.current).backgroundColor);
                changeColor(getComputedStyle(boxRef2.current).backgroundColor);
            },
            onHoverEnd: () =>{
                console.log("Hover end for box ref 2");
                changeColor(originalColor);
            }
        })

        Observer.create({
            // type:"wheel",
            onDown: ()=>{
                console.log("Scrolled down");
            },
            onUp: ()=>{
                console.log("Scrolled up");
            }
        })

    })



    useEffect(() => {
        window.addEventListener("mousemove", onMove);
        window.addEventListener("wheel", onScroll);
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("wheel", onScroll);
        }
    }, [])

    return (
        <div className='h-100dvh'>
            <h1>Trying out GSAP observer</h1>
            <div>
                <p>Mouse X = {mouse.x}</p>
                <p>Mouse Y = {mouse.y}</p>
                <p>Scroll value = {scroll}</p>
            </div>
            <div className={`absolute -top-10 -left-10 h-20 w-20 flex items-center justify-center bg-red-500 rounded-full pointer-events-none z-100`} ref={circleRef}>
                Circle
            </div>

            <div ref={boxRef1} className="absolute left-[50dvw] top-[20dvh] h-20 w-20 bg-blue-600">
                Box 1
            </div>
            <div ref={boxRef2} className="absolute left-[40dvw] top-[40dvh] h-20 w-20 bg-yellow-600">
                Box 2
            </div>
        </div>
    )
}

export default about