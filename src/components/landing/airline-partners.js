import { axios } from "@/libs/axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { SpinnerIcon } from "../icons"

export const AirlinePartners = () => {
    const [airlines, setAirlines] = useState([])
    const [loading, setLoading] = useState(false)

    const getAirlines = async () => {
        setLoading(true)
        await axios.get("/airlines").then(res => {
            setAirlines(res.data.data)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            toast.error("Failed to load airline partners.")
        })
    }

    useEffect(() => {
        getAirlines()
    }, [])

    return (
        <section id="airline-partners" className="block">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Airline Partners</h2>
            <div className="flex flex-wrap items-center justify-center w-full overflow-x-auto relative">
                {
                    loading && (
                        <div className="w-full h-full bg-white/70 dark:bg-black/30 absolute inset-0 grid place-items-center z-[50]">
                            <SpinnerIcon className="w-8 h-8 text-rose-600" />
                        </div>
                    )
                }
                {
                    airlines.map(airline => (
                        <div key={airline.id} className="grid place-items-center w-32 h-32 mx-4">
                            <Image src={airline.logo} alt={airline.name} width={100} height={100} />
                        </div>
                    ))
                }
            </div>
        </section>
    )
}