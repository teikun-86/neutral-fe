import Alert from "@/components/alert";
import { Input } from "@/components/forms";
import BookPackage from "@/components/forms/book-package";
import { useAuth } from "@/hooks/auth";
import { useLocale } from "@/hooks/locale";
import modalState from "@/hooks/modal";
import HajjUmrahLayout from "@/layouts/hajj-umrah";
import { axios } from "@/libs/axios";
import { formatIDR, searchString } from "@/util";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";

const Package = () => {
    const { __ } = useLocale()
    const { user } = useAuth({
        middleware: 'auth'
    })
    const setModalState = useSetRecoilState(modalState)
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [packages, setPackages] = useState([])
    const [selectedPackage, setSelectedPackage] = useState(null)

    const getPackages = async () => {
        setLoading(true)
        setQuery('')
        await axios.get('/hajj-umrah/packages?pool=1').then(res => {
            setPackages(res.data.packages)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            toast.error("Failed to fetch packages. Please try again later.")
            console.log(err)
        })
    }

    const selectPackage = (pkg) => {
        setSelectedPackage(pkg)
        setModalState('reservePackageModal')
    }

    const queriedPackages = query.trim().length === 0 ? packages : packages.filter(pak => {
        return searchString(query, pak.hotel.location_1)
            || searchString(query, pak.hotel.location_2)
            || searchString(query, pak.flight.airline.name)
            || searchString(query, pak.flight.departure_airport.name)
            || searchString(query, pak.flight.arrival_airport.name)
            || searchString(query, moment(pak.flight.depart_at).format("DD MMM YYYY"))
            || searchString(query, moment(pak.flight.return_depart_at).format("DD MMM YYYY"))
    })

    useEffect(() => {
        getPackages()
    }, [])

    return (
        <HajjUmrahLayout title="Flight + Hotel Package">
            <div className="w-full">
                <div className="flex flex-col lg:flex-row lg:justify-between mb-2 w-full p-2">
                    <h5 className="text-gray-900 dark:text-white text-lg font-semibold mb-2 lg:mb-0">{__('title.hajj_umrah.packages')}</h5>
                    <Input type="text" id="search" name="search" label="" containerClassName="w-full lg:max-w-md" className="!rounded-full placeholder:opacity-100" placeholder={__('search')} value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <div className="my-2 overflow-x-auto p-2 bg-white dark:bg-gray-900 shadow-sm md:rounded-lg gray-scrollbar">
                    <table className={`w-full ${loading ? "border-spacing-2 border-separate" : ""}`}>
                        <thead>
                            <tr className="border-b-2 border-gray-300 dark:border-gray-800 [&_>_th]:p-2 [&_>_th]:whitespace-nowrap text-gray-500 [&_>_th]:font-medium [&_>_th]:text-xs [&_>_th]:tracking-wider [&_>_th]:uppercase [&_>_th]:text-start">
                                <th></th>
                                <th className="sticky z-20 top-0 bg-white dark:bg-gray-900">Airline</th>
                                <th className="sticky z-20 top-0 bg-white dark:bg-gray-900">Flight Number</th>
                                <th className="sticky z-20 top-0 bg-white dark:bg-gray-900">Departure At</th>
                                <th className="sticky z-20 top-0 bg-white dark:bg-gray-900">Check In At</th>
                                <th className="sticky z-20 top-0 bg-white dark:bg-gray-900">Check Out At</th>
                                <th className="sticky z-20 top-0 bg-white dark:bg-gray-900">Room Detail</th>
                                <th className="sticky z-20 top-0 bg-white dark:bg-gray-900">Program Type</th>
                                <th className="sticky z-20 top-0 bg-white dark:bg-gray-900">Price/package</th>
                                <th className="sticky z-20 top-0 bg-white dark:bg-gray-900">Packages Available</th>
                                <th className="sticky z-20 top-0 bg-white dark:bg-gray-900"></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 dark:text-gray-300">
                            {
                                loading
                                    ? (
                                        <>
                                            {
                                                [...Array(10)].map((_, i) => (
                                                    <tr key={i} className="border-gray-300 dark:border-gray-800 [&_>_td]:p-2 [&_>_td]:whitespace-nowrap">
                                                        <td></td>
                                                        <td colSpan={9} className="skeleton"></td>
                                                        <td></td>
                                                    </tr>
                                                ))
                                            }
                                        </>
                                    )
                                    : (
                                        <>
                                            {
                                                queriedPackages.length === 0
                                                    ? (
                                                        <>
                                                            <tr>
                                                                <td colSpan="6" className="text-center py-4">No packages found</td>
                                                            </tr>
                                                        </>
                                                    )
                                                    : queriedPackages.map((pkg, i) => (
                                                        <Fragment key={i}>
                                                            <tr className="border-gray-300 dark:border-gray-800 [&_>_td]:p-2 [&_>_td]:whitespace-nowrap">
                                                                <td></td>
                                                                <td>
                                                                    {pkg.flight.airline.name}
                                                                </td>
                                                                <td>
                                                                    <p>Departure: {pkg.flight.airline.code}-{pkg.flight.flight_number}</p>
                                                                    <p>Return: {pkg.flight.airline.code}-{pkg.flight.return_flight_number}</p>
                                                                </td>
                                                                <td>
                                                                    <p>Departure: {moment(pkg.flight.depart_at).format("DD MMM YYYY")}</p>
                                                                    <p>Return: {moment(pkg.flight.return_depart_at).format("DD MMM YYYY")}</p>
                                                                </td>
                                                                <td>
                                                                    <p>{pkg.hotel.location_1}: {moment(pkg.hotel.first_check_in_at).format('DD MMM YYYY')}</p>
                                                                    <p>{pkg.hotel.location_2}: {moment(pkg.hotel.last_check_in_at).format('DD MMM YYYY')}</p>
                                                                </td>
                                                                <td>
                                                                    <p>{pkg.hotel.location_1}: {moment(pkg.hotel.first_check_out_at).format('DD MMM YYYY')}</p>
                                                                    <p>{pkg.hotel.location_2}: {moment(pkg.hotel.last_check_out_at).format('DD MMM YYYY')}</p>
                                                                </td>
                                                                <td>
                                                                    <p>{pkg.hotel.room_detail.quad} Quad</p>
                                                                    <p>{pkg.hotel.room_detail.triple} Triple</p>
                                                                    <p>{pkg.hotel.room_detail.double} Double</p>
                                                                </td>
                                                                <td>{pkg.program_type} Days</td>
                                                                <td>{formatIDR(pkg.price_per_package)}</td>
                                                                <td>{pkg.packages_left} / {pkg.packages_available}</td>
                                                                <td>
                                                                    <div className="flex items-center space-x-2">
                                                                        <button disabled={pkg.packages_left === 0} onClick={() => selectPackage(pkg)} className="btn-light dark:btn-dark">Book</button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </Fragment>
                                                    ))
                                            }
                                        </>
                                    )
                            }
                        </tbody>
                    </table>
                </div>
                <Alert title="Tip">
                    Hold <code className="text-xs p-1 rounded bg-gray-100 dark:bg-gray-900 mx-1">Shift</code> while scrolling to scroll horizontally.
                </Alert>
            </div>
            {
                selectedPackage && (
                    <BookPackage
                        pkg={selectedPackage}
                        setSelectedPackage={setSelectedPackage}
                        user={user}
                    />
                )
            }
        </HajjUmrahLayout>
    );
};

export default Package;