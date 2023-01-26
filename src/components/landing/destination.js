import { useLocale } from "@/hooks/locale";
import { axios } from "@/libs/axios";
import { truncateString } from "@/util";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AirplaneTakeoffIcon, ThreeDots } from "../icons";

export const Destination = () => {
    const scrollableRef = useRef(null)
    const [country, setCountry] = useState("Indonesia")
    const [destinations, setDestinations] = useState({})
    const [loading, setLoading] = useState(false)
    const [scrollX, setScrollX] = useState(0)
    const [maxScroll, setMaxScroll] = useState(false)
    const { __ } = useLocale()

    const getDestinations = async () => {
        setLoading(true)
        await axios.get("/destinations").then(res => {
            setDestinations(res.data.data)
            setLoading(false)
            setTimeout(() => {
                scrollableRef.current.scrollBy({
                    left: 0.001,
                    behavior: "smooth"
                })
            }, 400)
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
    }, [country]);
    
    return (
        <section id="country" className="block">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{__('main.destination.title')}</h2>
            <p className="text-gray-500 dark:text-gray-300 text-sm">{__('main.destination.desc', {
                'link': process.env.NEXT_PUBLIC_APP_NAME
            })}</p>
            <div className="w-full overflow-x-auto whitespace-nowrap flex flex-nowrap items-center space-x-2 py-2 gray-scrollbar mb-1">
                <button type="button" onClick={() => setCountry("Indonesia")} className={`!rounded-full !tracking-wide !py-1 ${country === "Indonesia" ? "btn-outline-rose dark:btn-light" : "btn-light dark:btn-dark"}`}>{__('main.destination.indonesia')}</button>
                <button type="button" onClick={() => setCountry("Japan")} className={`!rounded-full !tracking-wide !py-1 ${country === "Japan" ? "btn-outline-rose dark:btn-light" : "btn-light dark:btn-dark"}`}>{__('main.destination.japan')}</button>
                <button type="button" onClick={() => setCountry("Singapore")} className={`!rounded-full !tracking-wide !py-1 ${country === "Singapore" ? "btn-outline-rose dark:btn-light" : "btn-light dark:btn-dark"}`}>{__('main.destination.singapore')}</button>
                <button type="button" onClick={() => setCountry("Malaysia")} className={`!rounded-full !tracking-wide !py-1 ${country === "Malaysia" ? "btn-outline-rose dark:btn-light" : "btn-light dark:btn-dark"}`}>{__('main.destination.malaysia')}</button>
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
                                destinations[country] && destinations[country].map((destination, index) => {
                                    return (
                                        <Link href={`/flights?a=${destination.airport.iata}&d_date=${moment().format("YYYY-MM-DD")}`} key={index} className="min-w-[14rem] bg-white dark:bg-gray-900 max-w-[14rem] rounded-lg shadow block overflow-hidden cursor-pointer">
                                            <Image width={400} height={400} src={destination.photo} alt={destination.city} className="w-full h-48 object-cover" />
                                            <div className="p-4">
                                                <h3 className="text-base font-bold text-gray-900 dark:text-white">{destination.city}</h3>
                                                <p className="text-sm text-gray-700 dark:text-gray-300">{moment().format("MMM DD, YYYY")}</p>

                                                <div className="flex items-center space-x-2 mt-2">
                                                    <div className="flex items-center space-x-1">
                                                        <AirplaneTakeoffIcon className="w-5 h-5 text-rose-600" />
                                                        <span title={destination.airport.name} className="text-sm text-gray-700 dark:text-gray-300">{truncateString(destination.airport.name, 14)} ({destination.airport.iata})</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    ) 
                }
            </div>
            
        </section>
    );
};