import { Transition } from "@headlessui/react";
import { Bars3BottomRightIcon, CreditCardIcon, IdentificationIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import SearchBox from "../search";
import { ResponsiveLink, NavLink, UnderlinedLink, ResponsiveNavbar } from "@/components/navbar";
import { useRecoilState } from "recoil";
import modalState from "@/hooks/modal";
import useHorizontalScroll from "@/hooks/horizontal-scroll";
import { Dropdown } from "../dropdown";
import { AirplaneTakeoffIcon, KaabaIcon } from "../icons";
import { searchString } from "@/util";

export const Navbar = ({ isInViewport = null, fixed = true }) => {
    const [showNavbar, setBgActive] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    
    const router = useRouter()

    const onScroll = () => {
        setBgActive(window.scrollY >= 300)
    }

    const onResize = () => {
        if (window.innerWidth >= 768) {
            closeSidebar()
        }
    }

    const openSidebar = () => {
        setModalOpen('responsiveNavDrawer')
    }

    const closeSidebar = () => {
        setModalOpen('')
    }

    const toggleSidebar = () => {
        if (showSidebar === false) {
            openSidebar()
        } else {
            closeSidebar()
        }
    }

    useEffect(() => {
        if (modalOpen === 'responsiveNavDrawer') {
            document.body.classList.add("!overflow-y-hidden")
        } else {
            document.body.classList.remove("!overflow-y-hidden")
        }
    }, [modalOpen])

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return (
        <header className="w-full relative">
            <div className={`w-full ${showNavbar ? "fixed top-0" : "absolute top-0"} z-40`}>
                <div className="relative w-full h-full">
                    <div className={`w-full h-16 z-20 ${router.pathname === '/' ? (showNavbar ? "bg-white shadow" : "bg-transparent") : "bg-white shadow-lg"} relative transition-colors duration-400`}>
                        <div className="flex items-center justify-between w-full max-w-7xl px-4 mx-auto h-full">
                            <Link className="text-3xl md:text-4xl font-bold text-rose-600" href="/">Neutral</Link>
                            <div className="h-full justify-end items-center space-x-3 hidden md:flex">
                                <NavLink className={`${showNavbar ? "text-gray-700 hocus:text-gray-900" : ""}`} href="#elite-rewards">
                                    Elite Rewards
                                </NavLink>
                                <NavLink className={`${showNavbar ? "text-gray-700 hocus:text-gray-900" : ""}`} href="#check-order">
                                    Cek Order
                                </NavLink>
                                <NavLink className={`${showNavbar ? "text-gray-700 hocus:text-gray-900" : ""}`} href="#sign-in">
                                    Masuk
                                </NavLink>
                                <Link href="#register" className="btn-rose">Daftar</Link>
                            </div>
                            <button onClick={toggleSidebar} className="text-rose-600 p-2 rounded-full hocus:bg-white/20 focus:outline-none md:hidden transition-all duration-200 ring-0 outline-none">
                                <Bars3BottomRightIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    <Transition
                        className="w-full z-10"
                        show={showNavbar && !showSidebar}
                        enter="transition-all duration-200 overflow-hidden whitespace-nowrap"
                        enterFrom="-translate-y-10 opacity-0"
                        enterTo="translate-y-0 opacity-100"
                        leave="transition-all duration-200 overflow-hidden whitespace-nowrap"
                        leaveFrom="translate-y-0 opacity-100"
                        leaveTo="-translate-y-10 opacity-0"
                    >
                        <div className="w-full bg-white shadow-md">
                            <div className="w-full max-w-7xl mx-auto px-2 h-full flex flex-wrap items-center justify-between">
                                <div className="w-full lg:w-1/2 py-2 px-2">
                                    <SearchBox />
                                </div>
                                <div className="w-full lg:w-1/2 px-2 py-2 hidden lg:block">
                                    <div className="w-full justify-start flex items-center py-1 relative md:justify-end h-14">
                                        <UnderlinedLink className="mx-1 ml-3" href="/flights">Pesawat</UnderlinedLink>
                                        <UnderlinedLink className="mx-1" href="/hotel">Hotel</UnderlinedLink>
                                        <UnderlinedLink className="mx-1" href="/trains">Kereta Api</UnderlinedLink>
                                        <UnderlinedLink className="mx-1" href="/pelni">Pelni</UnderlinedLink>
                                        <UnderlinedLink className="mx-1" href="/rent-car">Sewa Mobil</UnderlinedLink>
                                        <UnderlinedLink className="mx-1" href="/cargo">Cargo</UnderlinedLink>
                                        <Dropdown className="h-full">
                                            {({ open }) => (
                                                <>
                                                    <Dropdown.Button as="div" className="h-full">
                                                        <UnderlinedLink active={open} as="button">Haji & Umrah</UnderlinedLink>
                                                    </Dropdown.Button>
                                                    <Dropdown.Content>
                                                        <button className="w-full bg-white hocus:bg-gray-100 outline-none focus:outline-none ring-0 focus:ring-0 transition duration-200 flex items-center justify-start space-x-2 px-3 py-2 text-sm font-semibold text-gray-900 tracking-wider" onClick={() => setModalOpen('landArrangementModal')}>
                                                            <KaabaIcon className="w-5 h-5 mr-2 text-rose-500" />
                                                            Land Arrangement
                                                        </button>
                                                        <Link className="w-full bg-white hocus:bg-gray-100 outline-none focus:outline-none ring-0 focus:ring-0 transition duration-200 flex items-center justify-start space-x-2 px-3 py-2 text-sm font-semibold text-gray-900 tracking-wider" href="/flights">
                                                            <AirplaneTakeoffIcon className="w-5 h-5 mr-2 text-rose-500" />
                                                            Pesawat
                                                        </Link>
                                                        <Link className="w-full bg-white hocus:bg-gray-100 outline-none focus:outline-none ring-0 focus:ring-0 transition duration-200 flex items-center justify-start space-x-2 px-3 py-2 text-sm font-semibold text-gray-900 tracking-wider" href="/hajj-and-umrah/pay-later">
                                                            <CreditCardIcon className="w-5 h-5 mr-2 text-rose-500" />
                                                            Pay Later
                                                        </Link>
                                                        <Link className="w-full bg-white hocus:bg-gray-100 outline-none focus:outline-none ring-0 focus:ring-0 transition duration-200 flex items-center justify-start space-x-2 px-3 py-2 text-sm font-semibold text-gray-900 tracking-wider" href="/hajj-and-umrah/visa">
                                                            <IdentificationIcon className="w-5 h-5 mr-2 text-rose-500" />
                                                            VISA
                                                        </Link>
                                                    </Dropdown.Content>
                                                </>
                                            )}
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>

            <ResponsiveNavbar show={showSidebar} closeSidebar={closeSidebar} />
        </header>
    );
};