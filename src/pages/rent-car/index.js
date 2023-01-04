import { CarLocationButton, StationButton } from "@/components/button";
import Combobox from "@/components/combobox";
import useOutsideClick from "@/components/hooks/outsideclick";
import { CarIcon, TrainIcon, TrainRightIcon } from "@/components/icons";
import { RoseTooltip } from "@/components/tooltip";
import AppLayout from "@/layouts/app";
import { checkObjectUndefined, objectToQueryString, searchString } from "@/util";
import { Transition } from "@headlessui/react";
import { ArrowsRightLeftIcon, CalendarDaysIcon, ChevronDownIcon, MagnifyingGlassIcon, MapPinIcon, MinusIcon, PlusIcon, UserGroupIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import debounce from "lodash.debounce";
import moment from "@/libs/moment";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { toast } from "react-toastify";

const CarRent = () => {
    const carAmountRef = useRef(null)
    const router = useRouter()

    const [query, setQuery] = useState('')
    const [location, setLocation] = useState({})
    const [locations, setLocations] = useState([])
    const [queriedLocations, setQueriedLocations] = useState([])
    const [startDate, setStartDate] = useState(new Date(moment().toString()))
    const [endDate, setEndDate] = useState(moment().add(1, 'day').toString())

    const [noDriver, setNoDriver] = useState(false)

    const [showCarAmount, setShowCarAmount] = useState(false)
    const [amount, setAmount] = useState(1)

    const [locError, setLocError] = useState(false)
    const [sDateError, setSDateError] = useState(false)
    const [eDateError, setEDateError] = useState(false)

    const queryLocations = useCallback((query) => {
        let results = locations.filter(location => {
            return searchString(query, location.cityName)
                || searchString(query, location.regionalName)
                || searchString(query, location.provinceName)
        }).sort((a, b) => {
            let rNameA = a.regionalName
            let rNameB = b.regionalName
            return rNameA.localeCompare(rNameB)
        })
        setQueriedLocations(results)
    }, [locations])

    const handleChange = useCallback((event) => {
        setQuery(event.target.value)
        queryLocations(event.target.value)
    }, [queryLocations])

    const debounceQueryLocations = useMemo(() => {
        return debounce(handleChange, 400)
    }, [handleChange])

    const clickOutsideCarAmount = useOutsideClick({
        ref: carAmountRef, callback: () => {
            setShowCarAmount(false)
        }
    })

    const searchCars = () => {

        let check = checkState()

        if (!check) return;
        
        let params = {
            region_id: location.id,
            start_date: moment(startDate).format("YYYY-MM-DD"),
            end_date: moment(endDate).format("YYYY-MM-DD"),
            qty: amount,
        };

        router.push(`/rent-car/search?${objectToQueryString(params)}`)
    }

    const getLocations = async () => {
        await axios.get('/api/car-locations').then(res => {
            let locations = res.data.locations
            setLocations(locations)
        }).catch(err => {
            console.log({
                err,
                errLoc: "async getLocations()"
            });
        })
    }

    const checkState = useCallback(() => {
        let loc = !location.id
        let sdate = moment(startDate).isBefore(moment().format('YYYY-MM-DD')) || startDate === null
        let edate = (moment(endDate).isBefore(startDate) || endDate === null)
        setLocError(loc)
        setSDateError(sdate)
        setEDateError(edate)

        return !loc && !sdate && !edate;
    }, [location, startDate, endDate])

    useEffect(() => {
        getLocations()
    }, [])

    return (
        <AppLayout title={`Sewa Mobil, Rental Mobil ー ${process.env.NEXT_PUBLIC_APP_NAME}`} fixed={false}>
            <div className="w-full min-h-screen pb-4">
                <div className="w-full bg-rose-600 h-72 py-3 px-2">
                    <h2 className="text-2xl font-bold text-white text-center">Lorem, ipsum.</h2>
                    <p className="text-center text-gray-100 md:max-w-[50%] mx-auto">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime deleniti aliquam ea error culpa autem ipsam magni debitis illo sunt, sapiente officiis corrupti iure atque sequi molestias! Omnis, laborum explicabo?</p>
                </div>
                <div className="w-full max-w-7xl px-4 mx-auto">
                    <div className="w-full rounded-lg bg-white p-3 shadow-lg -mt-10">
                        <h3 className="font-semibold text-xl tracking-wide flex items-center">
                            <CarIcon className="w-8 h-8 text-rose-600 mr-3" />
                            Cari Rental Mobil
                        </h3>
                        <div className="w-full flex items-center flex-wrap mt-5 py-2 border-t border-gray-300/50">
                            <div className="w-full lg:w-1/4 p-2 relative border-b lg:border-b-0 border-gray-300/70 px-2 md:px-5">
                                <div className="w-full rounded-lg">
                                    <label htmlFor="locationInput" className="text-base font-semibold text-gray-500">Lokasi Sewa</label>
                                    <div className="flex items-center w-full relative">
                                        <span className="text-rose-600">
                                            <MapPinIcon className="w-7 h-7" />
                                        </span>
                                        <Combobox value={location} id="locationComboBox" onChange={(value) => {
                                            setLocError(value.id ? false : true)
                                            setLocation(value)
                                        }}>
                                            <Combobox.Input onChange={debounceQueryLocations} placeholder="Mau sewa di mana?" type="text" id="locationInput" className="select-all w-full px-1 text-base font-semibold text-gray-900 border-0 outline-none focus:outline-none focus:ring-0" displayValue={(d) => d.regionalName } />
                                            <Combobox.Container className="!left-0" afterLeave={() => {
                                                setQuery('')
                                                setQueriedLocations([])
                                            }}>
                                                <Combobox.Header>
                                                    <div className="flex items-center justify-between">
                                                        <h5 className="text-base font-semibold text-gray-900">Pilih Kota</h5>
                                                        <button className="w-8 h-8 rounded-full grid place-items-center border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 hocus:bg-gray-100" type="button">
                                                            <XMarkIcon className="w-6 h-6" />
                                                        </button>
                                                    </div>
                                                </Combobox.Header>
                                                <Combobox.Options>
                                                    {
                                                        queriedLocations.length === 0
                                                            ? (
                                                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                                    {
                                                                        query === '' ? "Pilih Kota" : "Tidak ada hasil. Coba cari tempat lain."
                                                                    }
                                                                </div>
                                                            )
                                                            : (
                                                                queriedLocations.map(location => (
                                                                    <Combobox.Option key={location.id} value={location}>
                                                                        {({ selected, active }) => (
                                                                            <CarLocationButton selected={selected} active={active} location={location} />
                                                                        )}
                                                                    </Combobox.Option>
                                                                ))
                                                            )
                                                    }
                                                </Combobox.Options>
                                            </Combobox.Container>
                                        </Combobox>
                                        {
                                            locError && query.length <= 0 && (
                                                <RoseTooltip>Lokasi sewa belum dipilih.</RoseTooltip>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/4 p-2 relative mt-2 lg:mt-0 md:border-r border-b md:border-b-0 border-gray-300/70 px-2 md:px-5">
                                <div className="w-full rounded-lg">
                                    <label htmlFor="startDate" className="text-base font-semibold text-gray-500 mb-3 block">Tanggal Mulai</label>
                                    <div className="flex items-center w-full relative">
                                        <span className="text-rose-600">
                                            <CalendarDaysIcon className="w-7 h-7" />
                                        </span>
                                        <Datepicker
                                            asSingle
                                            useRange={false}
                                            primaryColor="rose"
                                            onChange={(val) => {
                                                if (moment(val.startDate).isBefore(moment())) {
                                                    setStartDate(new Date())
                                                    return
                                                }
                                                setStartDate(val.startDate)
                                                if (moment(endDate).isSameOrBefore(moment(val.startDate))) {
                                                    setEndDate(moment(val.startDate).add(1, 'days').format('YYYY-MM-DD'))
                                                }
                                                setSDateError(false)
                                            }}
                                            displayFormat="ddd, D MMM YYYY"
                                            value={{ startDate: startDate, endDate: startDate }}
                                            inputClassName="select-all w-full px-1 text-base font-semibold text-gray-900 border-0 cursor-pointer outline-none focus:outline-none focus:ring-0 disabled:opacity-50 z-40"
                                            containerClassName="z-50"
                                        />
                                        {
                                            sDateError && (
                                                <RoseTooltip>
                                                    {
                                                        startDate.length <= 0 
                                                        ? "Tanggal mulai sewa belum dipilih."
                                                        : `Tanggal mulai harus sama dengan atau setelah ${moment().format("ddd DD MMM YYYY")}`
                                                    }
                                                </RoseTooltip>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/4 p-2 relative border-b md:border-b-0 border-gray-300/70 px-2 md:px-5">
                                <div className="w-full rounded-lg">
                                    <label htmlFor="endDateInput" className="text-base mb-3 font-semibold text-gray-500 flex items-center select-none">
                                        Tanggal Selesai
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
                                                if (moment(val.startDate).isSameOrBefore(moment(startDate))) {
                                                    setEndDate(moment(startDate).add(1, 'days').format('YYYY-MM-DD'))
                                                    return
                                                }
                                                setEndDate(val.startDate)
                                                setEDateError(false)
                                            }}
                                            displayFormat="ddd, D MMM YYYY"
                                            value={{ startDate: endDate, endDate: endDate }}
                                            inputClassName="select-all w-full px-1 text-base font-semibold text-gray-900 border-0 cursor-pointer outline-none focus:outline-none focus:ring-0 disabled:opacity-50 z-40"
                                            containerClassName="z-30"
                                        />
                                        {
                                            eDateError && (
                                                <RoseTooltip>
                                                    {
                                                        endDate.length <= 0
                                                            ? "Tanggal selesai sewa belum dipilih."
                                                            : `Tanggal selesai setelah ${moment(startDate).format("ddd DD MMM YYYY")}`
                                                    }
                                                </RoseTooltip>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/4 p-2 relative px-2 md:px-5 border-t lg:border-t-0 border-gray-300/70 mt-3 lg:mt-0">
                                <h6 htmlFor="passengerInfo" className="text-base font-semibold text-gray-500 mb-3 block">Jumlah Mobil</h6>
                                <div className="w-full relative block z-10">
                                    <button className="select-none w-full text-base font-semibold text-gray-900 border-0 outline-none focus:outline-none focus:ring-0 flex items-center justify-between" onClick={() => setShowCarAmount((show) => !show)}>
                                        <div className="flex items-center">
                                            <CarIcon className="w-7 h-7 text-rose-600 mr-1" />
                                            {amount} Mobil
                                        </div>
                                        <ChevronDownIcon className={`w-6 h-6 ${showCarAmount ? "rotate-180" : ""} transition-all duration-200`} />
                                    </button>
                                    <Transition
                                        show={showCarAmount}
                                        enter="transition-all duration-200"
                                        enterFrom="-translate-y-4 opacity-0 scale-95"
                                        enterTo="translate-y-0 opacity-100 scale-100"
                                        leave="transition-all duration-200"
                                        leaveFrom="translate-y-0 opacity-100 scale-100"
                                        leaveTo="translate-y-4 opacity-0 scale-95"
                                        ref={carAmountRef}
                                    >
                                        <div className="absolute top-4 w-full lg:w-72 lg:right-0 bg-white shadow p-3 rounded-lg z-30">
                                            <div className="w-full flex flex-wrap">
                                                <div className="w-full p-3">
                                                    <h5 className="text-lg font-semibold text-gray-700 mb-2">Jumlah Mobil</h5>
                                                    <div className="flex items-center justify-start w-full">
                                                        <button disabled={amount <= 1} className="cursor-pointer bg-white hover:bg-gray-50 focus:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed outline-none border-0 ring-0 focus:outline-none focus:ring-0 px-3 py-2" onClick={() => {
                                                            setAmount(count => {
                                                                return count - 1
                                                            })
                                                        }}>
                                                            <MinusIcon className="w-5 h-5" />
                                                        </button>
                                                        <input type="text" readOnly name="amount" id="carCount" value={amount} className="w-10 h-auto bg-white border-0 focus:outline-none focus:ring-0 p-0 text-center" onChange={(e) => {
                                                            setAmount(Number(e.target.value) < 1 ? 1 : Number(e.target.value))
                                                        }} />
                                                        <button disabled={amount >= 4} className="cursor-pointer bg-white hover:bg-gray-50 focus:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed outline-none border-0 ring-0 focus:outline-none focus:ring-0 px-3 py-2" onClick={() => setAmount(count => {
                                                            return count + 1
                                                        })}>
                                                            <PlusIcon className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Transition>
                                </div>
                            </div>
                            <div className="w-full p-2 md:px-5 mt-4 border-t border-gray-300/70">
                                <label htmlFor="noDriverCheckbox" className="text-base mb-3 font-semibold text-gray-500 flex items-center select-none cursor-pointer">
                                    <input id="noDriverCheckbox" type="checkbox" checked={noDriver} onChange={(e) => setNoDriver(e.target.checked)} className="form-checkbox text-rose-600 rounded focus:ring-rose-600 transition-all duration-200 mr-2 w-5 h-5" />
                                    Sewa Mobil Tanpa Supir
                                </label>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-end py-2 px-2 md:px-5">
                            <button type="button" className="btn-rose w-full md:w-auto" onClick={(e) => {
                                e.preventDefault()
                                searchCars()
                            }}>
                                <MagnifyingGlassIcon className="w-6 h-6 mr-2" />
                                Cari Mobil
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default CarRent;