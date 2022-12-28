import Footer from "@/components/footer";
import { Modal } from "@/components/modal";
import { GlobalNavbar, Navbar } from "@/components/navbar";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import daralhijrahLogo from "@/assets/images/daralhijrah-logo.png";
import almadinahLogo from "@/assets/images/almadinah-logo.png";
import { useRecoilState } from "recoil";
import modalState from "@/hooks/modal";

const AppLayout = props => {
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const router = useRouter()
    
    return (
        <>
            <Head>
                <title>{props.title ?? "Neutral ー Your Best Travel Companion"}</title>
            </Head>
            <div className="w-full min-h-screen bg-gray-50 p-0 m-0 antialiased">
                {
                    router.pathname === '/'
                    ?   <Navbar fixed={props.fixed ?? true} isInViewport={props.isInViewport ?? null} />
                    :   <GlobalNavbar />
                }

                {props.children}
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
            <Footer />
        </>
    );
};

export default AppLayout;