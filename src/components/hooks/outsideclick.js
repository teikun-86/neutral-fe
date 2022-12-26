const { useEffect, useCallback } = require("react")

const useOutsideClick = ({ ref, callback = (event) => {} }) => {
    const listener = useCallback((event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            callback(event)
        }
    }, [ref, callback])
    
    useEffect(() => {
        document.addEventListener('click', listener)
        return () => {
            document.removeEventListener('click', listener)
        }
    }, [listener])
}

export default useOutsideClick