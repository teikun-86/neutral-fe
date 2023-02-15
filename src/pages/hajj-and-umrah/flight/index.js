import Alert from "@/components/alert";
import { Input } from "@/components/forms";
import BookFlight from "@/components/forms/book-flight";
import { ThreeDots } from "@/components/icons";
import { useAuth } from "@/hooks/auth";
import { useLocale } from "@/hooks/locale";
import modalState from "@/hooks/modal";
import HajjUmrahLayout from "@/layouts/hajj-umrah";
import { axios } from "@/libs/axios";
import { formatIDR, searchString } from "@/util";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Flight = () => {
    const { __ } = useLocale()
    const router = useRouter()
    const { user } = useAuth()
    
    const [modalOpen, setModalOpen] = useRecoilState(modalState)
    const [loading, setLoading] = useState(true)
    const [flights, setFlights] = useState([])
    const [query, setQuery] = useState('')
    const [selectedFlight, setSelectedFlight] = useState(null)

    const queriedFlights = query.trim().length === 0 
        ? flights 
        : flights.filter(flight => {
            const queries = query.trim().split(' ')
            
            return queries.every(q => {
                return searchString(q, flight.airline.code + '-' + flight.flight_number)
                    || searchString(q, flight.airline.name)
                    || searchString(q, flight.departure_airport.name)
                    || searchString(q, flight.arrival_airport.name)
                    || searchString(q, flight.departure_airport.iata)
                    || searchString(q, flight.arrival_airport.iata)
                    || searchString(q, moment(flight.depart_at).format("DD MMMM YYYY"))
            })
            
        })

    const getFlights = async () => {
        setLoading(true)
        await axios.get("/hajj-umrah/flights").then(res => {
            setLoading(false)
            setFlights(res.data.flights)
        })
    }

    const selectFlight = (flight) => {
        setSelectedFlight(flight)
        setModalOpen('reserveFlightModal')
    }

    useEffect(() => {
        if (user && user.user_type === 'company') {
            getFlights()
        }

        if (user && user.user_type === 'agent') {
            router.push('/hajj-and-umrah/flight/pool')
        }
    }, [user, router])
    
    return (
        <HajjUmrahLayout showGoToTopButton title="Flight">
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
                            <h5 className="text-gray-900 dark:text-white text-lg font-semibold mb-2 lg:mb-0">{__('title.hajj_umrah.flights')}</h5>
                            <Input type="text" id="search" name="search" label="" containerClassName="w-full lg:max-w-md" className="!rounded-full placeholder:opacity-100" placeholder={__('search')} value={query} onChange={(e) => setQuery(e.target.value)} />
                        </div>
                        <div className="my-2 overflow-x-auto p-2 bg-white dark:bg-gray-900 shadow rounded-lg gray-scrollbar">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-gray-300 dark:border-gray-800 [&_>_th]:p-2 [&_>_th]:whitespace-nowrap text-gray-900 dark:text-white">
                                        <th>Airline</th>
                                        <th>Flight Number</th>
                                        <th>Departure</th>
                                        <th>Arrival</th>
                                        <th>Departure Date</th>
                                        <th>Price</th>
                                        <th>Seats</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700 dark:text-gray-300">
                                    {
                                        queriedFlights.length === 0
                                        ? (
                                            <>
                                                <tr>
                                                    <td colSpan="8" className="text-center py-4">No flights found</td>
                                                </tr>
                                            </>
                                        )
                                        : queriedFlights.map(flight => (
                                            <tr className="[&:not(:last-child)]:border-b border-gray-300 dark:border-gray-800 [&_>_td]:p-2 [&_>_td]:whitespace-nowrap" key={flight.id}>
                                                <td className="text-center">{flight.airline.name}</td>
                                                <td className="text-center">{flight.airline.code}-{flight.flight_number}</td>
                                                <td>{flight.departure_airport.name} ({flight.departure_airport.iata})</td>
                                                <td>{flight.arrival_airport.name} ({flight.arrival_airport.iata})</td>
                                                <td>{moment(flight.depart_at).format("DD MMMM YYYY")} </td>
                                                <td>{formatIDR(flight.price)}</td>
                                                <td>{flight.available_seats}</td>
                                                <td>
                                                    <button disabled={flight.available_seats === 0} onClick={() => selectFlight(flight)} className="btn-light dark:btn-dark">Book</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <Alert title="Tip">
                            Hold <code className="text-xs p-1 rounded bg-gray-100 dark:bg-gray-900 mx-1">Shift</code> while scrolling to scroll horizontally.
                        </Alert>
                        {
                            selectedFlight && (
                                <BookFlight user={user} flight={selectedFlight} setSelectedFlight={setSelectedFlight} />
                            )
                        }
                    </div>
                )
            }
        </HajjUmrahLayout>
    );
};

export default Flight;