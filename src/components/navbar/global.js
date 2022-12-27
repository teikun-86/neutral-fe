import { Transition } from "@headlessui/react";
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { NavLink, ResponsiveLink, UnderlinedLink } from "@/components/navbar";
import SearchBox from "../search";

export const GlobalNavbar = () => {
    const [showSidebar, setShowSidebar] = useState(false)
    const router = useRouter()

    const onResize = useCallback(() => {
        if (window.innerWidth >= 768) {
            closeSidebar()
        }
    }, [])

    const openSidebar = () => {
        setShowSidebar(true)
        document.body.classList.add("!overflow-y-hidden")
    }

    const closeSidebar = () => {
        setShowSidebar(false)
        document.body.classList.remove("!overflow-y-hidden")
    }

    const toggleSidebar = () => {
        if (showSidebar === false) {
            openSidebar()
        } else {
            closeSidebar()
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
            <div className={`w-full ${showSidebar ? "fixed top-0" : ""} z-30`}>
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
                                <UnderlinedLink active={router.pathname === '/flights'} href="/flights">Pesawat</UnderlinedLink>
                                <UnderlinedLink active={router.pathname === '/hotel'} href="/hotel">Hotel</UnderlinedLink>
                                <UnderlinedLink active={router.pathname === '/trains'} href="/trains">Kereta Api</UnderlinedLink>
                                <UnderlinedLink active={router.pathname === '/pelni'} href="/pelni">Pelni</UnderlinedLink>
                                <UnderlinedLink active={router.pathname === '/rent-car'} href="/rent-car">Sewa Mobil</UnderlinedLink>
                                <UnderlinedLink active={router.pathname === '/cargo'} href="/cargo">Cargo</UnderlinedLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Transition className="w-full h-screen fixed inset-0 z-20" show={showSidebar}>
                <Transition.Child onClick={closeSidebar} className="w-full h-full bg-black/80 backdrop-blur-sm"
                    enter="transition-all duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    leave="transition-all duration-300"
                ></Transition.Child>
                <Transition.Child
                    className="w-[80%] h-screen absolute inset-0 bg-white pt-16"
                    enter="transition-all duration-300"
                    enterFrom="opacity-0 -left-12"
                    enterTo="opacity-100 left-0"
                    leaveFrom="opacity-100 left-0"
                    leaveTo="opacity-0 -left-12"
                    leave="transition-all duration-300"
                >
                    <div className="w-full block bg-white shadow my-1 py-1">
                        <SearchBox />
                    </div>
                    <div className="w-full my-3 h-[90%] py-3 overflow-y-auto overflow-x-hidden block relative gray-scrollbar">
                        <nav className="w-full block">
                            <ResponsiveLink href="#elite-rewards">Elite Rewards</ResponsiveLink>
                            <ResponsiveLink href="#elite-rewards">Cek Order</ResponsiveLink>
                            <ResponsiveLink href="#login">Masuk</ResponsiveLink>
                            <ResponsiveLink href="#register">Daftar</ResponsiveLink>
                            <ResponsiveLink active={router.pathname === '/flights'} href="/flights">Pesawat</ResponsiveLink>
                            <ResponsiveLink active={router.pathname === '/hotel'} href="/hotel">Hotel</ResponsiveLink>
                            <ResponsiveLink active={router.pathname === '/trains'} href="/trains">Kereta Api</ResponsiveLink>
                            <ResponsiveLink active={router.pathname === '/pelni'} href="/pelni">Pelni</ResponsiveLink>
                            <ResponsiveLink active={router.pathname === '/rent-car'} href="/rent-car">Sewa Mobil</ResponsiveLink>
                            <ResponsiveLink active={router.pathname === '/cargo'} href="/cargo">Cargo</ResponsiveLink>
                        </nav>
                    </div>
                </Transition.Child>
            </Transition>
        </header>
    );
};