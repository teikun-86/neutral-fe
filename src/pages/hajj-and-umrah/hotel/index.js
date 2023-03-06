import Alert from '@/components/alert';
import { Input } from '@/components/forms';
import BookHotel from '@/components/forms/book-hotel';
import { useAuth } from '@/hooks/auth';
import { useLocale } from '@/hooks/locale';
import modalState from '@/hooks/modal';
import HajjUmrahLayout from '@/layouts/hajj-umrah';
import { axios } from '@/libs/axios';
import { formatIDR, searchString } from '@/util';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

const Hotel = () => {

    const { __ } = useLocale()
    const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()
    const setModalOpen = useSetRecoilState(modalState)
    const [loading, setLoading] = useState(true)
    const [hotels, setHotels] = useState([])
    const [query, setQuery] = useState('')
    const [selectedHotel, setSelectedHotel] = useState(null)

    const getHotels = async () => {
        setLoading(true)
        await axios.get("hajj-umrah/hotels").then(res => {
            setHotels(res.data.hotels)
            setLoading(false)
        }).catch(err => {
            toast.error("Failed to load hotels.")
            setLoading(false)
        })
    }
    
    const selectHotel = (hotel) => {
        setSelectedHotel(hotel)
        setModalOpen('reserveHotelModal')
    }

    const queriedHotels = query.trim().length === 0 ? hotels : hotels.filter(hotel => {
        return searchString(query, hotel.company ? hotel.company.name : '')
            || searchString(query, hotel.location_1)
            || searchString(query, hotel.location_2)
            || searchString(query, hotel.price_per_package)
            || searchString(query, hotel.room_detail.quad)
            || searchString(query, hotel.room_detail.triple)
            || searchString(query, hotel.room_detail.double)
            || searchString(query, moment(hotel.first_check_in_at).format('DD MMMM YYYY'))
            || searchString(query, moment(hotel.first_check_out_at).format('DD MMMM YYYY'))
            || searchString(query, moment(hotel.last_check_in_at).format('DD MMMM YYYY'))
            || searchString(query, moment(hotel.last_check_out_at).format('DD MMMM YYYY'))
    })
    
    useEffect(() => {
        if (user && user.user_type === 'company') {
            getHotels()
        }

        if (user && user.user_type === 'agent') {
            router.push('/hajj-and-umrah/hotel/pool')
        }
    }, [user, router])

    return (
        <HajjUmrahLayout showGoToTopButton title="Hotels">
            <div className="w-full">
                <div className="flex flex-col lg:flex-row lg:justify-between mb-2 w-full p-2">
                    <h5 className="text-gray-900 dark:text-white text-lg font-semibold mb-2 lg:mb-0">{__('title.hajj_umrah.hotels')}</h5>
                    <Input type="text" id="search" name="search" label="" containerClassName="w-full lg:max-w-md" className="!rounded-full placeholder:opacity-100" placeholder={__('search')} value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <div className="my-2 overflow-x-auto p-2 bg-white dark:bg-gray-900 shadow-sm md:rounded-lg gray-scrollbar">
                    <table className={`w-full ${loading ? "border-spacing-2 border-separate" : ""}`}>
                        <thead>
                            <tr className="border-b-2 border-gray-300 dark:border-gray-800 [&_>_th]:p-2 [&_>_th]:whitespace-nowrap text-gray-500 [&_>_th]:font-medium [&_>_th]:text-xs [&_>_th]:tracking-wider [&_>_th]:uppercase [&_>_th]:text-start">
                                <th></th>
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
                                                        <td colSpan={6} className="skeleton"></td>
                                                        <td></td>
                                                    </tr>
                                                ))
                                            }
                                        </>
                                    )
                                    : (
                                        <>
                                            {
                                                queriedHotels.length === 0
                                                    ? (
                                                        <>
                                                            <tr>
                                                                <td colSpan="6" className="text-center py-4">No hotels found</td>
                                                            </tr>
                                                        </>
                                                    )
                                                    : queriedHotels.map((hotel, i) => (
                                                        <>
                                                            <tr className="border-gray-300 dark:border-gray-800 [&_>_td]:p-2 [&_>_td]:whitespace-nowrap">
                                                                <td><span className="text-xs font-medium uppercase text-gray-500">{hotel.location_1}</span></td>
                                                                <td>{moment(hotel.first_check_in_at).format('DD MMM YYYY')}</td>
                                                                <td>{moment(hotel.first_check_out_at).format('DD MMM YYYY')}</td>
                                                                <td rowSpan={2}>
                                                                    <p>{hotel.room_detail.quad} Quad</p>
                                                                    <p>{hotel.room_detail.triple} Triple</p>
                                                                    <p>{hotel.room_detail.double} Double</p>
                                                                </td>
                                                                <td rowSpan={2}>{hotel.program_type} Days</td>
                                                                <td rowSpan={2}>{formatIDR(hotel.price_per_package)}</td>
                                                                <td rowSpan={2}>{hotel.packages_left}/<small className="text-xs opacity-60">{hotel.packages_available} packages</small></td>
                                                                <td rowSpan={2}>
                                                                    <div className="flex items-center justify-start flex-nowrap space-x-2">
                                                                        <button disabled={hotel.packages_left === 0} onClick={() => selectHotel(hotel)} className="btn-light dark:btn-dark">Book</button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className="[&:not(:last-child)]:border-b border-gray-300 dark:border-gray-800 [&_>_td]:p-2 [&_>_td]:whitespace-nowrap">
                                                                <td><span className="text-xs font-medium uppercase text-gray-500">{hotel.location_2}</span></td>
                                                                <td>{moment(hotel.last_check_in_at).format('DD MMM YYYY')}</td>
                                                                <td>{moment(hotel.last_check_out_at).format('DD MMM YYYY')}</td>
                                                            </tr>
                                                        </>
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
                selectedHotel && (
                    <BookHotel
                        hotel={selectedHotel}
                        setSelectedHotel={setSelectedHotel}
                        user={user}
                    />
                )
            }
        </HajjUmrahLayout>
    );
};

export default Hotel;