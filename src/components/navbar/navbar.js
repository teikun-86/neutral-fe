import { Transition } from "@headlessui/react";
import { ArrowLeftOnRectangleIcon, Bars3BottomRightIcon, ChevronDownIcon, ComputerDesktopIcon, CreditCardIcon, IdentificationIcon, LanguageIcon, MoonIcon, Squares2X2Icon, SunIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SearchBox from "../search";
import { NavLink, UnderlinedLink, ResponsiveNavbar } from "@/components/navbar";
import { useRecoilState } from "recoil";
import modalState from "@/hooks/modal";
import { Dropdown } from "../dropdown";
import { AirplaneTakeoffIcon, KaabaIcon } from "../icons";
import { setTheme, truncateString } from "@/util";
import drawerState from "@/hooks/drawer";
import Image from "next/image";
import { useLocale } from "@/hooks/locale";

import logo from "@/assets/images/tripla-logo.png";

export const Navbar = ({ isInViewport = null, fixed = true, user = null, logout = () => { } }) => {
    const [showNavbar, setBgActive] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [drawerOpen, setDrawerOpen] = useRecoilState(drawerState)
    
    const router = useRouter()

    const { __, locale, localeMap } = useLocale()

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
                    <div className={`w-full h-16 z-20 ${showNavbar ? "bg-white dark:bg-gray-900 shadow" : "bg-transparent"} relative transition-colors duration-400`}>
                        <div className="flex items-center justify-between w-full max-w-7xl px-4 mx-auto h-full">
                            <Link className="py-2" href="/">
                                <Image alt={process.env.NEXT_PUBLIC_APP_NAME} src={logo} className="h-14 w-auto" />
                            </Link>
                            <div className="flex items-center justify-end">
                                <Dropdown>
                                    <Dropdown.Button className="btn-text text-rose-600 px-2 py-1">
                                        <LanguageIcon className="w-5 h-5" />
                                    </Dropdown.Button>
                                    <Dropdown.Content>
                                        {
                                            localeMap && Object.keys(localeMap).map((key) => (
                                                <Dropdown.Item className="flex items-center justify-start" key={key} as={Link} href={router.asPath} shallow={true} locale={localeMap[key].localeShort}>
                                                    <Image alt={localeMap[key].name} src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${localeMap[key].flag}.svg`} width={64} height={64} className="w-6" />
                                                    <span className="ml-2">{localeMap[key].name}</span>
                                                </Dropdown.Item>
                                            ))
                                        }
                                    </Dropdown.Content>
                                </Dropdown>
                                <Dropdown>
                                    <Dropdown.Button className="btn-text text-rose-600 px-2 py-1">
                                        <MoonIcon className="w-5 h-5 hidden dark:inline" />
                                        <SunIcon className="w-5 h-5 dark:hidden" />
                                    </Dropdown.Button>
                                    <Dropdown.Content>
                                        <Dropdown.Item onClick={() => {
                                            setTheme("light")
                                        }} className="flex items-center justify-start">
                                            <SunIcon className="w-5 h-5 mr-2" />
                                            Light
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            setTheme("dark")
                                        }} className="flex items-center justify-start">
                                            <MoonIcon className="w-5 h-5 mr-2" />
                                            Dark
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            setTheme("auto")
                                        }} className="flex items-center justify-start">
                                            <ComputerDesktopIcon className="w-5 h-5 mr-2" />
                                            Auto
                                        </Dropdown.Item>
                                    </Dropdown.Content>
                                </Dropdown>
                                <div className="h-full justify-end items-center space-x-3 hidden md:flex">
                                    <NavLink className={`${showNavbar ? "text-gray-700 hocus:text-gray-900 dark:text-gray-300 dark:hocus:text-gray-100" : ""}`} href="/elite-rewards">
                                        {__('nav.elite_rewards')}
                                    </NavLink>
                                    <NavLink className={`${showNavbar ? "text-gray-700 hocus:text-gray-900 dark:text-gray-300 dark:hocus:text-gray-100" : ""}`} href="/check-order">
                                        {__('nav.check_order')}
                                    </NavLink>
                                    {
                                        !user ? (
                                            <>
                                                <NavLink className={`${showNavbar ? "text-gray-700 hocus:text-gray-900 dark:text-gray-300 dark:hocus:text-gray-100" : ""}`} href="/auth/login">
                                                    {__('nav.login')}
                                                </NavLink>
                                                <Link href="/auth/register" className="btn-rose">{__('nav.register')}</Link>
                                            </>
                                        )
                                        : (
                                            <Dropdown>
                                                {({ open }) => (
                                                    <>
                                                        <Dropdown.Button className={`btn-text px-2 py-1 group select-none ${showNavbar ? "text-gray-700 hocus:text-gray-900 dark:text-gray-300 dark:hocus:text-gray-100" : ""}`}>
                                                            <Image className="w-6 h-6 mr-2 object-cover rounded-full" src={user.avatar} alt={user.name} width={100} height={100} />
                                                            <span className="text-sm font-medium">{truncateString(user.name, 12)}</span>
                                                            <ChevronDownIcon className={`w-5 h-5 ml-2 ${open ? "rotate-180" : ""} transition-all duration-200`} />
                                                        </Dropdown.Button>
                                                        <Dropdown.Content>
                                                            <Link className="w-full flex my-2 px-2 py-1" href="/@me">
                                                                <div className="w-1/4 grid place-items-center">
                                                                    <Image className="w-12 h-12 object-cover rounded-full" src={user.avatar} alt={user.name} width={100} height={100} />
                                                                </div>
                                                                <div className="w-3/4 px-2 py-2">
                                                                    <p className="text-sm font-medium truncate dark:text-white">{user.name}</p>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-300 truncate">{user.email}</p>
                                                                </div>
                                                            </Link>
                                                            <Dropdown.Divider />
                                                            <Dropdown.Item as={Link} href="/@me" className="flex items-center justify-start">
                                                                <UserIcon className="w-5 h-5 mr-2" />
                                                                {__('nav.profile')}
                                                            </Dropdown.Item>
                                                            <Dropdown.Item onClick={logout} className="flex items-center justify-start">
                                                                <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
                                                                {__('nav.logout')}
                                                            </Dropdown.Item>
                                                        </Dropdown.Content>
                                                    </>
                                                )}
                                            </Dropdown>
                                        )
                                    }
                                </div>
                                <button onClick={toggleSidebar} className="btn-text text-rose-600 px-2 py-1 md:hidden">
                                    <Bars3BottomRightIcon className="w-6 h-6" />
                                </button>
                            </div>
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
                        <div className="w-full bg-white dark:bg-gray-900 shadow-md">
                            <div className="w-full max-w-7xl mx-auto px-2 h-full flex flex-wrap items-center justify-between">
                                <div className="w-full lg:w-1/2 py-2 px-2">
                                    <SearchBox placeholder={__('main.searchbox')} />
                                </div>
                                <div className="w-full lg:w-1/2 px-2 py-2 hidden lg:block">
                                    <div className="w-full justify-start flex items-center py-1 relative md:justify-end h-14">
                                        <UnderlinedLink className="mx-1 ml-3" href="/flights">{__('nav.flight')}</UnderlinedLink>
                                        <UnderlinedLink className="mx-1" href="/hotel">{__('nav.hotel')}</UnderlinedLink>
                                        <UnderlinedLink className="mx-1" href="/trains">{__('nav.train')}</UnderlinedLink>
                                        <UnderlinedLink className="mx-1" href="/pelni">{__('nav.pelni')}</UnderlinedLink>
                                        <UnderlinedLink className="mx-1" href="/rent-car">{__('nav.car_rent')}</UnderlinedLink>
                                        <UnderlinedLink className="mx-1" href="/cargo">{__('nav.cargo')}</UnderlinedLink>
                                        <Dropdown className="h-full mx-1">
                                            {({ open }) => (
                                                <>
                                                    <Dropdown.Button as="div" className="h-full">
                                                        <UnderlinedLink active={open} as="button">{__('nav.hajj_umrah')}</UnderlinedLink>
                                                    </Dropdown.Button>
                                                    <Dropdown.Content>
                                                        <Dropdown.Item as={Link} href="/hajj-and-umrah">
                                                            <Squares2X2Icon className="w-5 h-5 mr-2 text-rose-500" />
                                                            {__('nav.dashboard')}
                                                        </Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setModalOpen('landArrangementModal')}>
                                                            <KaabaIcon className="w-5 h-5 mr-2 text-rose-500" />
                                                            {__('nav.land_arrangement')}
                                                        </Dropdown.Item>
                                                        <Dropdown.Item as={Link} href="/hajj-and-umrah/flight">
                                                            <AirplaneTakeoffIcon className="w-5 h-5 mr-2 text-rose-500" />
                                                            {__('nav.flight')}
                                                        </Dropdown.Item>
                                                        <Dropdown.Item as={Link} href="/hajj-and-umrah/pay-later">
                                                            <CreditCardIcon className="w-5 h-5 mr-2 text-rose-500" />
                                                            {__('nav.pay_later')}
                                                        </Dropdown.Item>
                                                        <Dropdown.Item as={Link} href="/hajj-and-umrah/visa">
                                                            <IdentificationIcon className="w-5 h-5 mr-2 text-rose-500" />
                                                            {__('nav.visa')}
                                                        </Dropdown.Item>
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

            <ResponsiveNavbar user={user} logout={logout} />
        </header>
    );
};