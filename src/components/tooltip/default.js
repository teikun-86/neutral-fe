import { useCallback, useEffect, useRef, useState } from "react"

export const Tooltip = ({ title = "", position = "top", children }) => {
    const classes = {
        top: "-top-10",
        left: ""
    }
    const ref = useRef(null)

    const [show, setShow] = useState(false) 

    const showTooltip = useCallback(() => setShow(true), [])
    const hideTooltip = useCallback(() => setShow(false), [])

    useEffect(() => {
        const element = ref.current

        const showEvents = ['mouseenter', 'focus'];
        const hideEvents = ['mouseleave', 'blur'];
        showEvents.forEach((event) => {
            element.addEventListener(event, showTooltip);
        });

        hideEvents.forEach((event) => {
            element.addEventListener(event, hideTooltip);
        });

        return () => {
            showEvents.forEach((event) => {
                element.removeEventListener(event, showTooltip);
            });

            hideEvents.forEach((event) => {
                element.removeEventListener(event, hideTooltip);
            });
        }
    }, [ref, hideTooltip, showTooltip])
    
    return (
        <div ref={ref} className="relative">
            <div className={`absolute z-20 ${classes[position]} left-1/2 -translate-x-1/2 bg-black rounded-lg p-1 text-gray-200 max-w-[12rem] min-w-[7rem] ${show ? "" : "hidden"}`}>
                <div className="relative first-line:text-center text-xs font-semibold">
                    <span className="absolute w-2 h-2 bg-black -bottom-2 left-1/2 -translate-x-1/2 rotate-45"></span>
                    {title}
                </div>
            </div>
            {children}
        </div>
    )
}