import { LionAPI } from "@/libs/lion-api"
import { objectToQueryString, searchString } from "@/util"
import { Transition } from "@headlessui/react"
import { ArrowsRightLeftIcon, CalendarDaysIcon, ChevronDownIcon, MagnifyingGlassIcon, MinusIcon, PlusIcon, UserGroupIcon, XMarkIcon } from "@heroicons/react/24/outline"
import debounce from "lodash.debounce"
import moment from "@/libs/moment"
import { useRouter } from "next/router"
import { useCallback, useEffect, useMemo, useRef, useState, Fragment } from "react"
import Datepicker from "react-tailwindcss-datepicker"
import { AirportButton } from "../button"
import Combobox from "../combobox"
import useOutsideClick from "@/hooks/outsideclick"
import { AirplaneLandingIcon, AirplaneTakeoffIcon, HistoryIcon } from "../icons"
import { RoseTooltip } from "../tooltip"

export const FlightForm = ({ onSearch = () => {}, onFailed = () => {}, intl = false, ...props }) => {
    const passengerRef = useRef(null)
    const router = useRouter()

    const [query, setQuery] = useState('')
    const [tripType, setTripType] = useState('one-way')
    const [departure, setDeparture] = useState({})
    const [arrival, setArrival] = useState({})
    const [airports, setAirports] = useState([])
    const [queriedAirports, setQueriedAirports] = useState([])
    const [departureDate, setDepartureDate] = useState(new Date())
    const [returnDate, setReturnDate] = useState(new Date(moment(departureDate).add(1, 'days')))

    const [recentAirports, setRecentAirports] = useState([])

    const [depError, setDepError] = useState(false)
    const [arrError, setArrERror] = useState(false)
    const [dDateError, setDDateError] = useState(false)
    const [aDateError, setADateError] = useState(false)

    const [showPassenger, setShowPassenger] = useState(false)
    const [adult, setAdult] = useState(1)
    const [child, setChild] = useState(0)
    const [infant, setInfant] = useState(0)
    const [passengerClass, setPassengerClass] = useState('Ekonomi')

    const queryAirports = useCallback((query) => {
        let results = airports.filter(airport => {
            return searchString(query, airport.airportCode)
                || searchString(query, airport.airportName)
                || searchString(query, airport.airportLocation)
                || searchString(query, airport.cityCode)
                || searchString(query, airport.cityName)
                || searchString(query, airport.countryName)
        })
        setQueriedAirports(results)
    }, [airports])

    const handleChange = useCallback((event) => {
        setQuery(event.target.value)
        queryAirports(event.target.value)
    }, [queryAirports])

    const debounceQueryAirports = useMemo(() => {
        return debounce(handleChange, 400)
    }, [handleChange])

    useOutsideClick({
        ref: passengerRef, callback: () => {
            setShowPassenger(false)
        }
    })

    const switchDA = () => {
        let d = departure
        let a = arrival
        setArrival(d)
        setDeparture(a)
    }

    const searchFlight = () => {
        if (!checkInput()) return

        let params = {
            d: departure.airportCode,
            a: arrival.airportCode,
            d_date: moment(departureDate).format("YYYY-MM-DD"),
            adult: adult,
            child: child,
            infant: infant,
            class: passengerClass,
        };

        if (tripType === 'round') params.r_date = moment(returnDate).format("YYYY-MM-DD")

        let recents = recentAirports
        let depIndex = recents.findIndex(airport => airport.airportCode === departure.airportCode)
        if (depIndex !== -1) recents.splice(depIndex, 1)
        recents.unshift(departure)
        let arrIndex = recents.findIndex(airport => airport.airportCode === arrival.airportCode)
        if (arrIndex !== -1) recents.splice(arrIndex, 1)
        recents.unshift(arrival)
        if (recents.length > 5) recents.pop()

        setRecentAirports(recents)

        localStorage.setItem('__rc_airports', JSON.stringify(recents))

        let lastFlight = {
            d: departure,
            a: arrival,
            d_date: moment(departureDate).format("YYYY-MM-DD"),
            adult: adult,
            child: child,
            infant: infant,
            class: passengerClass,
        }

        if (tripType === 'round') lastFlight.r_date = moment(returnDate).format("YYYY-MM-DD")

        localStorage.setItem('__rc_flight_search', JSON.stringify(lastFlight))

        onSearch(params)
        
        window.scrollTo(0, 0)

        router.push(`/flights/search?${objectToQueryString(params)}`)
    }

    const getAirports = async () => {
        let intlAirports = localStorage.getItem('__airports_data_intl')
        let localAirports = localStorage.getItem('__airports_data_local')
        if (intlAirports) {
            intlAirports = JSON.parse(intlAirports)
            if (moment().diff(moment(intlAirports.lastUpdate), 'days') > 1) {
                intlAirports = null
            }
        }
        if (localAirports) {
            localAirports = JSON.parse(localAirports)
            if (moment().diff(moment(localAirports.lastUpdate), 'days') > 1) {
                localAirports = null
            }
        }

        if (intlAirports && localAirports) {
            let airports = intl ? intlAirports.airports : localAirports.airports
            setAirports(airports)
            return
        }

        await refetchAirports()
    }

    const refetchAirports = async () => {
        let api = (new LionAPI()).airport()
        let airports = await api.intl().get()
        let local = airports.filter(airport => airport.countryName === 'Indonesia')
        setAirports(intl ? airports : local)
        localStorage.setItem('__airports_data_intl', JSON.stringify({
            airports: airports,
            lastUpdate: moment().format()
        }))
        localStorage.setItem('__airports_data_local', JSON.stringify({
            airports: local,
            lastUpdate: moment().format()
        }))
    }

    const checkInput = useCallback(() => {
        let dep = !departure.type
        let arr = !arrival.type
        let ddt = moment(departureDate).isBefore(moment().format('YYYY-MM-DD')) || departureDate === null
        let rdt = tripType !== 'round' ? false : (moment(returnDate).isBefore(departureDate) || returnDate === null)

        setDepError(dep)
        setArrERror(arr)
        setDDateError(ddt)
        setADateError(rdt)

        return !dep && !arr && !ddt && !rdt
    }, [arrival, departure, departureDate, returnDate, tripType])

    const cancelSearching = useCallback(() => {
        onFailed()
    }, [])

    useEffect(() => {
        router.events.on("routeChangeError", cancelSearching)
        return () => {
            router.events.off("routeChangeError", cancelSearching)
        }
    }, [cancelSearching, router.events])

    useEffect(() => {
        let search = JSON.parse(localStorage.getItem("__rc_flight_search"))
        if (search) {
            setDeparture(search.d)
            setArrival(search.a)
            setDepartureDate(search.d_date)
            if (search.r_date) {
                setTripType('round')
                setReturnDate(search.r_date)
            }
            setAdult(search.adult)
            setChild(search.child)
            setInfant(search.infant)
            setPassengerClass(search.class)
        }
        getAirports()
        setRecentAirports(JSON.parse(localStorage.getItem("__rc_airports")) ?? [])
    }, [])

    return (
        <div className="w-full rounded-lg bg-white dark:bg-gray-900">
            <div className="my-2 px-4 py-2">
                <div className="w-full my-2 flex items-center space-x-4">
                    <label htmlFor="onewayTrip" className="flex items-center select-none">
                        <input checked={tripType === 'one-way'} onChange={(e) => setTripType(e.target.value)} type="radio" name="triptype" id="onewayTrip" value="one-way" className="form-radio text-rose-600 focus:ring-rose-600 transition-all duration-200 mr-2 " />
                        Sekali Jalan
                    </label>
                    <label htmlFor="roundTrip" className="flex items-center select-none">
                        <input checked={tripType === 'round'} onChange={(e) => setTripType(e.target.value)} type="radio" name="triptype" id="roundTrip" value="round" className="form-radio text-rose-600 focus:ring-rose-600 transition-all duration-200 mr-2 " />
                        Pulang-Pergi
                    </label>
                </div>
            </div>
            <div className="w-full flex items-center flex-wrap">
                <div className="w-full md:w-1/2 lg:w-1/4 p-2 relative md:border-r border-b md:border-b-0 border-gray-300/70 px-2 md:px-5">
                    <div className="w-full rounded-lg">
                        <label htmlFor="departureInput" className="text-base font-semibold text-gray-500">Dari</label>
                        <div className="flex items-center w-full relative">
                            <span className="text-rose-600">
                                <AirplaneTakeoffIcon className="w-7 h-7" />
                            </span>
                            <Combobox value={departure} id="departureCombobox" onChange={(value) => {
                                setDeparture(value)
                                setDepError(false)
                            }}>
                                <Combobox.Input onChange={debounceQueryAirports} placeholder="Cari Kota/Bandara" type="text" id="departureInput" className="select-all w-full px-1 text-base font-semibold text-gray-900 border-0 outline-none focus:outline-none focus:ring-0" displayValue={(d) => d.type ? `${d.airportName} (${d.airportCode})` : ""} />
                                <Combobox.Container afterLeave={() => {
                                    setQuery('')
                                    setQueriedAirports([])
                                }} className="!left-0">
                                    <Combobox.Header>
                                        <div className="flex items-center justify-between">
                                            <h5 className="text-base font-semibold text-gray-900">Cari Kota/Bandara</h5>
                                            <button className="w-8 h-8 rounded-full grid place-items-center border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 hocus:bg-gray-100" type="button">
                                                <XMarkIcon className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </Combobox.Header>
                                    <Combobox.Options>
                                        {
                                            queriedAirports.length === 0
                                                ? (
                                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                        {
                                                            query === '' ? "Cari Kota/Bandara" : "Tidak ada hasil. Coba cari tujuan lain."
                                                        }
                                                    </div>
                                                )
                                                : (
                                                    queriedAirports.map(airport => (
                                                        <Combobox.Option key={airport.id + airport.countryName + airport.cityName} value={airport}>
                                                            {({ selected, active }) => (
                                                                <AirportButton query={query} selected={selected} active={active} airport={airport} />
                                                            )}
                                                        </Combobox.Option>
                                                    ))
                                                )
                                        }
                                        {
                                            recentAirports.length > 0 && (
                                                <>
                                                    <div className="flex items-center justify-start px-3 py-2">
                                                        <HistoryIcon className="w-5 h-5 mr-3" />
                                                        <h5 className="text-gray-900 font-semibold text-base">Pencarian Terakhir</h5>
                                                    </div>
                                                    {
                                                        recentAirports.map(airport => (
                                                            <Combobox.Option key={airport.id + airport.countryName + airport.cityName} value={airport}>
                                                                {({ selected, active }) => (
                                                                    <AirportButton selected={selected} active={active} airport={airport} />
                                                                )}
                                                            </Combobox.Option>
                                                        ))
                                                    }
                                                </>
                                            )
                                        }
                                    </Combobox.Options>
                                </Combobox.Container>
                            </Combobox>
                            {
                                depError && query === '' && (
                                    <RoseTooltip>Isi Kota/Bandara asal</RoseTooltip>
                                )
                            }
                        </div>
                    </div>
                    <button type="button" onClick={switchDA} className="cursor-pointer grid place-items-center w-7 h-7 rounded-full border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 absolute md:-right-4 md:top-1/2 md:-translate-y-1/2 -bottom-4 md:bottom-auto left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 rotate-90 md:rotate-0 outline-none focus:outline-none">
                        <ArrowsRightLeftIcon className="w-5 h-5 text-rose-600" />
                    </button>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 p-2 relative lg:border-r border-b md:border-b-0 border-gray-300/70 px-2 md:px-5">
                    <div className="w-full rounded-lg">
                        <label htmlFor="arrivalInput" className="text-base font-semibold text-gray-500">Ke</label>
                        <div className="flex items-center w-full relative">
                            <span className="text-rose-600">
                                <AirplaneLandingIcon className="w-7 h-7" />
                            </span>
                            <Combobox value={arrival} id="arrivalCombobox" onChange={(value) => {
                                setArrival(value)
                                setArrERror(false)
                            }}>
                                <Combobox.Input onChange={debounceQueryAirports} placeholder="Cari Kota/Bandara" type="text" id="arrivalInput" className="select-all w-full px-1 text-base font-semibold text-gray-900 border-0 outline-none focus:outline-none focus:ring-0" displayValue={(d) => d.type ? `${d.airportName} (${d.airportCode})` : ""} />
                                <Combobox.Container afterLeave={() => {
                                    setQuery('')
                                    setQueriedAirports([])
                                }}>
                                    <Combobox.Header>
                                        <div className="flex items-center justify-between">
                                            <h5 className="text-base font-semibold text-gray-900">Cari Kota/Bandara</h5>
                                            <button className="w-8 h-8 rounded-full grid place-items-center border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 hocus:bg-gray-100" type="button">
                                                <XMarkIcon className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </Combobox.Header>
                                    <Combobox.Options>
                                        {
                                            queriedAirports.length === 0
                                                ? (
                                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                        {
                                                            query === '' ? "Cari Kota/Bandara" : "Tidak ada hasil. Coba cari tujuan lain."
                                                        }
                                                    </div>
                                                )
                                                : (
                                                    queriedAirports.map(airport => (
                                                        <Combobox.Option key={airport.id + airport.countryName + airport.cityName} value={airport}>
                                                            {({ selected, active }) => (
                                                                <AirportButton query={query} selected={selected} active={active} airport={airport} />
                                                            )}
                                                        </Combobox.Option>
                                                    ))
                                                )
                                        }
                                        {
                                            recentAirports.length > 0 && (
                                                <>
                                                    <div className="flex items-center justify-start px-3 py-2">
                                                        <HistoryIcon className="w-5 h-5 mr-3" />
                                                        <h5 className="text-gray-900 font-semibold text-base">Pencarian Terakhir</h5>
                                                    </div>
                                                    {
                                                        recentAirports.map(airport => (
                                                            <Combobox.Option key={airport.id + airport.countryName + airport.cityName} value={airport}>
                                                                {({ selected, active }) => (
                                                                    <AirportButton selected={selected} active={active} airport={airport} />
                                                                )}
                                                            </Combobox.Option>
                                                        ))
                                                    }
                                                </>
                                            )
                                        }
                                    </Combobox.Options>
                                </Combobox.Container>
                            </Combobox>
                            {
                                arrError && query === '' && (
                                    <RoseTooltip>Isi Kota/Bandara tujuan</RoseTooltip>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 p-2 relative mt-2 lg:mt-0 md:border-r border-b md:border-b-0 border-gray-300/70 px-2 md:px-5">
                    <div className="w-full rounded-lg">
                        <label htmlFor="arrivalDateInput" className="text-base font-semibold text-gray-500 mb-3 block">Berangkat</label>
                        <div className="flex items-center w-full relative">
                            <span className="text-rose-600">
                                <CalendarDaysIcon className="w-7 h-7" />
                            </span>
                            <Datepicker
                                asSingle
                                useRange={false}
                                primaryColor="rose"
                                onChange={(val) => {
                                    setDDateError(false)
                                    if (moment(val.startDate).isBefore(moment())) {
                                        setDepartureDate(new Date())
                                        return
                                    }
                                    setDepartureDate(val.startDate)
                                    if (moment(returnDate).isSameOrBefore(moment(val.startDate))) {
                                        setReturnDate(moment(val.startDate).add(1, 'days').format('YYYY-MM-DD'))
                                    }
                                }}
                                displayFormat="ddd, D MMM YYYY"
                                value={{ startDate: departureDate, endDate: departureDate }}
                                inputClassName="select-all w-full px-1 text-base font-semibold text-gray-900 border-0 cursor-pointer outline-none focus:outline-none focus:ring-0 disabled:opacity-50 z-40"
                                containerClassName="z-50"
                            />
                            {
                                dDateError && (
                                    <RoseTooltip>Tanggal Berangkat harus sama dengan atau setelah {moment().format('ddd, D MMM YYYY')}</RoseTooltip>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 p-2 relative border-b md:border-b-0 border-gray-300/70 px-2 md:px-5">
                    <div className="w-full rounded-lg">
                        <label htmlFor="roundTripCheckBox" className="text-base mb-3 font-semibold text-gray-500 flex items-center select-none">
                            <input id="roundTripCheckBox" type="checkbox" checked={tripType === 'round'} onChange={(e) => setTripType(e.target.checked ? 'round' : 'one-way')} className="form-checkbox text-rose-600 rounded focus:ring-rose-600 transition-all duration-200 mr-2" />
                            Pulang
                        </label>
                        <div className="flex items-center w-full relative">
                            <span className="text-rose-600">
                                <CalendarDaysIcon className="w-7 h-7" />
                            </span>
                            <Datepicker
                                asSingle
                                useRange={false}
                                primaryColor="rose"
                                onChange={(val) => {
                                    if (moment(val.startDate).isSameOrBefore(moment(departureDate))) {
                                        setReturnDate(moment(departureDate).add(1, 'days').format('YYYY-MM-DD'))
                                        return
                                    }
                                    setReturnDate(val.startDate)
                                    setADateError(false)
                                }}
                                displayFormat="ddd, D MMM YYYY"
                                value={{ startDate: returnDate, endDate: returnDate }}
                                inputClassName="select-all w-full px-1 text-base font-semibold text-gray-900 border-0 cursor-pointer outline-none focus:outline-none focus:ring-0 disabled:opacity-50 z-40"
                                disabled={tripType !== 'round'}
                                containerClassName="z-50"
                            />
                            {
                                aDateError && (
                                    <RoseTooltip>
                                        Tanggal Kembali harus setelah {departureDate !== null ? moment(departureDate).format('ddd, D MMM YYYY') : "Tanggal berangkat"}
                                    </RoseTooltip>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="w-full p-2 relative px-2 md:px-5">
                    <h6 htmlFor="passengerInfo" className="text-base font-semibold text-gray-500 mb-3 block">Penumpang & Kelas Kabin</h6>
                    <div className="w-full relative block z-10">
                        <button className="select-none w-full text-base font-semibold text-gray-900 border-0 outline-none focus:outline-none focus:ring-0 flex items-center justify-between" onClick={() => setShowPassenger((show) => !show)}>
                            <div className="flex items-center">
                                <UserGroupIcon className="w-7 h-7 text-rose-600 mr-1" />
                                {passengerClass} | {adult} Dewasa, {child} Anak, {infant} Bayi
                            </div>
                            <ChevronDownIcon className={`w-6 h-6 ${showPassenger ? "rotate-180" : ""} transition-all duration-200`} />
                        </button>
                        <Transition
                            show={showPassenger}
                            enter="transition-all duration-200"
                            enterFrom="-translate-y-4 opacity-0 scale-95"
                            enterTo="translate-y-0 opacity-100 scale-100"
                            leave="transition-all duration-200"
                            leaveFrom="translate-y-0 opacity-100 scale-100"
                            leaveTo="translate-y-4 opacity-0 scale-95"
                            ref={passengerRef}
                        >
                            <div className="absolute top-4 w-full bg-white shadow p-3 rounded-lg z-50">
                                <div className="w-full flex flex-wrap">
                                    <div className="w-full md:w-1/2 md:border-r md:border-gray-300/30 p-3">
                                        <h5 className="text-lg font-semibold text-gray-700">Penumpang</h5>
                                        <div className="flex items-center w-full justify-between">
                                            <h6 className="text-base font-semibold text-gray-800">
                                                Dewasa<br />
                                                <small className="font-normal text-xs text-gray-500">Usia 12 tahun keatas</small>
                                            </h6>
                                            <div className="flex items-center justify-end">
                                                <button disabled={adult <= 1} className="cursor-pointer bg-white hover:bg-gray-50 focus:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed outline-none border-0 ring-0 focus:outline-none focus:ring-0 px-3 py-2" onClick={() => {
                                                    setAdult(count => {
                                                        if (infant >= adult) {
                                                            setInfant(count - 1)
                                                        }
                                                        return count - 1
                                                    })
                                                }}>
                                                    <MinusIcon className="w-5 h-5" />
                                                </button>
                                                <input type="text" readOnly name="adult" id="adultCount" value={adult} className="w-10 h-auto bg-white border-0 focus:outline-none focus:ring-0 p-0 text-center" onChange={(e) => {
                                                    setAdult(Number(e.target.value) < 1 ? 1 : Number(e.target.value))
                                                }} />
                                                <button disabled={adult >= 10} className="cursor-pointer bg-white hover:bg-gray-50 focus:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed outline-none border-0 ring-0 focus:outline-none focus:ring-0 px-3 py-2" onClick={() => setAdult(count => {
                                                    return count + 1
                                                })}>
                                                    <PlusIcon className="w-5 h-5" />
                                                </button>
                                            </div>

                                        </div>
                                        <div className="flex items-center w-full justify-between">
                                            <h6 className="text-base font-semibold text-gray-800">
                                                Anak<br />
                                                <small className="font-normal text-xs text-gray-500">Usia 2 - 12 tahun</small>
                                            </h6>
                                            <div className="flex items-center justify-end">
                                                <button disabled={child <= 0} className="cursor-pointer bg-white hover:bg-gray-50 focus:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed outline-none border-0 ring-0 focus:outline-none focus:ring-0 px-3 py-2" onClick={() => setChild(count => {
                                                    return count - 1
                                                })}>
                                                    <MinusIcon className="w-5 h-5" />
                                                </button>
                                                <input type="text" readOnly name="adult" id="adultCount" value={child} className="w-10 h-auto bg-white border-0 focus:outline-none focus:ring-0 p-0 text-center" onChange={(e) => {
                                                    setChild(Number(e.target.value) < 1 ? 1 : Number(e.target.value))
                                                }} />
                                                <button disabled={child >= 10} className="cursor-pointer bg-white hover:bg-gray-50 focus:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed outline-none border-0 ring-0 focus:outline-none focus:ring-0 px-3 py-2" onClick={() => setChild(count => {
                                                    return count + 1
                                                })}>
                                                    <PlusIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center w-full justify-between">
                                            <h6 className="text-base font-semibold text-gray-800">
                                                Bayi<br />
                                                <small className="font-normal text-xs text-gray-500">Usia &lt; 2 tahun</small>
                                            </h6>
                                            <div className="flex items-center justify-end">
                                                <button disabled={infant <= 0} className="cursor-pointer bg-white hover:bg-gray-50 focus:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed outline-none border-0 ring-0 focus:outline-none focus:ring-0 px-3 py-2" onClick={() => setInfant(count => {
                                                    return count - 1
                                                })}>
                                                    <MinusIcon className="w-5 h-5" />
                                                </button>
                                                <input type="text" readOnly name="adult" id="adultCount" value={infant} className="w-10 h-auto bg-white border-0 focus:outline-none focus:ring-0 p-0 text-center" onChange={(e) => {
                                                    setInfant(Number(e.target.value) < 1 ? 1 : Number(e.target.value))
                                                }} />
                                                <button disabled={infant >= 10 || infant === adult} className="cursor-pointer bg-white hover:bg-gray-50 focus:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed outline-none border-0 ring-0 focus:outline-none focus:ring-0 px-3 py-2" onClick={() => setInfant(count => {
                                                    return count + 1
                                                })}>
                                                    <PlusIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 p-3">
                                        <h5 className="text-lg font-semibold text-gray-700">Kelas Kabin</h5>
                                        <div className="flex flex-col w-full">
                                            <button onClick={() => setPassengerClass('Ekonomi')} className={`w-full mb-2 px-2 flex items-center justify-start space-x-2 py-1 rounded-md border outline-none focus:outline-none ring-0 focus:ring-0 transition-all duration-200 ${passengerClass === 'Ekonomi' ? "border-rose-600" : " border-gray-300"}`} type="button">
                                                <span className={`w-5 h-5 grid place-items-center rounded-full border-2 mr-2 ${passengerClass === 'Ekonomi' ? "border-rose-600" : " border-gray-300"} bg-white`}>
                                                    <span className={`${passengerClass === 'Ekonomi' ? "bg-rose-600 w-3 h-3" : "w-2 h-2  bg-gray-300"} rounded-full transition-all duration-200`}></span>
                                                </span>
                                                Ekonomi
                                            </button>
                                            <button onClick={() => setPassengerClass('Permium Ekonomi')} className={`w-full mb-2 px-2 flex items-center justify-start space-x-2 py-1 rounded-md border outline-none focus:outline-none ring-0 focus:ring-0 transition-all duration-200 ${passengerClass === 'Permium Ekonomi' ? "border-rose-600" : " border-gray-300"}`} type="button">
                                                <span className={`w-5 h-5 grid place-items-center rounded-full border-2 mr-2 ${passengerClass === 'Permium Ekonomi' ? "border-rose-600" : " border-gray-300"} bg-white`}>
                                                    <span className={`${passengerClass === 'Permium Ekonomi' ? "bg-rose-600 w-3 h-3" : "w-2 h-2  bg-gray-300"} rounded-full transition-all duration-200`}></span>
                                                </span>
                                                Permium Ekonomi
                                            </button>
                                            <button onClick={() => setPassengerClass('Bisnis')} className={`w-full mb-2 px-2 flex items-center justify-start space-x-2 py-1 rounded-md border outline-none focus:outline-none ring-0 focus:ring-0 transition-all duration-200 ${passengerClass === 'Bisnis' ? "border-rose-600" : " border-gray-300"}`} type="button">
                                                <span className={`w-5 h-5 grid place-items-center rounded-full border-2 mr-2 ${passengerClass === 'Bisnis' ? "border-rose-600" : " border-gray-300"} bg-white`}>
                                                    <span className={`${passengerClass === 'Bisnis' ? "bg-rose-600 w-3 h-3" : "w-2 h-2  bg-gray-300"} rounded-full transition-all duration-200`}></span>
                                                </span>
                                                Bisnis
                                            </button>
                                            <button onClick={() => setPassengerClass('First')} className={`w-full mb-2 px-2 flex items-center justify-start space-x-2 py-1 rounded-md border outline-none focus:outline-none ring-0 focus:ring-0 transition-all duration-200 ${passengerClass === 'First' ? "border-rose-600" : " border-gray-300"}`} type="button">
                                                <span className={`w-5 h-5 grid place-items-center rounded-full border-2 mr-2 ${passengerClass === 'First' ? "border-rose-600" : " border-gray-300"} bg-white`}>
                                                    <span className={`${passengerClass === 'First' ? "bg-rose-600 w-3 h-3" : "w-2 h-2  bg-gray-300"} rounded-full transition-all duration-200`}></span>
                                                </span>
                                                First
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
            <div className="w-full flex items-center justify-end py-2 px-2 md:px-5">
                <button disabled={
                    depError
                    || arrError
                    || dDateError
                    || aDateError
                } type="button" className="btn-rose w-full md:w-auto" onClick={(e) => {
                    e.preventDefault()
                    searchFlight()
                }}>
                    <MagnifyingGlassIcon className="w-6 h-6 mr-2" />
                    Cari Penerbangan
                </button>
            </div>
        </div>
    )
}