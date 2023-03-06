import Alert from '@/components/alert';
import { FlightReservation } from '@/components/flight';
import { Input } from '@/components/forms';
import AddPayment from '@/components/forms/flight/add-payment';
import UploadManifest from '@/components/forms/manifest';
import { ThreeDots } from '@/components/icons';
import { useLocale } from '@/hooks/locale';
import HajjUmrahLayout from '@/layouts/hajj-umrah';
import { axios } from '@/libs/axios';
import { searchString } from '@/util';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Reservations = () => {
    const router = useRouter()
    const { __ } = useLocale()
    const [message, setMessage] = useState(null)
    const [reservation, setReservation] = useState(null)
    const [reservations, setReservations] = useState([])
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState('')

    const queriedReservations = query.trim().length === 0
        ? reservations
        : reservations.filter(reservation => {
            const queries = query.trim().split(' ')
            
            return queries.every(q => {
                return searchString(q, reservation.flight.airline.code + '-' + reservation.flight.flight_number)
                    || searchString(q, reservation.flight.airline.name)
                    || searchString(q, reservation.flight.departure_airport.name)
                    || searchString(q, reservation.flight.arrival_airport.name)
                    || searchString(q, reservation.flight.departure_airport.iata)
                    || searchString(q, reservation.flight.arrival_airport.iata)
                    || searchString(q, moment(reservation.flight.depart_at).format("DD MMMM YYYY"))
                    || searchString(q, moment(reservation.created_at).format("DD MMMM YYYY HH:mm"))
            })
        })
    
    const getReservations = async () => {
        setLoading(true)
        await axios.get("/hajj-umrah/flights/reservations").then(res => {
            setLoading(false)
            setReservations(res.data.reservations)
        })
    }

    useEffect(() => {
        getReservations()
    }, [])

    useEffect(() => {
        const { _r } = router.query
        if (_r) {
            const res = JSON.parse(atob(_r))

            setReservation(res.data)
            setMessage(res.message)
            router.push(router.pathname, undefined, { shallow: true })
        }
    }, [router])
    
    return (
        <HajjUmrahLayout title="Reservations">
            {
                loading
                ? (
                    <div className="w-full min-h-[60vh] grid place-items-center">
                        <ThreeDots />
                    </div>
                )
                : (
                    <div className="w-full">
                        <div className="flex flex-col lg:flex-row lg:justify-between mb-2 w-full">
                            <h5 className="text-gray-900 dark:text-white text-lg font-semibold mb-2 lg:mb-0">{__('title.hajj_umrah.reservations')}</h5>
                            <Input type="text" id="search" name="search" label="" containerClassName="w-full lg:max-w-md" className="!rounded-full placeholder:opacity-100" placeholder={__('search')} value={query} onChange={(e) => setQuery(e.target.value)} />
                        </div>
                        {
                            message && (
                                <Alert>{__(message, {
                                    minute: reservation ? moment(reservation.expired_at).diff(moment(), 'minute') : null,
                                })}</Alert>
                            )
                        }
                        
                        {
                            queriedReservations.length === 0
                            ? (
                                <div className="w-full min-h-[60vh] grid place-items-center">
                                    <p className="text-gray-500 dark:text-gray-400 text-center">{__('flight.reservation.not_found')}</p>
                                </div>
                            )
                            : (
                                <div className="w-full">
                                    {
                                        queriedReservations.map(reservation => <FlightReservation res={reservation} key={reservation.id} setParentReservation={setReservation} reload={getReservations} />)
                                    }
                                </div>
                            )
                        }
                    </div>
                )
            }
            {
                reservation && (
                    <>
                        <UploadManifest reservation={reservation} reload={getReservations} />
                        <AddPayment reservation={reservation} reload={getReservations} />
                    </>
                )
            }
        </HajjUmrahLayout>
    );
};

export default Reservations;