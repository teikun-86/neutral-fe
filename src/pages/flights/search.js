import AppLayout from '@/layouts/app';
import { LionAPI } from '@/libs/lion-api';
import { FlightTicket } from '@/components/flight';
import { ArrowRightIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import Link from 'next/link';
import { randomString } from '@/util';
import { useRouter } from 'next/router';
import { PullToRefresh } from '@/components/pull-to-refresh';
import { Disclosure, Transition } from '@headlessui/react';

const Search = ({ airports, options, ...props }) => {

    const router = useRouter()

    const refresh = () => {
        router.replace(router.asPath)
    }
    
    return (
        <AppLayout showGoToTopButton fixed={false} title="Cari Tiket Pesawat ー Neutral">
            <div className="w-full py-2 pb-0 bg-gray-100 shadow-lg sticky top-0 px-4 z-40">
                <div className="w-full max-w-7xl mx-auto">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800">Pilih Penerbangan Pergi</h2>
                    <div className="md:flex items-center md:justify-between">
                        <div className="flex items-center flex-wrap space-x-2 text-xs md:text-base text-gray-900 font-semibold w-full">
                            <div className="flex items-center space-x-2">
                                <span>{options.departFrom}</span>
                                <ArrowRightIcon className="w-5 h-5" />
                                <span>{options.arriveAt}</span>
                            </div>
                            <span className="middot"></span>
                            <span>{moment(options.departureDate).format("ddd, D MMM")}</span>
                            <span className="middot"></span>
                            <span>{options.passengers} Penumpang</span>
                            <span className="middot"></span>
                            <span>{options.class}</span>
                        </div>
                        <Link href="/flights" className="btn-rose rounded-full px-5 w-full md:w-auto my-2 whitespace-nowrap uppercase tracking-wider">Ubah Pencarian</Link>
                    </div>
                </div>
            </div>

            <div className="my-3 w-full max-w-7xl mx-auto flex">
                <div className="hidden md:block w-1/4 p-3">
                    <div className="w-full p-4 sticky top-24">
                        <div className="flex items-center justify-between">
                            <h6 className="text-gray-800 font-semibold text-lg">Filter</h6>
                            <button className="btn-rose rounded-full uppercase px-2 py-1">Reset</button>
                        </div>
                        <div className="w-full block bg-white rounded shadow p-3 my-2 max-h-[76vh] overflow-y-auto gray-scrollbar">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between rounded-lg hocus:bg-rose-100 px-4 py-2 text-left text-sm font-medium hocus:text-rose-900 focus:outline-none focus:ring-0">
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
                                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-800">
                                                
                                            </Disclosure.Panel>
                                        </Transition>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                    </div>
                </div>
                
                <div className="w-full md:w-3/4 p-3">
                    {
                        airports.Departure.length <= 0
                        ? <p className="text-center text-gray-700">Tidak ada tiket tersedia pada tanggal tersebut. Pilih tanggal lain atau ubah bandara keberangkatan.</p>
                        : (
                            <>
                                <p className="text-left text-gray-700">Menampilkan {airports.Departure.length} penerbangan dengan harga terbaik</p>
                                {
                                    airports.Departure.map(dep => {
                                        return <FlightTicket key={dep.AirEquipType + randomString(12)} departure={dep} />
                                    })
                                }
                            </>
                        )
                    }
                </div>
            </div>
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
    let departures = res.Departure.filter(dep => dep.BookingClassAvail.length > 0)
    let returns = res.Return.filter(dep => dep.BookingClassAvail.length > 0)
    let results = {
        Departure: departures,
        Return: returns
    }
    
    return {
        props: {
            airports: results,
            options: {
                departFrom: query.d,
                arriveAt: query.a,
                departureDate: query.d_date,
                passengers: Number(query.adult) + Number(query.child),
                class: query.class
            }
        }
    }
}

export default Search;