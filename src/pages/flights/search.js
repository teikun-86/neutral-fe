import AppLayout from '@/layouts/app';
import { LionAPI } from '@/libs/lion-api';
import { FlightTicket } from '@/components/flight';
import { ArrowRightIcon, Bars3BottomLeftIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import Link from 'next/link';
import { randomString, truncateString } from '@/util';
import { useRouter } from 'next/router';
import { PullToRefresh } from '@/components/pull-to-refresh';
import { Disclosure, Transition } from '@headlessui/react';
import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { Drawer } from '@/components/modal';
import { useRecoilState } from 'recoil';
import drawerState from '@/hooks/drawer';

const Search = ({ airports, options }) => {
    const router = useRouter()
    const [drawerOpen, setDrawerOpen] = useRecoilState(drawerState)
    const [sortByOpen, setSortByOpen] = useState(true)
    const [transitOpen, setTransitOpen] = useState(false)
    const [timeOpen, setTimeOpen] = useState(false)
    const [timeArrivalOpen, setTimeArrivalOpen] = useState(false)
    const [noTransit, setNoTransit] = useState(false)
    const [oneTransit, setOneTransit] = useState(false)
    const [gte2Transit, setGte2Transit] = useState(false)
    const [orderBy, setOrderBy] = useState("time")
    const [orderDesc, setOrderDesc] = useState(false)
    const [timeFilter, setTimeFilter] = useState(null)
    const [arrivalTimeFilter, setArrivalTimeFilter] = useState(null)

    const isFiltering = noTransit || oneTransit || gte2Transit || timeFilter !== null || arrivalTimeFilter !== null

    const timeOptions = {
        "0-6": {
            label: "00:00 - 06:00",
            value: {
                start: "00:00",
                end: "06:00"
            },
            disabled: moment().isAfter(moment(options.departureDate).set("hour", 6))
        },
        "6-12": {
            label: "06:00 - 12:00",
            value: {
                start: "06:00",
                end: "12:00",
            },
            disabled: moment().isAfter(moment(options.departureDate).set("hour", 12))
        },
        "12-18": {
            label: "12:00 - 18:00",
            value: {
                start: "12:00",
                end: "18:00",
            },
            disabled: moment().isAfter(moment(options.departureDate).set("hour", 18))
        },
        "18-24": {
            label: "18:00 - 24:00",
            value: {
                start: "18:00",
                end: "24:00",
            },
            disabled: moment().isAfter(moment(options.departureDate).set("hour", 24))
        },
    }

    const filteredDepartures = (!isFiltering ? airports.Departure : airports.Departure.filter((dep) => {
        let transitCount = Number(dep.RPH)
        let filteringTime = timeFilter !== null || arrivalTimeFilter !== null

        // if filtering time, ignore the transit filter
        let cond1 = filteringTime ? true : (noTransit && transitCount === 0)
        let cond2 = filteringTime ? true : (oneTransit && transitCount === 1)
        let cond3 = filteringTime ? true : (gte2Transit && transitCount >= 2)
        let cond4 = false
        let cond5 = false

        if (timeFilter !== null) {
            let depTime = moment(dep.DepartureDateTime)
            let depTimeStart = moment(options.departureDate).set("hour", timeOptions[timeFilter].value.start.split(":")[0]).set("minute", timeOptions[timeFilter].value.start.split(":")[1])
            let depTimeEnd = moment(options.departureDate).set("hour", timeOptions[timeFilter].value.end.split(":")[0]).set("minute", timeOptions[timeFilter].value.end.split(":")[1])
            cond4 = depTime.isBetween(depTimeStart, depTimeEnd)
        }

        if (arrivalTimeFilter !== null) {
            let arrTime = moment(dep.ArrivalDateTime)
            let arrTimeStart = moment(options.departureDate).set("hour", timeOptions[arrivalTimeFilter].value.start.split(":")[0]).set("minute", timeOptions[arrivalTimeFilter].value.start.split(":")[1])
            let arrTimeEnd = moment(options.departureDate).set("hour", timeOptions[arrivalTimeFilter].value.end.split(":")[0]).set("minute", timeOptions[arrivalTimeFilter].value.end.split(":")[1])
            cond5 = arrTime.isBetween(arrTimeStart, arrTimeEnd)
        }

        return cond1 || cond2 || cond3
    }).filter(dep => {
        let cond4 = true
        if (timeFilter !== null) {
            let depTime = moment(dep.DepartureDateTime)
            let depTimeStart = moment(options.departureDate).set("hour", timeOptions[timeFilter].value.start.split(":")[0]).set("minute", timeOptions[timeFilter].value.start.split(":")[1])
            let depTimeEnd = moment(options.departureDate).set("hour", timeOptions[timeFilter].value.end.split(":")[0]).set("minute", timeOptions[timeFilter].value.end.split(":")[1])
            cond4 = depTime.isBetween(depTimeStart, depTimeEnd)
        }
        return cond4
    }).filter(dep => {
        let cond5 = true
        if (arrivalTimeFilter !== null) {
            let arrTime = moment(dep.ArrivalDateTime)
            let arrTimeStart = moment(options.departureDate).set("hour", timeOptions[arrivalTimeFilter].value.start.split(":")[0]).set("minute", timeOptions[arrivalTimeFilter].value.start.split(":")[1])
            let arrTimeEnd = moment(options.departureDate).set("hour", timeOptions[arrivalTimeFilter].value.end.split(":")[0]).set("minute", timeOptions[arrivalTimeFilter].value.end.split(":")[1])
            cond5 = arrTime.isBetween(arrTimeStart, arrTimeEnd)
        }
        return cond5
    })).sort((a, b) => {
        if (orderBy === "time") {
            let aTime = moment(a.DepartureDateTime)
            let bTime = moment(b.DepartureDateTime)
            if (orderDesc) {
                return bTime.diff(aTime)
            } else {
                return aTime.diff(bTime)
            }
        }

        if (orderBy === "price") {
            let aPrice = Number(a.BookingClassAvail.sort((a, b) => Number(a.Amount) - Number(b.Amount))[0].Amount)
            let bPrice = Number(b.BookingClassAvail.sort((a, b) => Number(a.Amount) - Number(b.Amount))[0].Amount)
            if (orderDesc) {
                return bPrice - aPrice
            } else {
                return aPrice - bPrice
            }
        }
    })

    const resetFilter = () => {
        setNoTransit(false)
        setOneTransit(false)
        setGte2Transit(false)
        setOrderBy("time")
        setOrderDesc(false)
        setTimeFilter(null)
        setArrivalTimeFilter(null)
    }

    const Filter = ({ responsive = false }) => {
        return (
            <div className={`w-full block ${responsive ? "" : "bg-white rounded shadow p-2 my-2 max-h-[76vh] overflow-y-auto"} gray-scrollbar`}>
                <Disclosure defaultOpen={sortByOpen}>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="mt-2 flex w-full justify-between rounded-lg hocus:bg-rose-100 px-4 py-2 text-left text-sm font-medium hocus:text-rose-900 focus:outline-none focus:ring-0" onClick={() => {
                                setSortByOpen(!sortByOpen)
                            }}>
                                <span>Urutkan</span>
                                <Bars3BottomLeftIcon
                                    className="w-5 h-5 text-rose-600"
                                />
                            </Disclosure.Button>
                            <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Disclosure.Panel className="px-1 py-2 pb-2 text-sm text-gray-800 space-y-2">
                                    <button onClick={(e) => {
                                        setOrderBy("time")
                                        setOrderDesc(false)
                                    }} className="btn-light justify-between w-full">
                                        Keberangkatan (Paling Awal)
                                        <span className={`grid place-items-center w-6 h-6 rounded-full border ${orderBy === "time" && !orderDesc ? "border-rose-600 bg-rose-600 text-white" : "border-gray-400"}`}>
                                            {
                                                orderBy === "time" && !orderDesc && (
                                                    <CheckIcon className="w-5 h-5" />
                                                )
                                            }
                                        </span>
                                    </button>
                                    <button onClick={(e) => {
                                        setOrderBy("time")
                                        setOrderDesc(true)
                                    }} className="btn-light justify-between w-full">
                                        Keberangkatan (Paling Akhir)
                                        <span className={`grid place-items-center w-6 h-6 rounded-full border ${orderBy === "time" && orderDesc ? "border-rose-600 bg-rose-600 text-white" : "border-gray-400"}`}>
                                            {
                                                orderBy === "time" && orderDesc && (
                                                    <CheckIcon className="w-5 h-5" />
                                                )
                                            }
                                        </span>
                                    </button>
                                    <button onClick={(e) => {
                                        setOrderBy("price")
                                        setOrderDesc(false)
                                    }} className="btn-light justify-between w-full">
                                        Harga (Terendah)
                                        <span className={`grid place-items-center w-6 h-6 rounded-full border ${orderBy === "price" && !orderDesc ? "border-rose-600 bg-rose-600 text-white" : "border-gray-400"}`}>
                                            {
                                                orderBy === "price" && !orderDesc && (
                                                    <CheckIcon className="w-5 h-5" />
                                                )
                                            }
                                        </span>
                                    </button>
                                    <button onClick={(e) => {
                                        setOrderBy("price")
                                        setOrderDesc(true)
                                    }} className="btn-light justify-between w-full">
                                        Harga (Tertinggi)
                                        <span className={`grid place-items-center w-6 h-6 rounded-full border ${orderBy === "price" && orderDesc ? "border-rose-600 bg-rose-600 text-white" : "border-gray-400"}`}>
                                            {
                                                orderBy === "price" && orderDesc && (
                                                    <CheckIcon className="w-5 h-5" />
                                                )
                                            }
                                        </span>
                                    </button>
                                </Disclosure.Panel>
                            </Transition>
                        </>
                    )}
                </Disclosure>
                <Disclosure defaultOpen={transitOpen}>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="mt-2 flex w-full justify-between rounded-lg hocus:bg-rose-100 px-4 py-2 text-left text-sm font-medium hocus:text-rose-900 focus:outline-none focus:ring-0" onClick={() => {
                                setTransitOpen(!transitOpen)
                            }}>
                                <span>Transit</span>
                                <ChevronUpIcon
                                    className={`${open ? 'rotate-180 transform' : ''
                                        } h-5 w-5 text-rose-500 transition duration-100`}
                                />
                            </Disclosure.Button>
                            <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Disclosure.Panel className="px-1 py-2 pb-2 text-sm text-gray-800 space-y-2">
                                    <button onClick={(e) => setNoTransit(v => !v)} className="btn-light justify-between w-full">
                                        Langsung
                                        <span className={`grid place-items-center w-6 h-6 rounded border ${noTransit ? "border-rose-600 bg-rose-600 text-white" : "border-gray-400"}`}>
                                            {
                                                noTransit && (
                                                    <CheckIcon className="w-5 h-5" />
                                                )
                                            }
                                        </span>
                                    </button>
                                    <button onClick={(e) => setOneTransit(v => !v)} className="btn-light justify-between w-full">
                                        1 Transit
                                        <span className={`grid place-items-center w-6 h-6 rounded border ${oneTransit ? "border-rose-600 bg-rose-600 text-white" : "border-gray-400"}`}>
                                            {
                                                oneTransit && (
                                                    <CheckIcon className="w-5 h-5" />
                                                )
                                            }
                                        </span>
                                    </button>
                                    <button onClick={(e) => setGte2Transit(v => !v)} className="btn-light justify-between w-full">
                                        &#8805; 2 Transit
                                        <span className={`grid place-items-center w-6 h-6 rounded border ${gte2Transit ? "border-rose-600 bg-rose-600 text-white" : "border-gray-400"}`}>
                                            {
                                                gte2Transit && (
                                                    <CheckIcon className="w-5 h-5" />
                                                )
                                            }
                                        </span>
                                    </button>
                                </Disclosure.Panel>
                            </Transition>
                        </>
                    )}
                </Disclosure>
                <Disclosure defaultOpen={timeOpen}>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="mt-2 flex w-full justify-between rounded-lg hocus:bg-rose-100 px-4 py-2 text-left text-sm font-medium hocus:text-rose-900 focus:outline-none focus:ring-0" onClick={() => {
                                setTimeOpen(!timeOpen)
                            }}>
                                <span>Waktu Keberangkatan</span>
                                <ChevronUpIcon
                                    className={`${open ? 'rotate-180 transform' : ''
                                        } h-5 w-5 text-rose-500 transition duration-100`}
                                />
                            </Disclosure.Button>
                            <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Disclosure.Panel className="px-1 py-2 pb-2 text-sm text-gray-800 space-y-2">
                                    {
                                        Object.keys(timeOptions).map((index) => {
                                            const timeOption = timeOptions[index]
                                            return (
                                                <button disabled={timeOption.disabled} key={index} onClick={(e) => {
                                                    setTimeFilter(time => time === index ? null : index)
                                                }} className="btn-light justify-between w-full" >
                                                    {timeOption.label}
                                                    <span className={`grid place-items-center w-6 h-6 rounded-full border ${timeFilter === index ? "border-rose-600 bg-rose-600 text-white" : "border-gray-400"}`}>
                                                        {
                                                            timeFilter === index && (
                                                                <CheckIcon className="w-5 h-5" />
                                                            )
                                                        }
                                                    </span>
                                                </button>
                                            )
                                        })
                                    }
                                </Disclosure.Panel>
                            </Transition>
                        </>
                    )}
                </Disclosure>
                <Disclosure defaultOpen={timeArrivalOpen}>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="mt-2 flex w-full justify-between rounded-lg hocus:bg-rose-100 px-4 py-2 text-left text-sm font-medium hocus:text-rose-900 focus:outline-none focus:ring-0" onClick={() => {
                                setTimeArrivalOpen(!timeArrivalOpen)
                            }}>
                                <span>Waktu Tiba</span>
                                <ChevronUpIcon
                                    className={`${open ? 'rotate-180 transform' : ''
                                        } h-5 w-5 text-rose-500 transition duration-100`}
                                />
                            </Disclosure.Button>
                            <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Disclosure.Panel className="px-1 py-2 pb-2 text-sm text-gray-800 space-y-2">
                                    {
                                        Object.keys(timeOptions).map((index) => {
                                            const timeOption = timeOptions[index]
                                            return (
                                                <button key={index} onClick={(e) => {
                                                    setArrivalTimeFilter(time => time === index ? null : index)
                                                }} className="btn-light justify-between w-full" >
                                                    {timeOption.label}
                                                    <span className={`grid place-items-center w-6 h-6 rounded-full border ${arrivalTimeFilter === index ? "border-rose-600 bg-rose-600 text-white" : "border-gray-400"}`}>
                                                        {
                                                            arrivalTimeFilter === index && (
                                                                <CheckIcon className="w-5 h-5" />
                                                            )
                                                        }
                                                    </span>
                                                </button>
                                            )
                                        })
                                    }
                                </Disclosure.Panel>
                            </Transition>
                        </>
                    )}
                </Disclosure>
            </div>
        )
    }

    const onRefresh = () => {
        router.replace(router.asPath)
    }

    return (
        <AppLayout showGoToTopButton fixed={false} title="Cari Tiket Pesawat ー Neutral">
            <div className="w-full py-2 pb-0 bg-gray-100 shadow-lg sticky transition duration-200 top-0 px-4 z-40">
                <div className="w-full max-w-7xl mx-auto">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800">Pilih Penerbangan Pergi</h2>
                    <div className="md:flex items-center md:justify-between">
                        <div className="flex items-center flex-wrap space-x-2 text-sm md:text-base text-gray-900 font-semibold w-full">
                            <div className="flex items-center space-x-2">
                                <span><span className="hidden md:inline">{truncateString(options.departureAirport.airportName)}</span> ({options.departFrom})</span>
                                <ArrowRightIcon className="w-5 h-5" />
                                <span><span className="hidden md:inline">{truncateString(options.arrivalAirport.airportName)}</span> ({options.arriveAt})</span>
                            </div>
                            <span className="middot"></span>
                            <span>{moment(options.departureDate).format("ddd, D MMM")}</span>
                            <span className="middot"></span>
                            <span>{options.passengers} Penumpang</span>
                            <span className="middot"></span>
                            <span>{options.class}</span>
                        </div>
                        <Link href="/flights" className="btn-rose rounded-full px-5 w-full md:w-auto my-2 whitespace-nowrap uppercase tracking-wider text-xs">Ubah Pencarian</Link>
                    </div>
                </div>
            </div>
            <div className="my-3 w-full max-w-7xl mx-auto flex">
                <div className="hidden md:block w-3/12 py-3">
                    <div className="w-full p-4 sticky top-24">
                        <div className="flex items-center justify-between">
                            <h6 className="text-gray-800 font-semibold text-lg">Filter</h6>
                            <button onClick={resetFilter} className="btn-rose rounded-full uppercase px-2 py-1">Reset</button>
                        </div>
                        <Filter />
                    </div>
                </div>

                <div className="w-full md:w-9/12 p-3">
                    <PullToRefresh onRefresh={onRefresh}>
                        {
                            filteredDepartures.length <= 0
                                ? <div className="flex items-center justify-center text-gray-700">
                                    {
                                        isFiltering
                                            ? <div className="flex items-center flex-col justify-center">
                                                Tidak ada penerbangan yang sesuai dengan filter yang anda pilih.
                                                <span>Ubah atau <button onClick={resetFilter} className="btn-text text-gray-900 underline px-1 py-0">Reset Filter.</button></span>
                                            </div>
                                            : "Tidak ada penerbangan tersedia pada tanggal tersebut. Pilih tanggal lain atau ubah bandara keberangkatan."
                                    }
                                </div>
                                : (
                                    <>
                                        <p className="text-left text-gray-700">Menampilkan {filteredDepartures.length} penerbangan terbaik {isFiltering ? "sesuai filter yang anda terapkan" : ""}</p>
                                        {
                                            filteredDepartures.map(dep => {
                                                return <FlightTicket key={dep.AirEquipType + randomString(12)} departure={dep} />
                                            })
                                        }
                                    </>
                                )
                        }
                    </PullToRefresh>
                </div>
            </div>
            <button onClick={() => setDrawerOpen('flightFilterDrawer')} className="md:hidden fixed bottom-3 left-3 btn-rose rounded-full uppercase">
                <Bars3BottomLeftIcon className="w-5 h-5 mr-2" />
                Filter
            </button>
            <Drawer id="flightFilterDrawer">
                <Drawer.Header>
                    <h6 className="text-center text-lg font-semibold text-gray-800">Filter</h6>
                </Drawer.Header>
                <Drawer.Body>
                    <Filter responsive />
                </Drawer.Body>
                <Drawer.Footer className="flex items-center justify-end space-x-3">
                    <button onClick={() => setDrawerOpen("")} className="btn-gray rounded-full">Tutup</button>
                    <button onClick={resetFilter} className="btn-rose rounded-full uppercase tracking-wider">Reset</button>
                </Drawer.Footer>
            </Drawer>
        </AppLayout>
    );
};

/**
 * Get the server side props
 * @param {import('next').NextApiRequest} req 
 */
export async function getServerSideProps(req) {
    let query = req.query
    let api = new LionAPI()
    let flights = api.flight().departure(query.d).arrival(query.a).departureDate(query.d_date).adult(query.adult).children(query.child)
    if (query.r_date) {
        flights.roundTrip().returnDate(query.r_date)
    } else {
        flights.oneWayTrip()
    }
    let res = await flights.get()
    let departures = res !== undefined ? res.Departure.filter(dep => dep.BookingClassAvail.length > 0) : []
    let returns = res !== undefined ? res.Return.filter(dep => dep.BookingClassAvail.length > 0) : []
    let results = {
        Departure: departures,
        Return: returns
    }

    let departureAirport = await api.airport().iata(query.d).first()
    let arrivalAirport = await api.airport().iata(query.a).first()

    return {
        props: {
            airports: results,
            options: {
                departFrom: query.d,
                arriveAt: query.a,
                departureDate: query.d_date,
                passengers: Number(query.adult) + Number(query.child),
                class: query.class,
                departureAirport,
                arrivalAirport
            }
        }
    }
}

export default Search;