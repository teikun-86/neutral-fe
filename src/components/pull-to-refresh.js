import { Transition } from "@headlessui/react"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { SpinnerIcon } from "./icons"

export const PullToRefresh = ({
    onRefresh = () => { },
    children = null,
}) => {
    const router = useRouter()
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [isTouching, setIsTouching] = useState(false)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const [touchMove, setTouchMove] = useState(0)
    const [touchDistance, setTouchDistance] = useState(0)
    const [touchDirection, setTouchDirection] = useState(0)
    const [touchDirectionName, setTouchDirectionName] = useState("")
    const [canRefresh, setCanRefresh] = useState(false)

    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientY)
        setIsTouching(true)
    }

    const handleTouchMove = (e) => {
        // if the window is not scrolled to the top, do not refresh
        if (window.scrollY > 0) {
            return
        }
        
        setTouchMove(e.touches[0].clientY)
        setTouchDistance(touchMove - touchStart)
        setTouchDirection(touchMove - touchEnd)
        setTouchDirectionName(touchDirection > 0 ? "down" : "up")
        setCanRefresh(touchDirectionName === "up" && touchDistance > 100)
    }

    const handleTouchEnd = (e) => {
        setTouchEnd(e.changedTouches[0].clientY)
        setIsTouching(false)
        if (touchDirectionName === "up" && touchDistance > 100) {
            setIsRefreshing(true)
            setCanRefresh(false)
            onRefresh()
        }
    }

    const afterRouteChange = useCallback(() => {
        setIsRefreshing(false)
    }, [])

    useEffect(() => {
        router.events.on('routeChangeComplete', afterRouteChange)
        return () => {
            router.events.off('routeChangeComplete', afterRouteChange)
        };
    }, [afterRouteChange, router.events]);

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            className={`flex flex-col w-full ${isTouching && touchDirectionName === "up" && touchDistance > 0 ? "translate-y-5" : ""} transition duration-300`}
        >
            <Transition
                show={isRefreshing}
                enter="transition-all duration-300 ease-in-out"
                enterFrom="opacity-0 -translate-y-20"
                enterTo="opacity-100 translate-y-0"
                leave="transition-all duration-300 ease-in-out"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-20"
                className="flex flex-col items-center justify-center w-full h-20 fixed top-0 left-0 z-50"
            >
                <span className="p-2 grid place-items-center bg-white rounded-full shadow-lg">
                    <SpinnerIcon className="w-6 h-6 text-rose-600 animate-spin" />
                </span>
            </Transition>
            <Transition
                show={isTouching && canRefresh}
                enter="transition-all duration-300 ease-in-out"
                enterFrom="opacity-0 -translate-y-20"
                enterTo="opacity-100 translate-y-0"
                leave="transition-all duration-300 ease-in-out"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-20"
                className="flex flex-col items-center justify-center w-full h-20 fixed top-0 left-0 z-50"
            >
                <p className="text-sm text-gray-900 p-2 rounded-full bg-white shadow-lg">Lepaskan untuk memuat ulang</p>
            </Transition>
            <Transition
                show={isTouching && touchDirectionName === "up" && touchDistance > 0 && !canRefresh}
                enter="transition-all duration-300 ease-in-out"
                enterFrom="opacity-0 -translate-y-20"
                enterTo="opacity-100 translate-y-0"
                leave="transition-all duration-300 ease-in-out"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-20"
                className="flex flex-col items-center justify-center w-full h-20 fixed top-0 left-0 z-50"
            >
                <p className="text-sm text-gray-900 p-2 rounded-full bg-white shadow-lg">Tarik ke bawah untuk memuat ulang</p>
            </Transition>
            {children}
        </div>
    )
}