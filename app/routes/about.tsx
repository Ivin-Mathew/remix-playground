import { useEffect, useRef, useState } from "react"
import {gsap} from "gsap";
import { Flip } from "gsap/all";
import { useGSAP } from "@gsap/react";


type Props = {}

const about = (props: Props) => {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [scroll, setScroll] = useState(0);
    
    const circleRef = useRef<HTMLDivElement | null>(null);
    const animRef = useRef<number | null>(null);


    function onMove(e: MouseEvent) {
        setMouse({x:e.clientX, y:e.clientY});
        // if(animRef.current === null){
        //     animRef.current = requestAnimationFrame(()=>{

        //         // if(circleRef.current){
        //         //     circleRef.current.style.left = `${e.clientX}px`;
        //         //     circleRef.current.style.top = `${e.clientY}px`;
        //         // }

        //         animRef.current = null;
        //     });
        // }
    }

    function onScroll(e: WheelEvent){
        const lineHeight = 16;
        const pageHeight = window.innerHeight || 800;

        const scale = e.deltaMode ===1 ? lineHeight :
            e.deltaMode === 2 ? pageHeight : 2;

        const deltaPixels = e.deltaY * scale;

        setScroll(scroll+deltaPixels);
    }

    useGSAP(()=>{
        gsap.to(circleRef.current,{
            x:mouse.x,
            y:mouse.y,
            ease:"power2.out",
            duration:0.3,
        })
    },[mouse]);

    

    useEffect(() => {
        // if(circleRef.current){
        //     circleRef.current.style.position = "absolute";
        //     circleRef.current.style.left = "0px";
        //     circleRef.current.style.top = "0px";

        //     circleRef.current.style.transform = "translate(-50%,-50%)";
        //     circleRef.current.style.willChange = "left, top, transform";
        //     circleRef.current.style.pointerEvents = "none";
        // }

        window.addEventListener("mousemove",onMove);
        window.addEventListener("wheel",onScroll);
        return() =>{
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("wheel", onScroll);
            // if (animRef.current !== null) cancelAnimationFrame(animRef.current);
        }


    }, [])

    return (
        <div className='h-screen w-screen'>
            <h1>Trying out GSAP observer</h1>
            <div>
                <p>Mouse X = {mouse.x}</p>
                <p>Mouse Y = {mouse.y}</p>
                <p>Scroll value = {scroll}</p>
            </div>
            <div className={`absolute -top-10 -left-10 h-20 w-20 flex items-center justify-center bg-red-500 rounded-full select-none`} ref={circleRef}>
                Circle
            </div>
        </div>
    )
}

export default about