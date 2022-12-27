import { Transition } from "@headlessui/react";
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import SearchBox from "../search";
import { ResponsiveLink, NavLink } from "@/components/navbar";
import { GrayButton } from "../button";
import { useRecoilState } from "recoil";
import modalState from "@/hooks/modal";
import useHorizontalScroll from "@/hooks/horizontal-scroll";
import { Dropdown } from "../dropdown";

export const Navbar = ({ isInViewport = null, fixed = true }) => {
    const verticalScrollRef = useRef(null)
    const [showNavbar, setBgActive] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)
    const [modalOpen, setModalOpen] = useRecoilState(modalState);

    const horizontalScroll = useHorizontalScroll({ ref: verticalScrollRef })
    
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
        setShowSidebar(true)
        setBgActive(true)
        document.body.classList.add("!overflow-y-hidden")
    }

    const closeSidebar = () => {
        setShowSidebar(false)
        setBgActive(active => {
            return window.scrollY >= 100
        })
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
        window.addEventListener('scroll', onScroll)
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return (
        <header className="w-full relative">
            <div className={`w-full ${showNavbar ? "fixed top-0" : "absolute top-0"} z-30`}>
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
                                <div className="w-full lg:w-1/2 px-2 py-2">
                                    <div ref={verticalScrollRef} className="w-full overflow-x-auto whitespace-nowrap justify-start flex items-center gray-scrollbar py-1 relative md:justify-end">
                                        <GrayButton className="mx-1 ml-3" as="link" href="/flights">Pesawat</GrayButton>
                                        <GrayButton className="mx-1" as="link" href="/hotel">Hotel</GrayButton>
                                        <GrayButton className="mx-1" as="link" href="/trains">Kereta Api</GrayButton>
                                        <GrayButton className="mx-1" as="link" href="/pelni">Pelni</GrayButton>
                                        <GrayButton className="mx-1" as="link" href="/rent-car">Sewa Mobil</GrayButton>
                                        <GrayButton className="mx-1" as="link" href="/cargo">Cargo</GrayButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
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
                    <div className="w-full my-3 h-[96%] overflow-y-auto overflow-x-hidden block relative">
                        <nav className="w-full block">
                            <ResponsiveLink href="#elite-rewards">Elite Rewards</ResponsiveLink>
                            <ResponsiveLink href="#elite-rewards">Cek Order</ResponsiveLink>
                            <ResponsiveLink href="#elite-rewards">Masuk</ResponsiveLink>
                            <ResponsiveLink href="#elite-rewards">Daftar</ResponsiveLink>
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