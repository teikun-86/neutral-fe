import { StationButton } from "@/components/button";
import Combobox from "@/components/combobox";
import useOutsideClick from "@/components/hooks/outsideclick";
import { TrainIcon, TrainRightIcon } from "@/components/icons";
import AppLayout from "@/layouts/app";
import { checkObjectUndefined, objectToQueryString, searchString } from "@/util";
import { Transition } from "@headlessui/react";
import { ArrowsRightLeftIcon, CalendarDaysIcon, ChevronDownIcon, MagnifyingGlassIcon, MinusIcon, PlusIcon, UserGroupIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import debounce from "lodash.debounce";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { toast } from "react-toastify";

const Trains = () => {
    const passengerRef = useRef(null)
    const router = useRouter()

    const [query, setQuery] = useState('')
    const [tripType, setTripType] = useState('one-way')
    const [departure, setDeparture] = useState({})
    const [arrival, setArrival] = useState({})
    const [endpoints, setEndpoints] = useState([])
    const [queriedEndpoints, setQueriedEndpoints] = useState([])
    const [departureDate, setDepartureDate] = useState(new Date(moment().toString()))
    const [returnDate, setReturnDate] = useState(moment().add(1, 'day').toString())

    const [showPassenger, setShowPassenger] = useState(false)
    const [adult, setAdult] = useState(1)
    const [infant, setInfant] = useState(0)

    const queryEndpoints = useCallback((query) => {
        if (query.trim().length < 3) return []
        let results = endpoints.filter(endpoint => {
            return searchString(query, endpoint.code)
                || searchString(query, endpoint.name)
                || searchString(query, endpoint.type === 'STATION' ? endpoint.city.name : endpoint.name)
                || searchString(query, endpoint.type === 'STATION' ? endpoint.city.code : endpoint.name)
        })
        setQueriedEndpoints(results)
    }, [endpoints])

    const handleChange = useCallback((event) => {
        setQuery(event.target.value)
        queryEndpoints(event.target.value)
    }, [queryEndpoints])

    const debounceQueryEndpoints = useMemo(() => {
        return debounce(handleChange, 400)
    }, [handleChange])

    const clickOutsidePassenger = useOutsideClick({
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

    const disabledDays = {
        d: [
            {
                from: new Date(1977, 1, 1),
                to: (new Date()).setDate((new Date()).getDate() - 1)
            }
        ],
        a: [
            {
                from: new Date(1977, 1, 1),
                to: departureDate
            }
        ]
    }

    const searchStations = () => {
        let params = {
            d: departure.code,
            a: arrival.code,
            d_type: departure.type,
            a_type: arrival.type,
            d_date: departureDate.format("YYYY-MM-DD"),
            adult: adult,
            infant: infant,
        };

        if (tripType === 'round') params.r_date = moment(returnDate).format("YYYY-MM-DD")

        if (!checkObjectUndefined(params)) {
            toast.error()
        }

        router.push(`/trains/search?${objectToQueryString(params)}`)
    }

    const getEndpoints = async () => {
        await axios.get('/api/train-endpoints').then(res => {
            let endpoints = res.data.endpoints
            setEndpoints(endpoints)
        }).catch(err => {
            console.log({
                err,
                errLoc: "async getEndpoints()"
            });
        })
    }

    useEffect(() => {
        getEndpoints()
    }, [])

    return (
        <AppLayout title="Kereta Api ー Neutral" fixed={false}>
            <div className="w-full min-h-screen pb-4">
                <div className="w-full bg-rose-600 h-72 py-3 px-2">
                    <h2 className="text-2xl font-bold text-white text-center">Lorem, ipsum.</h2>
                    <p className="text-center text-gray-100 md:max-w-[50%] mx-auto">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime deleniti aliquam ea error culpa autem ipsam magni debitis illo sunt, sapiente officiis corrupti iure atque sequi molestias! Omnis, laborum explicabo?</p>
                </div>
                <div className="w-full max-w-7xl px-4 mx-auto">
                    <div className="w-full rounded-lg bg-white p-3 shadow-lg -mt-10">
                        <h3 className="font-semibold text-xl tracking-wide flex items-center">
                            <TrainIcon className="w-8 h-8 text-rose-600 mr-3" />
                            Cari & Booking Tiket Kereta Api Online
                        </h3>
                        <div className="w-full flex items-center flex-wrap mt-5 py-2 border-t border-gray-300/50">
                            <div className="w-full md:w-1/2 lg:w-1/5 p-2 relative md:border-r border-b md:border-b-0 border-gray-300/70 px-2 md:px-5">
                                <div className="w-full rounded-lg">
                                    <label htmlFor="departureInput" className="text-base font-semibold text-gray-500">Dari</label>
                                    <div className="flex items-center w-full">
                                        <span className="text-rose-600">
                                            <TrainRightIcon className="w-7 h-7" />
                                        </span>
                                        <Combobox value={departure} id="departureCombobox" onChange={setDeparture}>
                                            <Combobox.Input onChange={debounceQueryEndpoints} placeholder="Cari Kota/Stasiun" type="text" id="departureInput" className="select-all w-full px-1 text-base font-semibold text-gray-900 border-0 outline-none focus:outline-none focus:ring-0" displayValue={(d) => d.name ? `${d.name} (${d.type === 'CITY' ? 'ALL' : d.code})` : ""} />
                                            <Combobox.Container afterLeave={() => {
                                                setQuery('')
                                                setQueriedEndpoints([])
                                            }}>
                                                <Combobox.Header>
                                                    <div className="flex items-center justify-between">
                                                        <h5 className="text-base font-semibold text-gray-900">Cari Kota/Stasiun</h5>
                                                        <button className="w-8 h-8 rounded-full grid place-items-center border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 hocus:bg-gray-100" type="button">
                                                            <XMarkIcon className="w-6 h-6" />
                                                        </button>
                                                    </div>
                                                </Combobox.Header>
                                                <Combobox.Options>
                                                    {
                                                        queriedEndpoints.length === 0
                                                            ? (
                                                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                                    {
                                                                        query === '' ? "Cari Kota/Stasiun" : "Tidak ada hasil. Coba cari tujuan lain."
                                                                    }
                                                                </div>
                                                            )
                                                            : (
                                                                queriedEndpoints.map(endpoint => (
                                                                    <Combobox.Option key={endpoint.id} value={endpoint}>
                                                                        {({ selected, active }) => (
                                                                            <StationButton selected={selected} active={active} endpoint={endpoint} />
                                                                        )}
                                                                    </Combobox.Option>
                                                                ))
                                                            )
                                                    }
                                                </Combobox.Options>
                                            </Combobox.Container>
                                        </Combobox>
                                    </div>
                                </div>
                                <button type="button" onClick={switchDA} className="cursor-pointer grid place-items-center w-7 h-7 rounded-full border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 absolute md:-right-4 md:top-1/2 md:-translate-y-1/2 -bottom-4 md:bottom-auto left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 rotate-90 md:rotate-0 outline-none focus:outline-none">
                                    <ArrowsRightLeftIcon className="w-5 h-5 text-rose-600" />
                                </button>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/5 p-2 relative lg:border-r border-b md:border-b-0 border-gray-300/70 px-2 md:px-5">
                                <div className="w-full rounded-lg">
                                    <label htmlFor="arrivalInput" className="text-base font-semibold text-gray-500">Ke</label>
                                    <div className="flex items-center w-full">
                                        <span className="text-rose-600">
                                            <TrainRightIcon className="w-7 h-7 flip-x" />
                                        </span>
                                        <Combobox value={arrival} id="arrivalCombobox" onChange={setArrival}>
                                            <Combobox.Input onChange={debounceQueryEndpoints} placeholder="Cari Kota/Stasiun" type="text" id="arrivalInput" className="select-all w-full px-1 text-base font-semibold text-gray-900 border-0 outline-none focus:outline-none focus:ring-0" displayValue={(d) => d.name ? `${d.name} (${d.type === 'CITY' ? 'ALL' : d.code})` : ""} />
                                            <Combobox.Container afterLeave={() => {
                                                setQuery('')
                                                setQueriedEndpoints([])
                                            }}>
                                                <Combobox.Header>
                                                    <div className="flex items-center justify-between">
                                                        <h5 className="text-base font-semibold text-gray-900">Cari Kota/Stasiun</h5>
                                                        <button className="w-8 h-8 rounded-full grid place-items-center border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 hocus:bg-gray-100" type="button">
                                                            <XMarkIcon className="w-6 h-6" />
                                                        </button>
                                                    </div>
                                                </Combobox.Header>
                                                <Combobox.Options>
                                                    {
                                                        queriedEndpoints.length === 0
                                                            ? (
                                                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                                    {
                                                                        query === '' ? "Cari Kota/Stasiun" : "Tidak ada hasil. Coba cari tujuan lain."
                                                                    }
                                                                </div>
                                                            )
                                                            : (
                                                                queriedEndpoints.map(endpoint => (
                                                                    <Combobox.Option key={endpoint.id} value={endpoint}>
                                                                        {({ selected, active }) => (
                                                                            <StationButton selected={selected} active={active} endpoint={endpoint} />
                                                                        )}
                                                                    </Combobox.Option>
                                                                ))
                                                            )
                                                    }
                                                </Combobox.Options>
                                            </Combobox.Container>
                                        </Combobox>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/5 p-2 relative mt-2 lg:mt-0 md:border-r border-b md:border-b-0 border-gray-300/70 px-2 md:px-5">
                                <div className="w-full rounded-lg">
                                    <label htmlFor="arrivalDateInput" className="text-base font-semibold text-gray-500 mb-3 block">Berangkat</label>
                                    <div className="flex items-center w-full">
                                        <span className="text-rose-600">
                                            <CalendarDaysIcon className="w-7 h-7" />
                                        </span>
                                        <Datepicker
                                            asSingle
                                            useRange={false}
                                            primaryColor="rose"
                                            onChange={(val) => {
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
                                            inputClassName="select-all w-full px-1 text-base font-semibold text-gray-900 border-0 cursor-pointer outline-none focus:outline-none focus:ring-0 disabled:opacity-50"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/5 p-2 relative border-b md:border-b-0 border-gray-300/70 px-2 md:px-5">
                                <div className="w-full rounded-lg">
                                    <label htmlFor="roundTripCheckBox" className="text-base mb-3 font-semibold text-gray-500 flex items-center select-none">
                                        <input id="roundTripCheckBox" type="checkbox" checked={tripType === 'round'} onChange={(e) => setTripType(e.target.checked ? 'round' : 'one-way')} className="form-checkbox text-rose-600 rounded focus:ring-rose-600 transition-all duration-200 mr-2" />
                                        Pulang
                                    </label>
                                    <div className="flex items-center w-full">
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
                                            }}
                                            displayFormat="ddd, D MMM YYYY"
                                            value={{ startDate: returnDate, endDate: returnDate }}
                                            inputClassName="select-all w-full px-1 text-base font-semibold text-gray-900 border-0 cursor-pointer outline-none focus:outline-none focus:ring-0 disabled:opacity-50"
                                            disabled={tripType !== 'round'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/5 p-2 relative px-2 md:px-5">
                                <h6 htmlFor="passengerInfo" className="text-base font-semibold text-gray-500 mb-3 block">Penumpang</h6>
                                <div className="w-full relative block z-10">
                                    <button className="select-none w-full text-base font-semibold text-gray-900 border-0 outline-none focus:outline-none focus:ring-0 flex items-center justify-between" onClick={() => setShowPassenger((show) => !show)}>
                                        <div className="flex items-center">
                                            <UserGroupIcon className="w-7 h-7 text-rose-600 mr-1" />
                                            {adult} Dewasa {infant > 0 ? `, ${infant} Bayi` : ""}
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
                                        <div className="absolute top-4 w-full lg:w-72 lg:right-0 bg-white shadow p-3 rounded-lg z-50">
                                            <div className="w-full flex flex-wrap">
                                                <div className="w-full p-3">
                                                    <h5 className="text-lg font-semibold text-gray-700 mb-2">Penumpang</h5>
                                                    <div className="flex items-center w-full justify-between">
                                                        <h6 className="text-base font-semibold text-gray-800">
                                                            Dewasa<br />
                                                            <small className="font-normal text-xs text-gray-500">Usia &gt; 3 tahun</small>
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
                                                            Bayi<br />
                                                            <small className="font-normal text-xs text-gray-500">Usia &lt; 3 tahun</small>
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
                                            </div>
                                        </div>
                                    </Transition>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-end py-2 px-2 md:px-5">
                            <button type="button" className="btn-rose w-full md:w-auto" onClick={(e) => {
                                e.preventDefault()
                                searchStations()
                            }}>
                                <MagnifyingGlassIcon className="w-6 h-6 mr-2" />
                                Cari Kereta Api
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Trains;