import { useCallback, useEffect, useState } from "react"

export const useViewport = () => {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)
    const [height, setHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0)

    const onResize = useCallback(() => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    }, [setWidth, setHeight])

    useEffect(() => {
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [onResize])
    
    return {
        width,
        height
    }
}