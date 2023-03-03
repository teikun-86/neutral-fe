import Footer from "@/components/footer";
import { Drawer, Modal } from "@/components/modal";
import { GlobalNavbar, Navbar, ResponsiveLink } from "@/components/navbar";
import { ArrowUpIcon, Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import daralhijrahLogo from "@/assets/images/daralhijrah-logo.png";
import almadinahLogo from "@/assets/images/almadinah-logo.png";
import { useRecoilState } from "recoil";
import modalState from "@/hooks/modal";
import drawerState from "@/hooks/drawer";
import { useNetwork } from "@/hooks/network";
import { AirplaneTakeoffIcon, ThreeDots, WifiOffIcon } from "@/components/icons";
import { Transition } from "@headlessui/react";
import { useViewport } from "@/hooks/viewport";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";
import { useLocale } from "@/hooks/locale";
import { ToastContainer } from "react-toastify";
import Sidebar from "@/components/sidebar";
import Link from "next/link";

const HajjUmrahLayout = props => {
    const [modalOpen, setModalOpen] = useRecoilState(modalState)
    const [drawerOpen, setDrawerOpen] = useRecoilState(drawerState)
    const router = useRouter()
    const { __ } = useLocale()
    const [showBtn, setShowBtn] = useState(false)
    const [theme, setTheme] = useState("light")
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const { width } = useViewport({
        onScroll: (result) => {
            setShowBtn(result.y > 100)
        },
        onResize: () => {
            setSidebarOpen(open => window.width > 768 && open ? true : false)
        }
    })

    const { user, logout, authenticating } = useAuth({
        middleware: 'auth',
        userType: ['agent', 'company']
    })

    const { online } = useNetwork({
        onOnline: () => {
            setDrawerOpen('')
            setModalOpen('')
        },
        onOfline: () => {
            if (width < 768) {
                setDrawerOpen('offlineDrawer')
            }
        }
    })

    const { showGoToTopButton = true } = props

    const goToTop = () => {
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
            setTheme('dark')
        } else {
            document.documentElement.classList.remove('dark')
            setTheme('light')
        }
    }, [])

    return (
        <>
            <Head>
                <title>{props.title ?? `${process.env.NEXT_PUBLIC_APP_NAME} ー ${process.env.NEXT_PUBLIC_APP_SLOGAN}`}</title>
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`} />
                <link rel="alternate" hrefLang="en" href={`${process.env.NEXT_PUBLIC_BASE_URL}/en${router.asPath}`} />
                <link rel="alternate" hrefLang="id" href={`${process.env.NEXT_PUBLIC_BASE_URL}/id${router.asPath}`} />
                <link rel="alternate" hrefLang="jp" href={`${process.env.NEXT_PUBLIC_BASE_URL}/jp${router.asPath}`} />
            </Head>
            <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-1000 p-0 m-0 antialiased">
                <Transition show={!online}
                    as="div"
                    className="fixed top-0 w-full z-[1000]"
                    enter="transition duration-300"
                    enterFrom="-translate-y-5"
                    enterTo="translate-y-0"
                    leave="transition duration-300"
                    leaveFrom="translate-y-0"
                    leaveTo="-translate-y-5"
                >
                    <div className="w-full px-2 py-2 bg-rose-600 flex items-center justify-start">
                        <WifiOffIcon className="w-4 h-4 text-white mr-4" />
                        <p className="text-center text-white text-sm">{__('state.offline.status')}</p>
                    </div>
                </Transition>
                <GlobalNavbar user={user} logout={logout} />
                <div className="w-full relative flex">
                    <div className="hidden md:block md:w-1/4 lg:w-1/5">
                        <div className="flex-1 sticky top-0 h-screen self-start">
                            <Sidebar showLogo={showBtn} user={user} logout={logout} />
                        </div>
                    </div>
                    <div className="w-full md:w-3/4 lg:w-4/5">
                        <div className="md:p-6">{props.children}</div>
                    </div>
                </div>
            </div>
            <button onClick={() => setDrawerOpen('hajjUmrahDrawer')} className={`md:!hidden fixed ${showBtn && showGoToTopButton ? "bottom-16" : "bottom-4"} !transition !duration-200 right-3 btn-light dark:btn-dark !rounded-full !p-2 items-start`}>
                <Bars3BottomRightIcon className="w-6 h-6 mr-2" />
                Menu
            </button>

            <Transition
                show={showGoToTopButton && showBtn}
                enter="transition duration-200"
                enterFrom="opacity-0 translate-y-10"
                enterTo="opacity-100 translate-y-0"
                leave="transition duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-10"
                className="fixed bottom-3 right-3"
            >
                <button onClick={goToTop} className="btn-light dark:btn-dark !rounded-full !p-2">
                    <ArrowUpIcon className="w-6 h-6" />
                </button>
            </Transition>

            <Modal size="md" id="landArrangementModal">
                <Modal.Header>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{__('nav.land_arrangement')}</h3>
                    <button onClick={() => setModalOpen('')} className="absolute top-3 right-3 focus:outline-none outline-none text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hocus:bg-gray-800 focus:bg-gray-100 transition-all duration-200 p-2 rounded-full"><XMarkIcon className="w-5 h-5 hover:shadow-sm focus:shadow-sm" /></button>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-center text-gray-700 dark:text-gray-300 mb-3 text-sm">{__('main.select_land_arrangement')}</p>
                    <div className="flex items-center justify-center w-full h-full space-x-3">
                        <a onClick={(e) => {
                            setModalOpen('')
                        }} href="https://almadinah.co.id/transaksi/land-arrangement" className="flex items-center justify-center flex-col w-32 rounded-lg hover:bg-gray-100 dark:hocus:bg-gray-800 focus:bg-gray-200 transition-all duration-200 outline-none focus:outline-none ring-0 focus:ring-0 px-2 py-2" target="_blank" rel="noopener noreferrer">
                            <div className="w-full h-24 grid place-items-center">
                                <Image alt="Almadinah LA" src={almadinahLogo} className="w-full h-auto" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 font-semibold text-lg">Al Madinah</span>
                        </a>
                        <a onClick={(e) => {
                            setModalOpen('')
                        }} href="https://daralhijrah.co.id/transaksi/land-arrangement" className="flex items-center justify-center flex-col w-32 rounded-lg hover:bg-gray-100 dark:hocus:bg-gray-800 focus:bg-gray-200 transition-all duration-200 outline-none focus:outline-none ring-0 focus:ring-0 px-2 py-2" target="_blank" rel="noopener noreferrer">
                            <div className="w-full h-24 grid place-items-center">
                                <Image alt="Dar Al-Hijrah LA" src={daralhijrahLogo} className="w-full h-auto" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 font-semibold text-lg">Dar Al-Hijrah</span>
                        </a>
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex items-center justify-end space-x-3">
                    <button className="btn-rose" onClick={() => setModalOpen('')}>{__('command.cancel')}</button>
                </Modal.Footer>
            </Modal>
            <Drawer id="landArrangementDrawer" afterClose={() => {
                setDrawerOpen('responsiveNavDrawer')
            }}>
                <Drawer.Header>
                    <h4 className="text-xl w-2/3 mx-auto font-bold text-gray-900 dark:text-white text-center mb-3">{__('main.select_land_arrangement')}</h4>
                </Drawer.Header>
                <Drawer.Body className="!min-h-[45vh]">
                    <div className="flex items-center justify-center w-full h-full space-x-3">
                        <a href="https://almadinah.co.id/transaksi/land-arrangement" className="flex items-center justify-center flex-col w-1/2 rounded-lg hover:bg-gray-100 dark:hocus:bg-gray-800 focus:bg-gray-200 transition-all duration-200 outline-none focus:outline-none ring-0 focus:ring-0 px-2 py-2" target="_blank" rel="noopener noreferrer">
                            <div className="w-full h-36 grid place-items-center">
                                <Image alt="Almadinah LA" src={almadinahLogo} className="w-32 h-auto" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 font-semibold text-lg">Al Madinah</span>
                        </a>
                        <a href="https://daralhijrah.co.id/transaksi/land-arrangement" className="flex items-center justify-center flex-col w-1/2 rounded-lg hover:bg-gray-100 dark:hocus:bg-gray-800 focus:bg-gray-200 transition-all duration-200 outline-none focus:outline-none ring-0 focus:ring-0 px-2 py-2" target="_blank" rel="noopener noreferrer">
                            <div className="w-full h-36 grid place-items-center">
                                <Image alt="Dar Al-Hijrah LA" src={daralhijrahLogo} className="w-auto h-32" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 font-semibold text-lg">Dar Al-Hijrah</span>
                        </a>
                    </div>
                </Drawer.Body>
            </Drawer>
            <Drawer id="offlineDrawer">
                <Drawer.Header>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3">{__('state.offline.status')}</h4>
                </Drawer.Header>
                <Drawer.Body>
                    <div className="grid place-items-center">
                        <WifiOffIcon className="w-32 h-32 mb-4 text-rose-600" />
                        <h5 className="text-base font-semibold text-gray-900 dark:text-white text-center">{__('state.offline.title')}</h5>
                        <p className="text-center text-sm font-normal text-gray-800 dark:text-gray-100">{__('state.offline.desc')}</p>
                    </div>
                </Drawer.Body>
                <Drawer.Footer>
                    <button onClick={() => router.reload()} className="btn-rose w-full my-2">{__('command.reload')}</button>
                </Drawer.Footer>
            </Drawer>
            <Drawer id="hajjUmrahDrawer">
                <Drawer.Header>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3">{__('nav.hajj_umrah')}</h4>
                </Drawer.Header>
                <Drawer.Body className="min-h-[60vh]">
                    <div className="space-y-1">
                        <h6 className="text-gray-900 dark:text-white py-2 font-semibold text-base mx-4 flex items-center justify-start">
                            <AirplaneTakeoffIcon className="w-6 h6 mr-2 text-rose-600" />
                            {__('nav.flight')}
                        </h6>
                        <ResponsiveLink href="/hajj-and-umrah/flight">
                            Flight
                        </ResponsiveLink>
                        <ResponsiveLink href="/hajj-and-umrah/pool">
                            Pool
                        </ResponsiveLink>
                    </div>
                </Drawer.Body>
            </Drawer>
            <Footer />
            <ToastContainer theme={theme} />
        </>
    );
};

export default HajjUmrahLayout;