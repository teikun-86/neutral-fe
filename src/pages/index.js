import travelBg from "@/assets/images/sunrise-moraine-lake-canada.jpg";
import SearchBox from "@/components/search";
import { ArrowPathIcon, BuildingOfficeIcon, CreditCardIcon, IdentificationIcon, QuestionMarkCircleIcon, ReceiptRefundIcon } from "@heroicons/react/24/outline";
import { AirplaneTakeoffIcon, TrainIcon, ShipIcon, CarIcon, TruckIcon, KaabaIcon } from "@/components/icons";
import { useRecoilState } from "recoil";
import modalState from "@/hooks/modal";
import { useRouter } from "next/router";
import { Service } from "@/components/button";
import useInViewport from "@/hooks/inviewport";
import { useRef } from "react";
import AppLayout from "@/layouts/app";
import { Destination, Tour } from "@/components/landing";
import { useLocale } from "@/hooks/locale";

export default function Home() {
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const searchboxRef = useRef(null)
    const { isInViewport } = useInViewport({refElement: searchboxRef, visible: true})
    const router = useRouter()

    const { __ } = useLocale()

    return (
        <AppLayout isInViewport={isInViewport}>
            <div className="w-full min-h-[80vh] bg-gray-400 bg-cover bg-top font-sans"
                style={{
                    backgroundImage: `url(${travelBg.src})`
                }}
            >
                <div className="w-full min-h-[80vh] bg-gradient-to-r from-black/60 to-black/60 via-black/20 flex items-center pt-16">
                    <div className="w-full block max-w-7xl mx-auto px-4">
                        <h1 className="text-center text-white text-3xl font-bold mb-3">{__('main.greeting')}</h1>
                        <div ref={searchboxRef} className="sm:w-2/3 lg:w-1/2 mx-auto">
                            <SearchBox placeholder={__('main.searchbox')} />
                        </div>
                        <div className="grid place-items-center w-full mt-6">
                            <div className="flex items-center justify-center flex-wrap">
                                <Service href="/flights" icon={<AirplaneTakeoffIcon className="w-10 h-10 text-red-600" />}>{__('nav.flight')}</Service>
                                <Service href="/hotel" icon={<BuildingOfficeIcon className="w-10 h-10 text-red-600" />}>{__('nav.hotel')}</Service>
                                <Service href="/trains" icon={<TrainIcon className="w-10 h-10 text-red-600" />}>{__('nav.train')}</Service>
                                <Service href="/pelni" icon={<ShipIcon className="w-10 h-10 text-red-600" />}>{__('nav.pelni')}</Service>
                                <Service href="/car" icon={<CarIcon className="w-10 h-10 text-red-600" />}>{__('nav.car_rent')}</Service>
                                <Service href="/cargo" icon={<TruckIcon className="w-10 h-10 text-red-600" />}>{__('nav.cargo')}</Service>
                            </div>
                            <h6 className="text-white font-semibold text-lg">{__('nav.hajj_umrah')}</h6>
                            <div className="flex items-start justify-center flex-wrap mt-4">
                                <Service onClick={(e) => {
                                    e.preventDefault()
                                    setModalOpen('landArrangementModal')
                                }} icon={<KaabaIcon className="w-10 h-10 text-red-600" />}>{__('nav.land_arrangement')}</Service>
                                <Service href="/hajj-and-umrah/flight" icon={<AirplaneTakeoffIcon className="w-10 h-10 text-red-600" />}>{__('nav.flight')}</Service>
                                <Service href="/hajj-and-umrah/pay-later" icon={<CreditCardIcon className="w-10 h-10 text-red-600" />}>{__('nav.pay_later')}</Service>
                                <Service href="/hajj-and-umrah/visa" icon={<IdentificationIcon className="w-10 h-10 text-red-600" />}>{__('nav.visa')}</Service>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-7xl mx-auto px-4 py-5">     
                <Destination />

                <Tour />
            
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Jaminan Harga Termurah!</h2>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-2">Butuh Bantuan? Cek Informasi Berikut!</h2>

                <div className="flex w-full justify-center items-center flex-wrap">
                    <div className="w-1/2 sm:w-1/3 lg:w-1/4 p-2 sm:p-3">
                        <div className="w-full p-1 py-3 sm:p-3 rounded-lg bg-white dark:bg-gray-900 shadow hover:shadow-lg transition duration-300 grid place-items-center min-h-[10rem] lg:min-h-0 cursor-pointer">
                            <span className="p-2 rounded-full bg-primary-50/20 dark:bg-gray-1000">
                                <QuestionMarkCircleIcon className="w-10 h-10 text-primary-600" />
                            </span>
                            <h5 className="text-lg font-semibold text-gray-900 dark:text-white text-center">Info Perjalanan Saat PPKM</h5>
                        </div>
                    </div>
                    <div className="w-1/2 sm:w-1/3 lg:w-1/4 p-2 sm:p-3">
                        <div className="w-full p-1 py-3 sm:p-3 rounded-lg bg-white dark:bg-gray-900 shadow hover:shadow-lg transition duration-300 grid place-items-center min-h-[10rem] lg:min-h-0 cursor-pointer">
                            <span className="p-2 rounded-full bg-primary-50/20 dark:bg-gray-1000">
                                <ReceiptRefundIcon className="w-10 h-10 text-primary-600" />
                            </span>
                            <h5 className="text-lg font-semibold text-gray-900 dark:text-white text-center">Refund Pesawat</h5>
                        </div>
                    </div>
                    <div className="w-1/2 sm:w-1/3 lg:w-1/4 p-2 sm:p-3">
                        <div className="w-full p-1 py-3 sm:p-3 rounded-lg bg-white dark:bg-gray-900 shadow hover:shadow-lg transition duration-300 grid place-items-center min-h-[10rem] lg:min-h-0 cursor-pointer">
                            <span className="p-2 rounded-full bg-primary-50/20 dark:bg-gray-1000">
                                <ArrowPathIcon className="w-10 h-10 text-primary-600" />
                            </span>
                            <h5 className="text-lg font-semibold text-gray-900 dark:text-white text-center">Reschedule Pesawat</h5>
                        </div>
                    </div>
                    <div className="w-1/2 sm:w-1/3 lg:w-1/4 p-2 sm:p-3">
                        <div className="w-full p-1 py-3 sm:p-3 rounded-lg bg-white dark:bg-gray-900 shadow hover:shadow-lg transition duration-300 grid place-items-center min-h-[10rem] lg:min-h-0 cursor-pointer">
                            <span className="p-2 rounded-full bg-primary-50/20 dark:bg-gray-1000">
                                <ReceiptRefundIcon className="w-10 h-10 text-primary-600" />
                            </span>
                            <h5 className="text-lg font-semibold text-gray-900 dark:text-white text-center">Refund Hotel</h5>
                        </div>
                    </div>
                    <div className="w-1/2 sm:w-1/3 lg:w-1/4 p-2 sm:p-3">
                        <div className="w-full p-1 py-3 sm:p-3 rounded-lg bg-white dark:bg-gray-900 shadow hover:shadow-lg transition duration-300 grid place-items-center min-h-[10rem] lg:min-h-0 cursor-pointer">
                            <span className="p-2 rounded-full bg-primary-50/20 dark:bg-gray-1000">
                                <ArrowPathIcon className="w-10 h-10 text-primary-600" />
                            </span>
                            <h5 className="text-lg font-semibold text-gray-900 dark:text-white text-center">Reschedule Hotel</h5>
                        </div>
                    </div>
                    <div className="w-1/2 sm:w-1/3 lg:w-1/4 p-2 sm:p-3">
                        <div className="w-full p-1 py-3 sm:p-3 rounded-lg bg-white dark:bg-gray-900 shadow hover:shadow-lg transition duration-300 grid place-items-center min-h-[10rem] lg:min-h-0 cursor-pointer">
                            <span className="p-2 rounded-full bg-primary-50/20 dark:bg-gray-1000">
                                <QuestionMarkCircleIcon className="w-10 h-10 text-primary-600" />
                            </span>
                            <h5 className="text-lg font-semibold text-gray-900 dark:text-white text-center">Pusat Bantuan</h5>
                        </div>
                    </div>
                </div>

            </div>
        </AppLayout>
    )
}
