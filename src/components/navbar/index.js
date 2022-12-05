import Link from "next/link";
import { useEffect, useState } from "react";
import NavLink from "./link";

const Navbar = () => {
    const [bgActive, setBgActive] = useState(false)

    const onScroll = () => {
        setBgActive(window.scrollY >= 100)
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [])
    
    return (
        <header className="w-full relative">
            <div className={`w-full h-16 ${bgActive ? "bg-primary-600" : "bg-transparent"} z-10 fixed top-0 transition-colors duration-300`}>
                <div className="w-full max-w-7xl mx-auto h-full flex items-center justify-between px-4">
                    <Link className="text-3xl font-bold text-white" href="/">Neutral</Link>
                    <div className="flex h-full justify-end items-center space-x-3">
                        <NavLink href="#elite-rewards" className="hidden sm:flex">
                            Elite Rewards
                        </NavLink>
                        <NavLink href="#check-order" className="hidden sm:flex">
                            Cek Order
                        </NavLink>
                        <NavLink href="#sign-in">
                            Masuk
                        </NavLink>
                        <Link href="#register" className="px-3 py-2 rounded-lg grid place-items-center bg-primary-500 text-white hover:bg-primary-700 focus:bg-primary-700 transition-all duraiton-200">Daftar</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;