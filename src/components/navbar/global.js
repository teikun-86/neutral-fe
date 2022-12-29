import { Bars3BottomRightIcon, CreditCardIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect, useState } from "react";
import { NavLink, ResponsiveNavbar, UnderlinedLink } from "@/components/navbar";
import { searchString } from "@/util";
import { Dropdown } from "../dropdown";
import { useRecoilState } from "recoil";
import modalState from "@/hooks/modal";
import { AirplaneTakeoffIcon, KaabaIcon } from "../icons";
import drawerState from "@/hooks/drawer";

export const GlobalNavbar = () => {
    const [showSidebar, setShowSidebar] = useState(false)
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [drawerOpen, setDrawerOpen] = useRecoilState(drawerState)
    const router = useRouter()

    const onResize = useCallback(() => {
        if (window.innerWidth >= 768) {
            closeDrawer()
        }
    }, [])

    const openDrawer = () => {
        setDrawerOpen('responsiveNavDrawer')
    }

    const closeDrawer = () => {
        setDrawerOpen('')
    }

    const toggleSidebar = () => {
        if (showSidebar === false) {
            openDrawer()
        } else {
            closeDrawer()
        }
    }

    useEffect(() => {
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [onResize])

    return (
        <header className="w-full relative">
            <div className={`w-full z-30`}>
                <div className="relative w-full h-full">
                    <div className={`w-full bg-white h-16 md:h-auto shadow-lg relative transition-colors duration-300`}>
                        <div className="flex items-center justify-between w-full max-w-7xl px-4 mx-auto h-full">
                            <Link className="text-3xl md:text-4xl font-bold text-rose-600" href="/">Neutral</Link>
                            <div className="w-full h-16 justify-end items-center space-x-3 hidden md:flex">
                                <NavLink className="text-gray-700 hocus:text-gray-900" href="#elite-rewards">
                                    Elite Rewards
                                </NavLink>
                                <NavLink className="text-gray-700 hocus:text-gray-900" href="#check-order">
                                    Cek Order
                                </NavLink>
                                <NavLink className="text-gray-700 hocus:text-gray-900" href="#sign-in">
                                    Masuk
                                </NavLink>
                                <Link href="#register" className="btn-rose">Daftar</Link>
                            </div>
                            <button onClick={toggleSidebar} className="text-rose-600 p-2 rounded-full hocus:bg-white/20 focus:outline-none md:hidden transition-all duration-200 ring-0 outline-none">
                                <Bars3BottomRightIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="max-w-7xl w-full mx-auto px-4">
                            <div className="items-center justify-end space-x-3 hidden md:flex h-12">
                                <UnderlinedLink active={searchString('/flights', router.pathname)} href="/flights">Pesawat</UnderlinedLink>
                                <UnderlinedLink active={router.pathname === '/hotel'} href="/hotel">Hotel</UnderlinedLink>
                                <UnderlinedLink active={router.pathname === '/trains'} href="/trains">Kereta Api</UnderlinedLink>
                                <UnderlinedLink active={router.pathname === '/pelni'} href="/pelni">Pelni</UnderlinedLink>
                                <UnderlinedLink active={router.pathname === '/rent-car'} href="/rent-car">Sewa Mobil</UnderlinedLink>
                                <UnderlinedLink active={router.pathname === '/cargo'} href="/cargo">Cargo</UnderlinedLink>
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
            </div>

            <ResponsiveNavbar />
        </header>
    );
};