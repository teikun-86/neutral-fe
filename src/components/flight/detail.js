import lionAirLogo from "@/assets/images/airlines/lion-air-logo.png"
import thaiLionAirLogo from "@/assets/images/airlines/thai-lion-air-logo.png"
import batikAirLogo from "@/assets/images/airlines/batik-air-logo.png"
import superAirJetLogo from "@/assets/images/airlines/super-air-jet-logo.svg"
import wingsAirLogo from "@/assets/images/airlines/wings-air-logo.png"
import Image from 'next/image';
import moment from 'moment';
import { formatIDR, randomString } from '@/util';
import { useState } from "react";
import { ArchiveBoxIcon, BoltIcon, ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "../tooltip";
import { Transition } from "@headlessui/react";

export const FlightDetail = ({ departure, ...props }) => {
    const [open, setOpen] = useState(false)
    const [section, setSection] = useState("flight-detail")

    let splitted = departure.Duration.split(":")
    let flightDuration = {
        h: splitted[0].startsWith("0") ? splitted[0].substring(1) : splitted[0],
        m: splitted[1].startsWith("0") ? splitted[1].substring(1) : splitted[1],
    }

    let classesAvailable = departure.BookingClassAvail
    let cheapest = classesAvailable.sort((a, b) => {
        return Number(a.Amount) - Number(b.Amount)
    })

    const airlineLogo = {
        "Lion Air": lionAirLogo,
        "Thai Lion Air": thaiLionAirLogo,
        "Batik Air": batikAirLogo,
        "Batik Air Malaysia": batikAirLogo,
        "Super Air Jet": superAirJetLogo,
        "Wings Air": wingsAirLogo,
    }

    // check if the ArrivalDate is the same day as DepartureDate
    let isSameDay = moment(departure.ArrivalDate).isSame(departure.DepartureDate, 'day')
    // if not, then get the difference between the two dates
    let diffDays = isSameDay ? 0 : moment(departure.ArrivalDate).diff(departure.DepartureDate, 'days')

    return (
        <div key={departure.FlightNumber + randomString(12)} className="block w-full p-2 rounded-lg bg-white my-3 shadow">
            <div className="flex w-full items-center space-x-2">
                <div className="w-20 h-14 grid place-items-center p-1">
                    <Image src={airlineLogo[departure.OperatingAirline.CompanyShortName.replace("Operated by", "").trim()]} className="w-auto h-auto block" alt="Lion Air" />
                </div>
                <h6 className="text-lg font-semibold text-gray-900">{departure.OperatingAirline.CompanyShortName.replace("Operated by", "").trim()}</h6>
            </div>
            <div className="flex items-center justify-between mt-2 flex-wrap">
                <div className="flex items-center px-3 w-full lg:w-1/2">
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-lg font-bold text-gray-700">{moment(departure.DepartureDateTime).format("HH:MM")}</span>
                        <span className="px-2 py-1 rounded-full shadow font-semibold text-xs bg-gray-100">{departure.DepartureAirport}</span>
                    </div>
                    <div className="grid place-items-center mx-3 w-full lg:w-auto">
                        <span className="text-xs font-bold text-gray-700">{flightDuration.h}j {flightDuration.m}m</span>
                        <div className="flex items-center my-3 relative w-full lg:w-32">
                            <div className="absolute w-full h-0.5 bg-gray-200 inset-0 rounded-full">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="w-2 h-2 rounded-full bg-rose-300 absolute left-0"></span>
                                    {
                                        departure.RPH !== 0 && (
                                            Array.from(Array(Number(departure.RPH))).map(tr => (
                                                <span className="w-2 h-2 mx-1 rounded-full bg-gray-400" key={tr + randomString(5)}></span>
                                            ))
                                        )
                                    }
                                    <span className="w-2 h-2 rounded-full bg-rose-300 absolute right-0"></span>
                                </div>
                            </div>
                        </div>
                        <span className="text-xs text-gray-700">
                            {
                                departure.RPH === "0"
                                    ? "Langsung"
                                    : `${departure.RPH} Transit`
                            }
                        </span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-lg font-bold text-gray-700">
                            {moment(departure.ArrivalDateTime).format("HH:MM")}
                            {
                                diffDays > 0 && (
                                    <sup className="text-xs text-gray-500">(+{diffDays}d)</sup>
                                )
                            }
                        </span>
                        <span className="px-2 py-1 rounded-full shadow font-semibold text-xs bg-gray-100">{departure.ArrivalAirport}</span>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 px-3 pt-3 lg:pt-0">
                    <div className="flex w-full justify-between items-end lg:block">
                        <div className="w-full flex flex-col lg:items-end">
                            <ul className="list-none">
                                <li className="flex items-center lg:justify-between space-x-2 lg:flex-row-reverse">
                                    <ArchiveBoxIcon className="w-4 h-4 lg:ml-2 text-rose-500" />
                                    <span className="text-xs text-gray-700">Bagasi 20KG</span>
                                </li>
                                <li className="flex items-center lg:justify-between space-x-2 lg:flex-row-reverse">
                                    <ShoppingBagIcon className="w-4 h-4 lg:ml-2 text-rose-500" />
                                    <span className="text-xs text-gray-700">Bagasi Kabin 7KG</span>
                                </li>
                                <li className="flex items-center lg:justify-between space-x-2 lg:flex-row-reverse">
                                    <BoltIcon className="w-4 h-4 lg:ml-2 text-rose-500" />
                                    <span className="text-xs text-gray-700">USB port/power</span>
                                </li>
                            </ul>
                        </div>
                        <div className="flex items-end justify-end space-x-2 mt-2 w-full">
                            <button onClick={() => setOpen(open => !open)} className="btn-text text-gray-700 px-0">Detail Penerbangan</button>
                        </div>
                    </div>
                </div>
            </div>
            <Transition
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                className="block w-full"
            >
                <div className="w-full bg-white p-3 rounded-lg block relative">
                    <button onClick={() => setOpen(false)} className="absolute top-2 right-2 p-2 rounded-full outline-none focus:outline-none">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                    <div className="flex items-center justify-center py-2 px-3 border-b-2 border-gray-300 space-x-2">
                        <button onClick={() => setSection("flight-detail")} className={`px-3 py-2 -mb-2.5 border-b-2 ${section === "flight-detail" ? "border-rose-600 text-rose-600" : "border-gray-300 text-gray-700"} text-sm font-semibold`}>Detail Penerbangan</button>
                        <button onClick={() => setSection("price-detail")} className={`px-3 py-2 -mb-2.5 border-b-2 ${section === "price-detail" ? "border-rose-600 text-rose-600" : "border-gray-300 text-gray-700"} text-sm font-semibold`}>Detail Harga</button>
                    </div>
                    <div hidden={section !== "flight-detail"}>
                        <p className="text-center">Flight Detail<br />Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab natus, fuga repellat quae similique distinctio quidem mollitia modi nulla maiores quia ducimus accusantium adipisci possimus praesentium vero voluptatibus a? Non!</p>
                    </div>
                    <div hidden={section !== "price-detail"}>
                        <p className="text-center">Price Detail<br />Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab natus, fuga repellat quae similique distinctio quidem mollitia modi nulla maiores quia ducimus accusantium adipisci possimus praesentium vero voluptatibus a? Non!</p>
                    </div>
                </div>
            </Transition>
        </div>
    )
}