import { Transition } from "@headlessui/react";
import { ArrowLeftOnRectangleIcon, Bars3BottomRightIcon, ChevronDownIcon, CreditCardIcon, IdentificationIcon, UserIcon } from "@heroicons/react/24/outline";
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
import { searchString, truncateString } from "@/util";
import drawerState from "@/hooks/drawer";
import Image from "next/image";

export const Navbar = ({ isInViewport = null, fixed = true, user = null, logout = () => {} }) => {
    const [showNavbar, setBgActive] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [drawerOpen, setDrawerOpen] = useRecoilState(drawerState)
    
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
        setDrawerOpen('responsiveNavDrawer')
    }

    const closeSidebar = () => {
        setDrawerOpen('')
    }

    const toggleSidebar = () => {
        if (showSidebar === false) {
            openSidebar()
        } else {
            closeSidebar()
        }
    }
    
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
                    {
                        user && user.email_verified_at === null && (
                            <div className="w-full bg-rose-900 p-2">
                                <div className="max-w-7xl w-full mx-auto">
                                    <p className="text-white text-sm text-center">Email verifikasi telah dikirim ke alamat email anda. Verifikasi email anda segera!</p>
                                </div>
                            </div>
                        )
                    }
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
                                {
                                    !user ? (
                                        <>
                                            <NavLink className={`${showNavbar ? "text-gray-700 hocus:text-gray-900" : ""}`} href="/auth/login">
                                                Masuk
                                            </NavLink>
                                            <Link href="/auth/register" className="btn-rose">Daftar</Link>
                                        </>
                                    )
                                    : (
                                        <Dropdown>
                                            {({open}) => (
                                                <>
                                                    <Dropdown.Button className={`btn-text px-2 py-1 group select-none ${showNavbar ? "text-gray-700 hocus:text-gray-900" : ""}`}>
                                                        <Image className="w-6 h-6 mr-2 rounded-full" src={user.avatar} alt={user.name} width={100} height={100} />
                                                        <span className="text-sm font-medium">{truncateString(user.name, 12)}</span>
                                                        <ChevronDownIcon className={`w-5 h-5 ml-2 ${open ? "rotate-180" : ""} transition-all duration-200`} />
                                                    </Dropdown.Button>
                                                    <Dropdown.Content>
                                                        <Link className="w-full flex my-2 px-2 py-1" href="/@me">
                                                            <div className="w-1/4 grid place-items-center">
                                                                <Image className="w-12 h-12 object-cover rounded-full" src={user.avatar} alt={user.name} width={100} height={100} />
                                                            </div>
                                                            <div className="w-3/4 px-2 py-2">
                                                                <p className="text-sm font-medium truncate">{user.name}</p>
                                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                                            </div>
                                                        </Link>
                                                        <Dropdown.Item onClick={logout} className="flex items-center justify-start">
                                                            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
                                                            Log out
                                                        </Dropdown.Item>
                                                    </Dropdown.Content>
                                                </>
                                            )}
                                        </Dropdown>
                                    )
                                }
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