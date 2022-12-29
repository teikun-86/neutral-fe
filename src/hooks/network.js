import { useCallback, useEffect, useState } from "react"

const useNetwork = ({ onOnline = () => {}, onOfline = () => {} }) => {
    const [online, setOnline] = useState(true)

    const goOnline = useCallback(() => {
        setOnline(true)
        onOnline()
    }, [onOnline])

    const goOffline = useCallback(() => {
        setOnline(false)
        onOfline()
    }, [onOfline])
    
    useEffect(() => {
        window.addEventListener("online", goOnline)
        window.addEventListener("offline", goOffline)
    }, [goOffline, goOnline])

    return {
        online
    }
}

export { useNetwork }