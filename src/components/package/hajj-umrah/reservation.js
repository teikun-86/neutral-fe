import { Input } from "@/components/forms"
import { SpinnerIcon } from "@/components/icons"
import { Tab } from "@/components/tab"
import { useCountdown } from "@/hooks/countdown"
import { useLocale } from "@/hooks/locale"
import modalState from "@/hooks/modal"
import { axios } from "@/libs/axios"
import { basename, formatIDR, searchString } from "@/util"
import { Transition } from "@headlessui/react"
import { ArrowsRightLeftIcon, ArrowTopRightOnSquareIcon, ChevronDownIcon, CloudArrowDownIcon } from "@heroicons/react/24/outline"
import moment from "moment"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"

export const PackageReservation = ({
    res,
    setParentReservation,
}) => {
    const { __ } = useLocale()

    const [loading, setLoading] = useState(false)
    const [modalOpen, setModalOpen] = useRecoilState(modalState)

    const reload = async () => {
        setLoading(true)
        await axios.get(`/hajj-umrah/packages/reservations/?id=${res.id}`).then(res => {
            setLoading(false)
            setReservation(res.data.reservation)
        })
    }

    const [reservation, setReservation] = useState(res)
    const { timeLeft, isExpired, stop } = useCountdown(new Date(reservation?.expired_at), {
        onExpired: reload
    })
    const [show, setShow] = useState(false)
    const [showTimer, setShowTimer] = useState(true)

    const [query, setQuery] = useState('')

    const payments = reservation.payments

    const queriedPassengers = reservation.manifest === null ? [] : reservation.manifest.passengers.filter((passenger) => {
        if (query.trim().length === 0) return true;

        return searchString(query, passenger.name)
            || searchString(query, passenger.passport_number)
            || searchString(query, passenger.visa_number)
            || searchString(query, moment(passenger.date_of_birth).format('DD MMMM YYYY'))
            || searchString(query, __(passenger.gender))

    })

    useEffect(() => {
        if (reservation.amount_paid > 0) {
            setShowTimer(false)
            stop()
        }
    }, [reservation, stop])

    return (
        <div className={`w-full rounded-lg shadow bg-white dark:bg-gray-900 my-3 ${isExpired && reservation.amount_paid === 0 ? "opacity-50 !cursor-not-allowed select-none" : ""} relative overflow-hidden`}>
            <div className="p-3">
                <div className="w-full flex items-end justify-between">
                    <div className="w-full">
                        <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                            PKG-{moment(reservation.package.created_at).format('YYYYMMDD')}{reservation.package.id}
                        </h5>
                        <h6 className="text-sm font-semibold text-gray-800 dark:text-gray-100 flex items-center space-x-2">
                            {reservation.package.hotel.location_1}
                            <ArrowsRightLeftIcon className="w-4 h-4 mx-1" />
                            {reservation.package.hotel.location_2}
                        </h6>
                        <h6 className="text-sm font-semibold text-gray-800 dark:text-gray-100 flex items-center space-x-2">
                            {reservation.package.flight.departure_airport.iata}
                            <ArrowsRightLeftIcon className="w-4 h-4 mx-1" />
                            {reservation.package.flight.arrival_airport.iata}
                        </h6>
                        <h6 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                            {moment(reservation.package.hotel.first_check_in_at).format('DD MMMM YYYY')} - {moment(reservation.package.hotel.last_check_out_at).format('DD MMMM YYYY')}
                        </h6>
                        <h6 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                            Departure At: {moment(reservation.package.flight.depart_at).format('DD MMMM YYYY HH:mm')}
                        </h6>
                        <h6 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                            Return At: {moment(reservation.package.flight.return_depart_at).format('DD MMMM YYYY HH:mm')}
                        </h6>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">({reservation.amount} {__('packages')}) &middot; {reservation.package.hotel.program_type} days Program</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            {__('reserved_at', {
                                date: moment(reservation.created_at).format('DD MMMM YYYY HH:mm'),
                            })}
                        </p>
                        <h6 className="text-gray-800 dark:text-gray-100 text-base font-semibold">{__('flight.reservation.info')}</h6>
                        <div className="mb-2">
                            <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                                Room Detail:<br />
                                {reservation.package.hotel.room_detail.quad} Quad Rooms<br />
                                {reservation.package.hotel.room_detail.triple} Triple Rooms<br />
                                {reservation.package.hotel.room_detail.double} Double Rooms<br />
                            </p>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Price per package: {formatIDR(reservation.price_per_package)}</p>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Packages Reserved: {reservation.amount}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex flex-col items-end justify-end">
                            <span className="text-xs text-gray-500 dark:text-gray-400">{__('total_price')}</span>
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                {formatIDR(reservation.total_price)}
                            </span>
                        </div>
                    </div>
                </div>

                {
                    reservation.amount_paid === 0 && (
                        <>
                            {
                                !isExpired && (showTimer) && (
                                    <div className="flex items-center justify-end text-rose-600 font-medium text-xs">
                                        {__('expired_in')}&nbsp;
                                        {timeLeft.days > 0 && (`${timeLeft.days} ${__('days')} `)}
                                        {timeLeft.hours > 0 && (`${timeLeft.hours} ${__('hours')} `)}
                                        {timeLeft.minutes > 0 && (`${timeLeft.minutes} ${__('minutes')} `)}
                                        {timeLeft.seconds > 0 && (`${timeLeft.seconds} ${__('seconds')} `)}
                                    </div>
                                )
                            }
                            {
                                isExpired && (
                                    <div className="flex items-center justify-end"><span className="bg-rose-600 text-white text-xs rounded-lg p-1">Expired</span></div>
                                )
                            }
                        </>
                    )
                }

                {
                    !reservation.is_expired && (
                        <>
                            <button onClick={() => setShow(!show)} disabled={isExpired && reservation.amount_paid === 0} className="btn-light dark:btn-dark !rounded-full !py-1 !px-2 absolute top-2 right-2 z-20">
                                Detail
                                <ChevronDownIcon className={`w-5 h-5 ${show ? "rotate-180" : ""} transition-all duration-200 ml-2`} />
                            </button>
                            <Transition
                                show={show}
                                enter="transition-all ease-out duration-200 origin-top"
                                enterFrom="transform opacity-0 scale-90"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition-all ease-in duration-150 origin-top"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-90"
                            >
                                <Tab onChange={() => setQuery('')}>
                                    <Tab.List className="md:w-1/3 lg:w-1/4">
                                        <Tab.Item>Payment</Tab.Item>
                                        <Tab.Item>Manifest</Tab.Item>
                                    </Tab.List>
                                    <Tab.Panels>
                                        <Tab.Panel>
                                            <div className="w-full p-2 max-w-full overflow-x-auto gray-scrollbar">
                                                <h5 className="text-gray-800 dark:text-gray-100 text-lg font-semibold">{__('payment.title')}</h5>
                                                {
                                                    payments.length === 0
                                                        ? (
                                                            <div className="w-full flex flex-col items-center justify-center">
                                                                <span className="text-gray-500 dark:text-gray-400 text-center">{__('no_payment')}</span>
                                                            </div>
                                                        )
                                                        : (
                                                            <div className="w-full">
                                                                <table className="w-full">
                                                                    <thead>
                                                                        <tr className="border-b-2 border-gray-300 dark:border-gray-800 [&_>_th]:p-2 [&_>_th]:whitespace-nowrap text-gray-900 dark:text-white">
                                                                            <th>{__('payment.method')}</th>
                                                                            <th>{__('payment.code')}</th>
                                                                            <th>{__('payment.paid_at')}</th>
                                                                            <th>{__('payment.status')}</th>
                                                                            <th>{__('payment.amount')}</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            payments.map((payment, i) => (
                                                                                <tr key={i} className="border-b border-gray-300 dark:border-gray-800 [&_>_td]:p-2 [&_>_td]:whitespace-nowrap text-gray-900 dark:text-white text-center">
                                                                                    <td>{payment.payment_method.name}</td>
                                                                                    <td>
                                                                                        {
                                                                                            payment.status === 'paid'
                                                                                                ? payment.payment_code
                                                                                                : (
                                                                                                    <Link href={`/payments/${payment.payment_code}`} target="_blank" className="flex items-center justify-center underline hover:text-rose-500">
                                                                                                        {payment.payment_code}
                                                                                                        <sup>
                                                                                                            <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                                                                                                        </sup>
                                                                                                    </Link>
                                                                                                )
                                                                                        }
                                                                                    </td>
                                                                                    <td>{moment(payment.created_at).format('DD MMMM YYYY')}</td>
                                                                                    <td>{__(payment.status)}</td>
                                                                                    <td className="text-end">{formatIDR(payment.amount)}</td>
                                                                                </tr>
                                                                            ))
                                                                        }
                                                                    </tbody>
                                                                    <tfoot>
                                                                        <tr className="dark:border-gray-800 [&_>_th]:whitespace-nowrap text-gray-900 dark:text-white">
                                                                            <th className="text-end" colSpan="4">Total Paid</th>
                                                                            <th className="text-end">{formatIDR(reservation.amount_paid)}</th>
                                                                        </tr>
                                                                        <tr className="dark:border-gray-800 [&_>_th]:whitespace-nowrap text-gray-900 dark:text-white">
                                                                            <th className="text-end" colSpan="4">Leftover</th>
                                                                            <th className="text-end">{formatIDR(reservation.total_price - reservation.amount_paid)}</th>
                                                                        </tr>
                                                                        <tr className="dark:border-gray-800 [&_>_th]:whitespace-nowrap text-gray-900 dark:text-white">
                                                                            <th className="text-end" colSpan="4">Total</th>
                                                                            <th className="text-end">{formatIDR(reservation.total_price)}</th>
                                                                        </tr>
                                                                    </tfoot>
                                                                </table>
                                                            </div>
                                                        )

                                                }
                                            </div>
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <div className="w-full p-2">
                                                <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center">
                                                    <h5 className="text-gray-800 dark:text-gray-100 text-lg font-semibold mb-3 lg:mb-0">{__('flight.reservation.manifest.title')}</h5>
                                                    <Input containerClassName="w-full lg:w-1/2" label={__('search')} value={query} onChange={(e) => setQuery(e.target.value)} type="text" />
                                                </div>
                                                {
                                                    !reservation.manifest
                                                        ? (
                                                            <p className="text-center text-gray-700 dark:text-gray-300">{__('flight.reservation.no_manifest')}</p>
                                                        )
                                                        : (
                                                            <>
                                                                <div className="w-full max-w-full overflow-auto gray-scrollbar max-h-[400px]">
                                                                    <table className="w-full">
                                                                        <thead className="sticky top-0 bg-white dark:bg-gray-900 outline outline-1 outline-gray-300 dark:outline-gray-700">
                                                                            <tr className="border-b-2 border-gray-300 dark:border-gray-800 [&_>_th]:p-2 [&_>_th]:whitespace-nowrap text-gray-900 dark:text-white">
                                                                                <th>{__('flight.reservation.manifest.name')}</th>
                                                                                <th>{__('flight.reservation.manifest.passport_number')}</th>
                                                                                <th>{__('flight.reservation.manifest.visa_number')}</th>
                                                                                <th>{__('flight.reservation.manifest.date_of_birth')}</th>
                                                                                <th>{__('flight.reservation.manifest.gender')}</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                queriedPassengers.length === 0
                                                                                    ? (
                                                                                        <tr className=" [&_>_td]:p-2 [&_>_td]:whitespace-nowrap text-gray-900 dark:text-white text-center">
                                                                                            <td colSpan={5}>No Passenger found.</td>
                                                                                        </tr>
                                                                                    )
                                                                                    : queriedPassengers.map((passenger, i) => (
                                                                                        <tr key={i} className="border-b border-gray-300 dark:border-gray-800 [&_>_td]:p-2 [&_>_td]:whitespace-nowrap text-gray-900 dark:text-white text-center">
                                                                                            <td>{passenger.name}</td>
                                                                                            <td>{passenger.passport_number}</td>
                                                                                            <td>{passenger.visa_number}</td>
                                                                                            <td>
                                                                                                {
                                                                                                    passenger.date_of_birth !== null
                                                                                                        ? moment(passenger.date_of_birth).format('DD MMMM YYYY')
                                                                                                        : '-'
                                                                                                }
                                                                                            </td>
                                                                                            <td>
                                                                                                {
                                                                                                    passenger.gender !== null
                                                                                                        ? __(passenger.gender)
                                                                                                        : "-"
                                                                                                }
                                                                                            </td>
                                                                                        </tr>
                                                                                    ))
                                                                            }
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </>
                                                        )
                                                }

                                            </div>
                                        </Tab.Panel>
                                    </Tab.Panels>
                                </Tab>
                            </Transition>
                        </>
                    )
                }
                {
                    loading && (
                        <div className="absolute inset-0 bg-white dark:bg-gray-900 bg-opacity-50 grid place-items-center">
                            <SpinnerIcon className="w-7 h-7 animate-spin text-rose-600" />
                        </div>
                    )
                }
            </div>
            {
                !reservation.is_expired && (
                    <div className="w-full p-3 bg-gray-100 dark:bg-gray-800 flex items-center justify-end space-x-2">
                        {
                            reservation.guests_map !== null && (
                                <Link target="_blank" className="btn-rose rounded-full px-2 py-1 text-sm" download={basename(reservation.guests_map)} href={reservation.guests_map}>
                                    <CloudArrowDownIcon className="w-5 h-5 mr-2" />
                                    Download Guest Map
                                </Link>
                            )
                        }
                        <button onClick={() => {
                            setParentReservation(reservation)
                            setModalOpen('uploadManifestModal')
                        }} disabled={reservation.amount_paid === 0 || reservation.manifest !== null} className="btn-rose rounded-full px-2 py-1 text-sm">Upload Manifest</button>
                        <button onClick={() => {
                            setParentReservation(reservation)
                            setModalOpen('uploadGuestMapModal')
                        }} disabled={reservation.amount_paid === 0 || reservation.guests_map !== null} className="btn-rose rounded-full px-2 py-1 text-sm">Upload Guest Map</button>
                        <button onClick={() => {
                            setParentReservation(reservation)
                            setModalOpen('reservation-addPaymentModal')
                        }} className="btn-rose rounded-full px-2 py-1 text-sm">Add Payment</button>
                    </div>
                )
            }
        </div>
    )
}