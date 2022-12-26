import travelBg from "@/assets/images/tokyo-tower.jpg";
import SearchBox from "@/components/search";
import { ArrowPathIcon, BuildingOfficeIcon, CreditCardIcon, HeartIcon, IdentificationIcon, QuestionMarkCircleIcon, ReceiptRefundIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AirplaneTakeoffIcon, TrainIcon, ShipIcon, CarIcon, TruckIcon, KaabaIcon } from "@/components/icons";
import Modal from "@/components/modal";
import { useRecoilState } from "recoil";
import modalState from "@/hooks/modal";
import daralhijrahLogo from "@/assets/images/daralhijrah-logo.png";
import almadinahLogo from "@/assets/images/almadinah-logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { Service } from "@/components/button";
import useInViewport from "@/hooks/inviewport";
import { useRef } from "react";
import AppLayout from "@/layouts/app";

export default function Home() {
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const searchboxRef = useRef(null)
    const { isInViewport } = useInViewport({refElement: searchboxRef, visible: true})
    const router = useRouter()

    return (
        <AppLayout isInViewport={isInViewport}>
            <div className="w-full min-h-[90vh] bg-gray-400 bg-cover bg-top font-sans"
                style={{
                    backgroundImage: `url(${travelBg.src})`
                }}
            >
                <div className="w-full min-h-[90vh] bg-gradient-to-r from-black/60 to-black/60 via-black/20 flex items-center pt-16">
                    <div className="w-full block max-w-7xl mx-auto px-4">
                        <h1 className="text-center text-white text-3xl font-bold mb-3">Jalan-jalan kemana nih?</h1>
                        <div ref={searchboxRef} className="sm:w-2/3 lg:w-1/2 mx-auto">
                            <SearchBox />
                        </div>
                        <div className="grid place-items-center w-full mt-6">
                            <div className="flex items-center justify-center flex-wrap">
                                <Service onClick={() => router.push('/flights')} icon={<AirplaneTakeoffIcon className="w-10 h-10 text-red-600" />}>Pesawat</Service>
                                <Service onClick={() => router.push('/hotel')} icon={<BuildingOfficeIcon className="w-10 h-10 text-red-600" />}>Hotel</Service>
                                <Service onClick={() => router.push('/trains')} icon={<TrainIcon className="w-10 h-10 text-red-600" />}>Kereta Api</Service>
                                <Service onClick={() => router.push('/pelni')} icon={<ShipIcon className="w-10 h-10 text-red-600" />}>Pelni</Service>
                                <Service onClick={() => router.push('/car')} icon={<CarIcon className="w-10 h-10 text-red-600" />}>Sewa Mobil</Service>
                                <Service onClick={() => router.push('/cargo')} icon={<TruckIcon className="w-10 h-10 text-red-600" />}>Cargo</Service>
                            </div>
                            <h6 className="text-white font-semibold text-lg mt-2">Haji & Umrah</h6>
                            <div className="flex items-start justify-center flex-wrap">
                                <Service onClick={() => setModalOpen('landArrangementModal')} icon={<KaabaIcon className="w-10 h-10 text-red-600" />}>Land<br/>Arrangement</Service>
                                <Service onClick={() => router.push('/flights')} icon={<AirplaneTakeoffIcon className="w-10 h-10 text-red-600" />}>Pesawat</Service>
                                <Service onClick={() => router.push('/pay-later')} icon={<CreditCardIcon className="w-10 h-10 text-red-600" />}>Pay Later</Service>
                                <Service onClick={() => router.push('/visa')} icon={<IdentificationIcon className="w-10 h-10 text-red-600" />}>Visa</Service>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-7xl mx-auto px-4">
                
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

            <Modal size="md" id="landArrangementModal">
                <Modal.Header>
                    <h3 className="text-xl font-semibold text-gray-900">Land Arrangement</h3>
                    <button onClick={() => setModalOpen('')} className="absolute top-3 right-3 focus:outline-none outline-none text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:bg-gray-100 transition-all duration-200 p-2 rounded-full"><XMarkIcon className="w-5 h-5 hover:shadow-sm focus:shadow-sm" /></button>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-center text-gray-700 mb-3 text-sm">Pilih Land Arrangement</p>
                    <div className="flex items-center justify-center w-full h-full space-x-3">
                        <a onClick={(e) => {
                            setModalOpen('')
                        }} href="https://almadinah.co.id/transaksi/land-arrangement" className="flex items-center justify-center flex-col w-32 rounded-lg hover:bg-gray-100 focus:bg-gray-200 transition-all duration-200 outline-none focus:outline-none ring-0 focus:ring-0 px-2 py-2" target="_blank" rel="noopener noreferrer">
                            <div className="w-full h-24 grid place-items-center">
                                <Image alt="Almadinah LA" src={almadinahLogo} className="w-full h-auto" />
                            </div>
                            <span className="text-gray-700 font-semibold text-lg">Al Madinah</span>
                        </a>
                        <a onClick={(e) => {
                            setModalOpen('')
                        }} href="https://daralhijrah.co.id/transaksi/land-arrangement" className="flex items-center justify-center flex-col w-32 rounded-lg hover:bg-gray-100 focus:bg-gray-200 transition-all duration-200 outline-none focus:outline-none ring-0 focus:ring-0 px-2 py-2" target="_blank" rel="noopener noreferrer">
                            <div className="w-full h-24 grid place-items-center">
                                <Image alt="Dar Al-Hijrah LA" src={daralhijrahLogo} className="w-full h-auto" />
                            </div>
                            <span className="text-gray-700 font-semibold text-lg">Dar Al-Hijrah</span>
                        </a>
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex items-center justify-end space-x-3">
                    <button className="btn-rose" onClick={() => setModalOpen('')}>Cancel</button>
                </Modal.Footer>
            </Modal>
        </AppLayout>
    )
}
