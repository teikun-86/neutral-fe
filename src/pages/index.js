import Navbar from "@/components/navbar";
import Head from "next/head";
import travelBg from "@/assets/images/tokyo-tower.jpg";
import SearchBox from "@/components/search";
import { ArrowPathIcon, BuildingOfficeIcon, CreditCardIcon, HeartIcon, IdentificationIcon, QuestionMarkCircleIcon, ReceiptRefundIcon } from "@heroicons/react/24/outline";
import AirplaneTakeoffIcon from "@/components/icons/airplane-takeoff";
import TrainIcon from "@/components/icons/train";
import BoatIcon from "@/components/icons/boat";
import CarIcon from "@/components/icons/car";
import TruckIcon from "@/components/icons/truck";
import KaabaIcon from "@/components/icons/kaaba";
import NavLink from "@/components/navbar/link";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Head>
                <title>Neutral ー Your Best Travel Companion</title>
            </Head>
            <div className="w-full min-h-screen bg-gray-50 p-0 m-0 antialiased">
                <Navbar />
                <div className="w-full h-[70vh] bg-gray-400 bg-cover bg-top"
                    style={{
                        backgroundImage: `url(${travelBg.src})`
                    }}
                >
                    <div className="w-full min-h-full bg-gradient-to-r from-black/60 to-black/60 via-black/20 flex items-center">
                        <div className="w-full block max-w-7xl mx-auto px-4">
                            <h1 className="text-center text-white text-3xl font-bold mb-3">Otewe yuk!</h1>
                            <SearchBox />
                            <div className="flex items-center justify-center gap-3 flex-wrap mt-6">
                                <div className="items-center justify-center flex flex-col text-white">
                                    <button className="px-2 py-2 rounded-full bg-white/50 grid place-items-center hover:bg-white/80 transition-all duration-200">
                                        <AirplaneTakeoffIcon className="w-10 h-10 text-red-600" />
                                    </button>
                                    Pesawat
                                </div>
                                <div className="items-center justify-center flex flex-col text-white">
                                    <button className="px-2 py-2 rounded-full bg-white/50 grid place-items-center hover:bg-white/80 transition-all duration-200">
                                        <BuildingOfficeIcon className="w-10 h-10 text-red-600" />
                                    </button>
                                    Hotel
                                </div>
                                <div className="items-center justify-center flex flex-col text-white">
                                    <button className="px-2 py-2 rounded-full bg-white/50 grid place-items-center hover:bg-white/80 transition-all duration-200">
                                        <TrainIcon className="w-10 h-10 text-red-600" />
                                    </button>
                                    Kereta Api
                                </div>
                                <div className="items-center justify-center flex flex-col text-white">
                                    <button className="px-2 py-2 rounded-full bg-white/50 grid place-items-center hover:bg-white/80 transition-all duration-200">
                                        <BoatIcon className="w-10 h-10 text-red-600" />
                                    </button>
                                    Pelni
                                </div>
                                <div className="items-center justify-center flex flex-col text-white">
                                    <button className="px-2 py-2 rounded-full bg-white/50 grid place-items-center hover:bg-white/80 transition-all duration-200">
                                        <CarIcon className="w-10 h-10 text-red-600" />
                                    </button>
                                    Sewa Mobil
                                </div>
                                <div className="items-center justify-center flex flex-col text-white">
                                    <button className="px-2 py-2 rounded-full bg-white/50 grid place-items-center hover:bg-white/80 transition-all duration-200">
                                        <TruckIcon className="w-10 h-10 text-red-600" />
                                    </button>
                                    Cargo
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-7xl mx-auto px-4">
                    <div className="w-2/3 sm:w-1/2 bg-white p-3 rounded-lg grid place-items-center mx-auto -mt-10 shadow-lg">
                        <h3 className="text-xl font-bold text-gray-900 text-center">Haji & Umrah</h3>
                    </div>
                    <div className="flex w-full items-center justify-center flex-wrap">
                        <div className="w-1/2 sm:w-1/3 md:w-1/4 p-2 sm:p-3">
                            <div className="w-full p-1 py-3 sm:p-3 rounded-lg bg-white shadow hover:shadow-lg transition duration-300 grid place-items-center cursor-pointer min-h-[10rem] md:min-h-0">
                                <span className="p-2 rounded-full bg-primary-50">
                                    <KaabaIcon className="w-10 h-10 text-primary-600" />
                                </span>
                                <h5 className="text-lg font-semibold text-gray-900 text-center">Land Arrangement</h5>
                            </div>
                        </div>
                        <div className="w-1/2 sm:w-1/3 md:w-1/4 p-2 sm:p-3">
                            <div className="w-full p-1 py-3 sm:p-3 rounded-lg bg-white shadow hover:shadow-lg transition duration-300 grid place-items-center cursor-pointer min-h-[10rem] md:min-h-0">
                                <span className="p-2 rounded-full bg-primary-50">
                                    <AirplaneTakeoffIcon className="w-10 h-10 text-primary-600" />
                                </span>
                                <h5 className="text-lg font-semibold text-gray-900 text-center">Pesawat</h5>
                            </div>
                        </div>
                        <div className="w-1/2 sm:w-1/3 md:w-1/4 p-2 sm:p-3">
                            <div className="w-full p-1 py-3 sm:p-3 rounded-lg bg-white shadow hover:shadow-lg transition duration-300 grid place-items-center cursor-pointer min-h-[10rem] md:min-h-0">
                                <span className="p-2 rounded-full bg-primary-50">
                                    <CreditCardIcon className="w-10 h-10 text-primary-600" />
                                </span>
                                <h5 className="text-lg font-semibold text-gray-900 text-center">Pay Later</h5>
                            </div>
                        </div>
                        <div className="w-1/2 sm:w-1/3 md:w-1/4 p-2 sm:p-3">
                            <div className="w-full p-1 py-3 sm:p-3 rounded-lg bg-white shadow hover:shadow-lg transition duration-300 grid place-items-center cursor-pointer min-h-[10rem] md:min-h-0">
                                <span className="p-2 rounded-full bg-primary-50">
                                    <IdentificationIcon className="w-10 h-10 text-primary-600" />
                                </span>
                                <h5 className="text-lg font-semibold text-gray-900 text-center">VISA</h5>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 text-center">Jaminan Harga Termurah!</h2>
                    <h2 className="text-2xl font-bold text-gray-900 text-center mt-4 mb-2">Butuh Bantuan? Cek Informasi Berikut!</h2>

                    <div className="flex w-full justify-center items-center flex-wrap">
                        <div className="w-1/2 sm:w-1/3 lg:w-1/4 p-2 sm:p-3">
                            <div className="w-full p-1 py-3 sm:p-3 rounded-lg bg-white shadow hover:shadow-lg transition duration-300 grid place-items-center min-h-[10rem] lg:min-h-0 cursor-pointer">
                                <span className="p-2 rounded-full bg-primary-50/20">
                                    <QuestionMarkCircleIcon className="w-10 h-10 text-primary-600" />
                                </span>
                                <h5 className="text-lg font-semibold text-gray-900 text-center">Info Perjalanan Saat PPKM</h5>
                            </div>
                        </div>
                        <div className="w-1/2 sm:w-1/3 lg:w-1/4 p-2 sm:p-3">
                            <div className="w-full p-1 py-3 sm:p-3 rounded-lg bg-white shadow hover:shadow-lg transition duration-300 grid place-items-center min-h-[10rem] lg:min-h-0 cursor-pointer">
                                <span className="p-2 rounded-full bg-primary-50/20">
                                    <ReceiptRefundIcon className="w-10 h-10 text-primary-600" />
                                </span>
                                <h5 className="text-lg font-semibold text-gray-900 text-center">Refund Pesawat</h5>
                            </div>
                        </div>
                        <div className="w-1/2 sm:w-1/3 lg:w-1/4 p-2 sm:p-3">
                            <div className="w-full p-1 py-3 sm:p-3 rounded-lg bg-white shadow hover:shadow-lg transition duration-300 grid place-items-center min-h-[10rem] lg:min-h-0 cursor-pointer">
                                <span className="p-2 rounded-full bg-primary-50/20">
                                    <ArrowPathIcon className="w-10 h-10 text-primary-600" />
                                </span>
                                <h5 className="text-lg font-semibold text-gray-900 text-center">Reschedule Pesawat</h5>
                            </div>
                        </div>
                        <div className="w-1/2 sm:w-1/3 lg:w-1/4 p-2 sm:p-3">
                            <div className="w-full p-1 py-3 sm:p-3 rounded-lg bg-white shadow hover:shadow-lg transition duration-300 grid place-items-center min-h-[10rem] lg:min-h-0 cursor-pointer">
                                <span className="p-2 rounded-full bg-primary-50/20">
                                    <ReceiptRefundIcon className="w-10 h-10 text-primary-600" />
                                </span>
                                <h5 className="text-lg font-semibold text-gray-900 text-center">Refund Hotel</h5>
                            </div>
                        </div>
                        <div className="w-1/2 sm:w-1/3 lg:w-1/4 p-2 sm:p-3">
                            <div className="w-full p-1 py-3 sm:p-3 rounded-lg bg-white shadow hover:shadow-lg transition duration-300 grid place-items-center min-h-[10rem] lg:min-h-0 cursor-pointer">
                                <span className="p-2 rounded-full bg-primary-50/20">
                                    <ArrowPathIcon className="w-10 h-10 text-primary-600" />
                                </span>
                                <h5 className="text-lg font-semibold text-gray-900 text-center">Reschedule Hotel</h5>
                            </div>
                        </div>
                        <div className="w-1/2 sm:w-1/3 lg:w-1/4 p-2 sm:p-3">
                            <div className="w-full p-1 py-3 sm:p-3 rounded-lg bg-white shadow hover:shadow-lg transition duration-300 grid place-items-center min-h-[10rem] lg:min-h-0 cursor-pointer">
                                <span className="p-2 rounded-full bg-primary-50/20">
                                    <QuestionMarkCircleIcon className="w-10 h-10 text-primary-600" />
                                </span>
                                <h5 className="text-lg font-semibold text-gray-900 text-center">Pusat Bantuan</h5>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <footer className="w-full bg-primary-500 p-3">
                    <div className="flex w-full max-w-7xl mx-auto py-2 flex-wrap lg:justify-between">
                        <div className="w-full lg:w-1/4 p-3">
                            <h1 className="text-3xl font-bold text-white text-center lg:text-start">Neutral</h1>
                            <p className="text-gray-100 text-sm text-center lg:text-start">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore repellendus perferendis praesentium quasi dolores iusto tempora et pariatur incidunt harum, ratione ex sed minima, at, hic vitae fugit expedita nisi.</p>
                        </div>
                        <div className="block w-full lg:w-3/4">
                            <div className="flex w-full flex-wrap justify-end">
                                <div className="w-full lg:w-auto p-3 flex flex-col lg:flex-row lg:space-x-3 lg:justify-end">
                                    <div className="w-full">
                                        <a className="text-white font-bold text-lg relative after:w-3/4 after:h-0.5 after:bg-white after:absolute after:-bottom-1 after:left-0 flex items-center">Useful Links</a>
                                        <nav>
                                            <ul className="list-none mt-4">
                                                <li className="my-1">
                                                    <Link href="#" className="text-gray-100 hover:text-white">Useful Link</Link>
                                                </li>
                                                <li className="my-1">
                                                    <Link href="#" className="text-gray-100 hover:text-white">Lorem Ipsum</Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                <div className="w-full lg:w-auto p-3 flex flex-col lg:flex-row lg:space-x-3 lg:justify-end">
                                    <div className="w-full">
                                        <a className="text-white font-bold text-lg relative after:w-3/4 after:h-0.5 after:bg-white after:absolute after:-bottom-1 after:left-0 flex items-center">About Neutral</a>
                                        <nav>
                                            <ul className="list-none mt-4">
                                                <li className="my-1">
                                                    <Link href="#" className="text-gray-100 hover:text-white">About Neutral</Link>
                                                </li>
                                                <li className="my-1">
                                                    <Link href="#" className="text-gray-100 hover:text-white">Neutral LLC</Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="text-center text-gray-200 flex items-center justify-center">Made with <HeartIcon className="text-white w-5 h-5 mx-1" /> by 
                    <a href="https://azizfsama.vercel.app" rel="noreferrer" target="_blank" className="text-gray-100 hover:text-white hover:underline transition-all duration-200 underline-offset-1 ml-1">Aziz Febriyanto</a></div>
                    <p className="text-center text-gray-200">Copyright &copy; {(new Date).getFullYear()}</p>
                </footer>
            </div>
        </>
  )
}
