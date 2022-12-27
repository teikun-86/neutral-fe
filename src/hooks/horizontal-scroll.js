import { useCallback, useEffect, useState }  from "react"

const useHorizontalScroll = ({ ref }) => {
    const [scrollableElement, setScrollableElement] = useState(null)
    
    const onWheel = useCallback((event) => {
        event.preventDefault()
        if (ref !== null) {
            ref.current.scrollLeft += event.deltaY + event.deltaX;
        }
    }, [ref])

    useEffect(() => {
        let refCurrent = ref.current
        if (refCurrent !== null) {
            setScrollableElement(ref.current)
        }

        if (scrollableElement !== null) {
            scrollableElement.addEventListener('wheel', onWheel)
        }

        return () => {
            if (scrollableElement !== null) {
                scrollableElement.removeEventListener('wheel', onWheel)
            }
        }
    }, [onWheel, ref, scrollableElement])

    return {
        scrollableElement
    }
}

export default useHorizontalScroll