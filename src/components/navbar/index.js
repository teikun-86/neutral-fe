import useInViewport from "@/hooks/inviewport";
import { Transition } from "@headlessui/react";
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SearchBox from "../search";
import NavLink from "./link";
import ResponsiveLink from "./responsive-link";

const Navbar = ({ isInViewport = null }) => {
    const [bgActive, setBgActive] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)

    const router = useRouter()

    const onScroll = () => {
        setBgActive(window.scrollY >= 100)
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
            <div className="w-full z-10 fixed top-0">
                <div className="relative w-full h-full">
                    <div className={`w-full h-16 ${router.pathname === '/' ? (bgActive ? "bg-white shadow" : "bg-transparent") : "bg-white shadow-lg"} relative transition-colors duration-300`}>
                        <div className="flex items-center justify-between w-full max-w-7xl px-4 mx-auto h-full">
                            <Link className="text-3xl font-bold text-rose-600" href="/">Neutral</Link>
                            <div className="flex h-full justify-end items-center space-x-3 hidden md:flex">
                                <NavLink href="#elite-rewards">
                                    Elite Rewards
                                </NavLink>
                                <NavLink href="#check-order">
                                    Cek Order
                                </NavLink>
                                <NavLink href="#sign-in">
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
                        className="w-full h-14"
                        show={isInViewport === false && router.pathname === '/' && !showSidebar}
                        enter="transition-all duration-300 origin-top overflow-hidden whitespace-nowrap"
                        enterFrom="w-0 rounded-r-full"
                        enterTo="w-full rounded-r-none"
                        leave="transition-all duration-300 origin-top overflow-hidden whitespace-nowrap"
                        leaveFrom="w-full rounded-r-none opacity-100"
                        leaveTo="w-0 rounded-r-full opacity-0"
                    >
                        <div className="w-full bg-white h-full">
                            <div className="w-full max-w-7xl mx-auto px-4 py-1">
                                <SearchBox />
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
            
            <Transition className="w-full h-screen fixed inset-0" show={showSidebar}>
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
                        </nav>
                    </div>
                </Transition.Child>
            </Transition>
            
        </header>
    );
};

export default Navbar;