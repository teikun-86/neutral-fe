const { useCallback, useEffect, useState } = require("react")

const useInViewport = ({ refElement, visible = false }) => {
    const [isInViewport, setIsInViewport] = useState(visible)

    const onScroll = useCallback(() => {
        if (refElement !== null) {
            let visible = window.scrollY - refElement.current.offsetTop <= 0
            setIsInViewport(visible)
        }
    }, [refElement])

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [onScroll])

    return {
        isInViewport
    }
}

export default useInViewport