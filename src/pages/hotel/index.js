import { DestinationButton } from "@/components/button";
import Combobox from "@/components/combobox";
import useOutsideClick from "@/components/hooks/outsideclick";
import { RoseTooltip } from "@/components/tooltip";
import AppLayout from "@/layouts/app";
import { objectToQueryString, searchString } from "@/util";
import { Transition } from "@headlessui/react";
import { BuildingOffice2Icon, CalendarDaysIcon, ChevronDownIcon, MagnifyingGlassIcon, MapPinIcon, MinusIcon, PlusIcon, UserGroupIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import debounce from "lodash.debounce";
import moment from "@/libs/moment";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const Hotel = () => {
    const guestRef = useRef(null)
    const router = useRouter()

    const [query, setQuery] = useState('')
    const [destinations, setDestinations] = useState({})
    const [destination, setDestination] = useState({})
    const [queriedDestinations, setQueriedDestinations] = useState([])
    const [checkInDate, setCheckInDate] = useState(new Date(moment().toString()))
    const [checkOutDate, setCheckOutDate] = useState(new Date(moment().add(1, 'days').toString()))
    const [showGuest, setShowGuest] = useState(false)
    const [adult, setAdult] = useState(1)
    const [child, setChild] = useState(0)
    const [rooms, setRooms] = useState(1)

    const [destError, setDestError] = useState(false)
    const [cinDateError, setCinDateError] = useState(false)
    const [coutDateError, setCoutDateError] = useState(false)

    const queryDestinations = useCallback((query) => {
        if (query.trim().length < 0) return []
        let results = destinations.filter(dest => {
            return searchString(query, dest.name)
                || searchString(query, dest.location)
                || searchString(query, dest.country.name)
                || searchString(query, dest.region !== null ? dest.region.name : dest.name)
        })
        setQueriedDestinations(results)
    }, [destinations])

    const handleChange = useCallback((event) => {
        setQuery(event.target.value)
        queryDestinations(event.target.value)
    }, [queryDestinations])

    const debounceQueryAirports = useMemo(() => {
        return debounce(handleChange, 400)
    }, [handleChange])

    const clickOutsidePassenger = useOutsideClick({
        ref: guestRef, callback: () => {
            setShowGuest(false)
        }
    })
    
    const searchHotel = () => {
        if (!checkQuery()) return
        
        let params = {
            dest: destination.name,
            d_type: destination.type,
            d_id: destination.publicId,
            adult,
            child,
            rooms,
            check_in: moment(checkInDate).format("YYYY-MM-DD"),
            check_out: moment(checkOutDate).format("YYYY-MM-DD"),
        }

        router.push(`/hotel/search?${objectToQueryString(params)}`)
    }

    const getDestinations = async () => {
        await axios.get('/api/destinations').then(res => {
            setDestinations(res.data.destinations)
        })
    }

    const checkQuery = useCallback(() => {
        let des = !destination.name
        let cin = moment(checkInDate).isBefore(moment().format('YYYY-MM-DD')) || checkInDate === null
        let cout = moment(checkOutDate).isBefore(checkInDate) || checkOutDate === null

        setDestError(des)
        setCinDateError(cin)
        setCoutDateError(cout)

        return !des && !cin && !cout
    }, [checkInDate, checkOutDate, destination])

    useEffect(() => {
        getDestinations()
    }, [])

    return (
        <AppLayout title={`Hotel ー ${process.env.NEXT_PUBLIC_APP_NAME}`} fixed={false}>
            <div className="w-full min-h-screen pb-4">
                <div className="w-full bg-rose-600 h-72 py-3 px-2">
                    <h2 className="text-2xl font-bold text-white text-center">Lorem, ipsum.</h2>
                    <p className="text-center text-gray-100 md:max-w-[50%] mx-auto">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime deleniti aliquam ea error culpa autem ipsam magni debitis illo sunt, sapiente officiis corrupti iure atque sequi molestias! Omnis, laborum explicabo?</p>
                </div>
                <div className="w-full max-w-7xl px-4 mx-auto">
                    <div className="w-full bg-white rounded-lg p-3 shadow-lg -mt-10">
                        <h3 className="font-semibold text-xl tracking-wide flex items-center">
                            <BuildingOffice2Icon className="w-8 h-8 text-rose-600 mr-3" />
                            Cari & Booking Hotel Murah
                        </h3>
                        <div className="w-full flex items-center flex-wrap my-2 mt-5 py-2 border-t border-gray-300/50">
                            <div className="w-full lg:w-1/4 p-2 relative lg:border-r border-b lg:border-b-0 border-gray-300/70 px-2 md:px-5 md:mb-2 lg:mb-0">
                                <div className="w-full rounded-lg">
                                    <label htmlFor="destinationInput" className="text-base font-semibold text-gray-500">Tujuan</label>
                                    <div className="flex items-center w-full relative">
                                        <span className="text-rose-600">
                                            <MapPinIcon className="w-6 h-6" />
                                        </span>
                                        <Combobox value={destination} id="destinationCombobox" className onChange={(value) => {
                                            setDestError(false)
                                            setDestination(value)
                                        }}>
                                            <Combobox.Input onChange={debounceQueryAirports} placeholder="Nginep di mana nih?" type="text" id="destinationInput" className="select-all w-full px-1 text-base font-semibold text-gray-900 border-0 outline-none focus:outline-none focus:ring-0 cursor-pointer" displayValue={(d) => d.name} />
                                            <Combobox.Container className="z-30 left-0" afterLeave={() => {
                                                setQuery('')
                                                setQueriedDestinations([])
                                            }}>
                                                <Combobox.Header>
                                                    <div className="flex items-center justify-between">
                                                        <h5 className="text-base font-semibold text-gray-900">Cari Kota Tujuan</h5>
                                                        <button className="w-8 h-8 rounded-full grid place-items-center border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 hocus:bg-gray-100" type="button">
                                                            <XMarkIcon className="w-6 h-6" />
                                                        </button>
                                                    </div>
                                                </Combobox.Header>
                                                <Combobox.Options>
                                                    {
                                                        queriedDestinations.length === 0
                                                            ? (
                                                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                                    {
                                                                        query.trim().length <= 0 ? "Ketik untuk mulai mencari tujuan" : "Tidak ada hasil. Coba cari tujuan lain." 
                                                                    }
                                                                </div>
                                                            )
                                                            : (
                                                                queriedDestinations.map(destination => (
                                                                    <Combobox.Option key={destination.publicId} value={destination}>
                                                                        {({ selected, active }) => (
                                                                            <DestinationButton selected={selected} active={active} destination={destination} />
                                                                        )}
                                                                    </Combobox.Option>
                                                                ))
                                                            )
                                                    }
                                                </Combobox.Options>
                                            </Combobox.Container>
                                        </Combobox>
                                        {
                                            destError && query === '' && (
                                                <RoseTooltip>Isi kota tujuan</RoseTooltip>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/4 p-2 relative border-b lg:border-b-0 border-gray-300/70 px-2 md:px-5 lg:border-r">
                                <div className="w-full rounded-lg">
                                    <label htmlFor="checkInDateInput" className="text-base font-semibold text-gray-500 mb-3 block">Check-In</label>
                                    <div className="flex items-center w-full relative">
                                        <span className="text-rose-600">
                                            <CalendarDaysIcon className="w-7 h-7" />
                                        </span>
                                        <Datepicker
                                            asSingle
                                            useRange={false}
                                            primaryColor="rose"
                                            onChange={(val) => {
                                                setCinDateError(false)
                                                if (moment(val.startDate).isBefore(moment())) {
                                                    setCheckInDate(new Date())
                                                    return
                                                }
                                                setCheckInDate(val.startDate)
                                                if (moment(checkOutDate).isSameOrBefore(moment(val.startDate))) {
                                                    setCheckOutDate(moment(val.startDate).add(1, 'days').format('YYYY-MM-DD'))
                                                }
                                            }}
                                            displayFormat="ddd, D MMM YYYY"
                                            value={{ startDate: checkInDate, endDate: checkInDate }}
                                            inputClassName="select-all w-full px-1 text-base font-semibold text-gray-900 border-0 cursor-pointer outline-none focus:outline-none focus:ring-0 disabled:opacity-50 z-40"
                                            containerClassName="z-40"
                                        />
                                        {
                                            cinDateError && (
                                                <RoseTooltip>Tanggal check-in harus sama dengan atau setelah {moment().format('ddd, D MMM YYYY')}</RoseTooltip>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/4 p-2 relative border-b lg:border-b-0 border-gray-300/70 px-2 md:px-5 lg:border-r">
                                <div className="w-full rounded-lg">
                                    <label htmlFor="checkOutDateInput" className="text-base mb-3 font-semibold text-gray-500 block">Check-Out</label>
                                    <div className="flex items-center w-full relative">
                                        <span className="text-rose-600">
                                            <CalendarDaysIcon className="w-7 h-7" />
                                        </span>
                                        <Datepicker
                                            asSingle
                                            useRange={false}
                                            primaryColor="rose"
                                            onChange={(val) => {
                                                setCoutDateError(false)
                                                if (moment(val.startDate).isSameOrBefore(moment(checkInDate))) {
                                                    setCheckOutDate(moment(checkInDate).add(1, 'days').format('YYYY-MM-DD'))
                                                    return
                                                }
                                                setCheckOutDate(val.startDate)
                                            }}
                                            displayFormat="ddd, D MMM YYYY"
                                            value={{ startDate: checkOutDate, endDate: checkOutDate }}
                                            inputClassName="select-all w-full px-1 text-base font-semibold text-gray-900 border-0 cursor-pointer outline-none focus:outline-none focus:ring-0 disabled:opacity-50 z-40"
                                            containerClassName="z-50"
                                        />
                                        {
                                            coutDateError && (
                                                <RoseTooltip>
                                                    Tanggal check-out harus setelah {checkInDate !== null ? moment(checkInDate).format('ddd, D MMM YYYY') : "Tanggal check-in"}
                                                </RoseTooltip>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/4 p-2 relative px-2 md:px-5">
                                <h6 htmlFor="passengerInfo" className="text-base font-semibold text-gray-500 mb-3 block">Kamar & Tamu</h6>
                                <div className="w-full relative block z-10">
                                    <button className="select-none w-full text-base font-semibold text-gray-900 border-0 outline-none focus:outline-none focus:ring-0 flex items-center justify-between" onClick={() => setShowGuest((show) => !show)}>
                                        <div className="flex items-center">
                                            <UserGroupIcon className="w-7 h-7 text-rose-600 mr-1" />
                                            {rooms} Kamar, {child > 0 ? `${adult} Dewasa, ${child} Anak` : `${adult} Tamu`}
                                        </div>
                                        <ChevronDownIcon className={`w-6 h-6 ${showGuest ? "rotate-180" : ""} transition-all duration-200`} />
                                    </button>
                                    <Transition
                                        show={showGuest}
                                        enter="transition-all duration-200"
                                        enterFrom="-translate-y-4 opacity-0 scale-95"
                                        enterTo="translate-y-0 opacity-100 scale-100"
                                        leave="transition-all duration-200"
                                        leaveFrom="translate-y-0 opacity-100 scale-100"
                                        leaveTo="translate-y-4 opacity-0 scale-95"
                                        ref={guestRef}
                                    >
                                        <div className="absolute top-4 w-full bg-white shadow p-3 rounded-lg z-50">
                                            <div className="w-full flex flex-wrap">
                                                <div className="w-full p-3">
                                                    <div className="flex items-center w-full justify-between py-1 mb-2">
                                                        <h6 className="text-base font-semibold text-gray-800">
                                                            Kamar<br />
                                                        </h6>
                                                        <div className="flex items-center justify-end">
                                                            <button disabled={rooms <= 1} className="cursor-pointer bg-white hover:bg-gray-50 focus:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed outline-none border-0 ring-0 focus:outline-none focus:ring-0 px-3 py-2" onClick={() => setRooms(count => {
                                                                return count - 1
                                                            })}>
                                                                <MinusIcon className="w-5 h-5" />
                                                            </button>
                                                            <input type="text" readOnly name="adult" id="adultCount" value={rooms} className="w-10 h-auto bg-white border-0 focus:outline-none focus:ring-0 p-0 text-center" onChange={(e) => {
                                                                setRooms(Number(e.target.value) < 1 ? 1 : Number(e.target.value))
                                                            }} />
                                                            <button disabled={rooms >= 8} className="cursor-pointer bg-white hover:bg-gray-50 focus:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed outline-none border-0 ring-0 focus:outline-none focus:ring-0 px-3 py-2" onClick={() => setRooms(count => {
                                                                if (count + 1 > adult) {
                                                                    setAdult(a => count + 1)
                                                                }
                                                                return count + 1
                                                            })}>
                                                                <PlusIcon className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center w-full justify-between py-1 mb-2 border-t border-gray-300/50">
                                                        <h6 className="text-base font-semibold text-gray-800">
                                                            Tamu
                                                        </h6>
                                                        <div className="flex items-center justify-end">
                                                            <button disabled={adult <= 1} className="cursor-pointer bg-white hover:bg-gray-50 focus:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed outline-none border-0 ring-0 focus:outline-none focus:ring-0 px-3 py-2" onClick={() => {
                                                                setAdult(count => {
                                                                    if (rooms >= adult) {
                                                                        setRooms(count - 1)
                                                                    }
                                                                    return count - 1
                                                                })
                                                            }}>
                                                                <MinusIcon className="w-5 h-5" />
                                                            </button>
                                                            <input type="text" readOnly name="adult" id="adultCount" value={adult} className="w-10 h-auto bg-white border-0 focus:outline-none focus:ring-0 p-0 text-center" onChange={(e) => {
                                                                setAdult(Number(e.target.value) < 1 ? 1 : Number(e.target.value))
                                                            }} />
                                                            <button disabled={adult >= 32} className="cursor-pointer bg-white hover:bg-gray-50 focus:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed outline-none border-0 ring-0 focus:outline-none focus:ring-0 px-3 py-2" onClick={() => setAdult(count => {
                                                                return count + 1
                                                            })}>
                                                                <PlusIcon className="w-5 h-5" />
                                                            </button>
                                                        </div>

                                                    </div>
                                                    <div className="flex items-center w-full justify-between py-1 border-t border-gray-300/50">
                                                        <h6 className="text-base font-semibold text-gray-800">
                                                            Anak<br />
                                                            <small className="font-normal text-xs text-gray-500">Usia &lt; 17 tahun</small>
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
                                searchHotel()
                            }}>
                                <MagnifyingGlassIcon className="w-6 h-6 mr-2" />
                                Cari Hotel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Hotel;