import { useCallback, useEffect, useState } from "react"

export const useViewport = ({ onScroll = () => {}, onResize = () => {} }) => {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)
    const [height, setHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0)
    const [scrollY, setScrollY] = useState(typeof window !== 'undefined' ? window.scrollY : 0)
    const [scrollX, setScrollX] = useState(typeof window !== 'undefined' ? window.scrollX : 0)

    const __onResize = useCallback(() => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
        onResize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }, [setWidth, setHeight, onResize])
    
    const __onScroll = useCallback(() => {
        setScrollX(window.scrollX)
        setScrollY(window.scrollY)
        onScroll({
            x: window.scrollX,
            y: window.scrollY
        })
    }, [setScrollX, setScrollY, onScroll])

    useEffect(() => {
        window.addEventListener('resize', __onResize)
        window.addEventListener('scroll', __onScroll)
        return () => {
            window.removeEventListener('resize', __onResize)
            window.removeEventListener('scroll', __onScroll)
        }
    }, [__onResize, __onScroll])
    
    return {
        width,
        height,
        scrollY,
        scrollX
    }
}