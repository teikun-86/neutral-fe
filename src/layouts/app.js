import Footer from "@/components/footer";
import { Drawer, Modal } from "@/components/modal";
import { GlobalNavbar, Navbar } from "@/components/navbar";
import { ArrowLeftIcon, ArrowUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import daralhijrahLogo from "@/assets/images/daralhijrah-logo.png";
import almadinahLogo from "@/assets/images/almadinah-logo.png";
import { useRecoilState } from "recoil";
import modalState from "@/hooks/modal";
import drawerState from "@/hooks/drawer";
import { useNetwork } from "@/hooks/network";
import { WifiOffIcon } from "@/components/icons";
import { Transition } from "@headlessui/react";
import { useViewport } from "@/hooks/viewport";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";
import { useLocale } from "@/hooks/locale";
import { toast, ToastContainer } from "react-toastify";

const AppLayout = props => {
    const [modalOpen, setModalOpen] = useRecoilState(modalState)
    const [drawerOpen, setDrawerOpen] = useRecoilState(drawerState)
    const router = useRouter()
    const { __ } = useLocale()
    const [showBtn, setShowBtn] = useState(false)
    const [theme, setTheme] = useState("light")
    const { width } = useViewport({
        onScroll: (result) => {
            setShowBtn(result.y > 100)
        }
    })

    const { user, socialLogin, logout } = useAuth()

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

    const { showGoToTopButton } = props

    const goToTop = () => {
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: "smooth"
        })
    }
    
    useEffect(() => {
        const query = router.query
        if (query?.social && query?.user_id) {
            toast.promise(socialLogin(query.social, query.user_id), {
                pending: __('auth.logging_in'),
                success: __('auth.logged_in'),
                error: __('auth.login_failed')
            })
            router.push(router.pathname)
        }

        if (query?.verified) {
            toast.success(__('auth.verified'))
            router.push(router.pathname)
        }
    }, [router.query]);

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
                    className="fixed top-0 w-full z-50"
                    enter="transition duration-300"
                    enterFrom="-translate-y-5"
                    enterTo="translate-y-0"
                    leave="transition duration-300"
                    leaveFrom="translate-y-0"
                    leaveTo="-translate-y-5"
                >
                    <div className="w-full px-2 py-2 bg-rose-600 flex items-center justify-start">
                        <WifiOffIcon className="w-4 h-4 text-white mr-4" />
                        <p className="text-center text-white text-sm">Kamu sedang offline.</p>
                    </div>
                </Transition>
                {
                    router.pathname === '/'
                    ?   <Navbar user={user} logout={logout} fixed={props.fixed ?? true} isInViewport={props.isInViewport ?? null} />
                    :   <GlobalNavbar user={user} logout={logout} stickyOnScroll={props.stickyOnScroll ?? false} />
                }

                {props.children}
            </div>

            {
                showGoToTopButton && showBtn && (
                    <button onClick={goToTop} className="btn-rose rounded-full p-2 fixed bottom-3 right-3 opacity-80 hocus:opacity-100">
                        <ArrowUpIcon className="w-6 h-6" />
                    </button>
                )
            }

            <Modal size="md" id="landArrangementModal">
                <Modal.Header>
                    <h3 className="text-xl font-semibold text-gray-900">{__('nav.land_arrangement')}</h3>
                    <button onClick={() => setModalOpen('')} className="absolute top-3 right-3 focus:outline-none outline-none text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:bg-gray-100 transition-all duration-200 p-2 rounded-full"><XMarkIcon className="w-5 h-5 hover:shadow-sm focus:shadow-sm" /></button>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-center text-gray-700 mb-3 text-sm">{__('main.select_land_arrangement')}</p>
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
                    <button className="btn-rose" onClick={() => setModalOpen('')}>{__('command.cancel')}</button>
                </Modal.Footer>
            </Modal>
            <Drawer id="landArrangementDrawer" afterClose={() => {
                setDrawerOpen('responsiveNavDrawer')
            }}>
                <Drawer.Header>
                    <h4 className="text-xl w-2/3 mx-auto font-bold text-gray-900 text-center mb-3">{__('main.select_land_arrangement')}</h4>
                </Drawer.Header>
                <Drawer.Body className="!min-h-[45vh]">
                    <div className="flex items-center justify-center w-full h-full space-x-3">
                        <a href="https://almadinah.co.id/transaksi/land-arrangement" className="flex items-center justify-center flex-col w-1/2 rounded-lg hover:bg-gray-100 focus:bg-gray-200 transition-all duration-200 outline-none focus:outline-none ring-0 focus:ring-0 px-2 py-2" target="_blank" rel="noopener noreferrer">
                            <div className="w-full h-36 grid place-items-center">
                                <Image alt="Almadinah LA" src={almadinahLogo} className="w-32 h-auto" />
                            </div>
                            <span className="text-gray-700 font-semibold text-lg">Al Madinah</span>
                        </a>
                        <a href="https://daralhijrah.co.id/transaksi/land-arrangement" className="flex items-center justify-center flex-col w-1/2 rounded-lg hover:bg-gray-100 focus:bg-gray-200 transition-all duration-200 outline-none focus:outline-none ring-0 focus:ring-0 px-2 py-2" target="_blank" rel="noopener noreferrer">
                            <div className="w-full h-36 grid place-items-center">
                                <Image alt="Dar Al-Hijrah LA" src={daralhijrahLogo} className="w-auto h-32" />
                            </div>
                            <span className="text-gray-700 font-semibold text-lg">Dar Al-Hijrah</span>
                        </a>
                    </div>
                </Drawer.Body>
            </Drawer>
            <Drawer id="offlineDrawer">
                <Drawer.Header>
                    <h4 className="text-xl font-bold text-gray-900 text-center mb-3">{__('state.offline.status')}</h4>
                </Drawer.Header>
                <Drawer.Body>
                    <div className="grid place-items-center">
                        <WifiOffIcon className="w-32 h-32 mb-4 text-rose-600" />
                        <h5 className="text-base font-semibold text-gray-900 text-center">{__('state.offline.title')}</h5>
                        <p className="text-center text-sm font-normal text-gray-800">{__('state.offline.desc')}</p>
                    </div>
                </Drawer.Body>
                <Drawer.Footer>
                    <button onClick={() => router.reload()} className="btn-rose w-full my-2">{__('command.reload')}</button>
                </Drawer.Footer>
            </Drawer>
            <Footer />
            <ToastContainer theme={theme} />
        </>
    );
};

export default AppLayout;