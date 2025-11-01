import { useEffect, useState } from "react"

type Props = {}

const about = (props: Props) => {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    
    function onMove(e: MouseEvent) {
        setMouse({x:e.clientX, y:e.clientY});
    }

    useEffect(() => {
        window.addEventListener("mousemove",onMove);
        return() =>{
            window.removeEventListener("mousemove", onMove);
        }


    }, [])

    return (
        <div className='h-screen w-screen'>
            <h1>Trying out GSAP observer</h1>
            <div>
                <p>Mouse X = {mouse.x}</p>
                <p>Mouse Y = {mouse.y}</p>
            </div>
        </div>
    )
}

export default about