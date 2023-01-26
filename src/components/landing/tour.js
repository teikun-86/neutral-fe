import { useLocale } from "@/hooks/locale"
import { axios } from "@/libs/axios"
import { formatIDR, truncateString } from "@/util"
import { ArrowLeftIcon, ArrowRightIcon, MapPinIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { SpinnerIcon, ThreeDots } from "../icons"

export const Tour = () => {
    const scrollableRef = useRef(null)
    const [type, setType] = useState("domestic")
    const [destinations, setDestinations] = useState({})
    const [loading, setLoading] = useState(false)
    const [scrollX, setScrollX] = useState(0)
    const [maxScroll, setMaxScroll] = useState(false)
    const { __ } = useLocale()

    const getDestinations = async () => {
        setLoading(true)
        await axios.get("/destinations/tour").then(res => {
            setDestinations(res.data.data)
            setLoading(false)
        })
    }

    const doScrollX = (direction) => {
        if (direction === "left") {
            scrollableRef.current.scrollBy({
                left: -240,
                behavior: "smooth"
            })
        } else {
            scrollableRef.current.scrollBy({
                left: 240,
                behavior: "smooth"
            })
        }
    }

    useEffect(() => {
        getDestinations()
    }, [])

    const onScroll = (e) => {
        setScrollX(e.target.scrollLeft)
        setMaxScroll(((e.target.scrollWidth - e.target.clientWidth) - e.target.scrollLeft).toFixed(0) <= 0)
    }
    
    useEffect(() => {
        if (scrollableRef.current) {
            scrollableRef.current.addEventListener("scroll", onScroll)

            // set max scroll on mount
            setMaxScroll(((scrollableRef.current.scrollWidth - scrollableRef.current.clientWidth) - scrollableRef.current.scrollLeft).toFixed(0) <= 0)
        }

        return () => {
            if (scrollableRef.current) {
                scrollableRef.current.removeEventListener("scroll", onScroll)
            }
        }
    }, [scrollableRef])

    useEffect(() => {
        if (scrollableRef.current) {
            scrollableRef.current.scrollBy({
                left: -9999,
                behavior: "smooth"
            })
        }
    }, [type])

    return (
        <section id="tour" className="block">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{__('main.tour.title')}</h2>
            <p className="text-gray-500 dark:text-gray-300 text-sm">{__('main.tour.desc', {
                link: process.env.NEXT_PUBLIC_APP_NAME
            })}</p>
            <div className="w-full overflow-x-auto whitespace-nowrap flex flex-nowrap items-center space-x-2 py-2 gray-scrollbar mb-1">
                <button onClick={() => setType("domestic")} className={`!rounded-full tracking-wide !py-1 ${type === "domestic" ? "btn-outline-rose dark:btn-light" : "btn-light dark:btn-dark"}`}>{__('main.tour.local')}</button>
                <button onClick={() => setType("international")} className={`!rounded-full tracking-wide !py-1 ${type === "international" ? "btn-outline-rose dark:btn-light" : "btn-light dark:btn-dark"}`}>{__('main.tour.international')}</button>
            </div>

            <div className="relative w-full overflow-hidden">
                <div hidden={scrollX === 0} className="absolute -left-1 top-0 h-full w-6 bg-gradient-to-r from-white dark:from-gray-1000"></div>
                <div hidden={maxScroll} className="absolute -right-1 top-0 h-full w-6 bg-gradient-to-l from-white dark:from-gray-1000"></div>
                <button onClick={() => doScrollX('left')} className={`absolute top-1/2 shadow-lg -translate-y-1/2 btn-light dark:btn-dark !rounded-full !p-2 ${scrollX > 0 ? "left-2 opacity-100" : "opacity-0 -left-4"} transition-all duration-200`}>
                    <ArrowLeftIcon className="w-4 h-4" />
                </button>
                <button onClick={() => doScrollX('right')} className={`absolute top-1/2 shadow-lg -translate-y-1/2 btn-light dark:btn-dark !rounded-full !p-2 ${!maxScroll ? "right-2 opacity-100" : "opacity-0 -right-4"} transition-all duration-200`}>
                    <ArrowRightIcon className="w-4 h-4" />
                </button>
                {
                    loading 
                    ? <div className="w-full h-80 grid place-items-center">
                        <ThreeDots />
                    </div> 
                    : (
                        <div ref={scrollableRef} className="w-full overflow-x-auto no-scrollbar space-x-5 flex py-3 px-3">
                            {
                                destinations[type] && destinations[type].map((destination, index) => {
                                    return (
                                        <div key={index} className="min-w-[14rem] max-w-[14rem] bg-white dark:bg-gray-900 rounded-lg shadow block overflow-hidden cursor-pointer">
                                            <Image width={400} height={400} src={destination.image[0]} alt={destination.city.name} className="w-full h-48 object-cover" />
                                            <div className="p-4">
                                                <h3 className="text-base font-semibold text-gray-900 dark:text-white">{destination.name}</h3>
                                                <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                                                    <MapPinIcon className="w-4 h-4 mr-2 text-rose-600" />
                                                    {destination.city.name}, {destination.country.name}
                                                </p>
                                                <p title={destination.address} className="text-sm text-gray-700 dark:text-gray-300 my-2">{truncateString(destination.address, 32)}</p>
                                                <div className="flex items-end justify-end">
                                                    {/* <p className="text-xs text-gray-700">{__('main.price.start_from')}</p> */}
                                                    <p className="text-sm text-rose-600 font-semibold ml-1">{formatIDR(destination.price)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) 
                }
            </div>
            
        </section>
    )
}