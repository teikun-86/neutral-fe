import { ArrowLeftOnRectangleIcon, Bars3BottomRightIcon, ChevronDownIcon, CreditCardIcon, IdentificationIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect, useState } from "react";
import { NavLink, ResponsiveNavbar, UnderlinedLink } from "@/components/navbar";
import { searchString, truncateString } from "@/util";
import { Dropdown } from "../dropdown";
import { useRecoilState } from "recoil";
import modalState from "@/hooks/modal";
import { AirplaneTakeoffIcon, KaabaIcon } from "../icons";
import drawerState from "@/hooks/drawer";
import { useViewport } from "@/hooks/viewport";
import Image from "next/image";
import { useLocale } from "@/hooks/locale";

export const GlobalNavbar = ({ stickyOnScroll = false, user = null, logout = () => { } }) => {
    const [showSidebar, setShowSidebar] = useState(false)
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [drawerOpen, setDrawerOpen] = useRecoilState(drawerState)
    const [lastY, setLastY] = useState(0)
    const [sticky, setSticky] = useState(false)

    const { scrollY } = useViewport({
        onScroll: (result) => {
            setLastY(result.y)
            setSticky(result.y < lastY && result.y > 0)
        }
    })
    
    const router = useRouter()

    const { __, locale, localeMap } = useLocale()

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
            <div className={`w-full z-50 ${stickyOnScroll && sticky ? "fixed top-0" : ""}`}>
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
                    <div className={`w-full bg-white h-16 md:h-auto shadow relative transition-colors duration-300`}>
                        <div className="flex items-center justify-between w-full max-w-7xl px-4 mx-auto h-full">
                            <Link className="text-3xl md:text-4xl font-bold text-rose-600" href="/">Neutral</Link>
                            <div className="w-full h-16 justify-end items-center space-x-3 hidden md:flex">
                                <Dropdown className="z-[60]">
                                    {({ open }) => (
                                        <>
                                            <Dropdown.Button className="btn-text text-rose-600 px-2 py-1 group select-none">
                                                <Image alt={localeMap[locale].name} src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${localeMap[locale].flag}.svg`} width={64} height={64} className="w-6 mr-2" />
                                                {localeMap[locale].localeShort.toUpperCase()}
                                                <ChevronDownIcon className="w-5 h-5 ml-2" />
                                            </Dropdown.Button>
                                            <Dropdown.Content>
                                                {
                                                    localeMap && Object.keys(localeMap).map((key) => (
                                                        <Dropdown.Item className="flex items-center justify-start" key={key} as={Link} href={router.pathname} locale={localeMap[key].localeShort}>
                                                            <Image alt={localeMap[key].name} src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${localeMap[key].flag}.svg`} width={64} height={64} className="w-6" />
                                                            <span className="ml-2">{localeMap[key].name}</span>
                                                        </Dropdown.Item>
                                                    ))
                                                }
                                            </Dropdown.Content>
                                        </>
                                    )}
                                </Dropdown>
                                <NavLink className="text-gray-700 hocus:text-gray-900" href="#elite-rewards">
                                    {__('nav.elite_rewards')}
                                </NavLink>
                                <NavLink className="text-gray-700 hocus:text-gray-900" href="#check-order">
                                    {__('nav.check_order')}
                                </NavLink>
                                {
                                    !user ? (
                                        <>
                                            <NavLink className="text-gray-700 hocus:text-gray-900" href="/auth/login">
                                                {__('nav.login')}
                                            </NavLink>
                                            <Link href="/auth/register" className="btn-rose">{__('nav.register')}</Link>
                                        </>
                                    )
                                        : (
                                            <Dropdown className="z-[80]">
                                                {({ open }) => (
                                                    <>
                                                        <Dropdown.Button className="btn-text text-gray-700 hocus:text-gray-900 px-2 py-1 group select-none">
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
                            <button onClick={toggleSidebar} className="text-rose-600 p-2 rounded-full hocus:bg-white/20 focus:outline-none md:hidden transition-all duration-200 ring-0 outline-none">
                                <Bars3BottomRightIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="max-w-7xl w-full mx-auto px-4">
                            <div className="items-center justify-end space-x-3 hidden md:flex h-12">
                                <UnderlinedLink active={searchString('/flights', router.pathname)} href="/flights">{__('nav.flight')}</UnderlinedLink>
                                <UnderlinedLink active={router.pathname === '/hotel'} href="/hotel">{__('nav.hotel')}</UnderlinedLink>
                                <UnderlinedLink active={router.pathname === '/trains'} href="/trains">{__('nav.train')}</UnderlinedLink>
                                <UnderlinedLink active={router.pathname === '/pelni'} href="/pelni">{__('nav.pelni')}</UnderlinedLink>
                                <UnderlinedLink active={router.pathname === '/rent-car'} href="/rent-car">{__('nav.car_rent')}</UnderlinedLink>
                                <UnderlinedLink active={router.pathname === '/cargo'} href="/cargo">{__('nav.cargo')}</UnderlinedLink>
                                <Dropdown className="h-full z-[50]">
                                    {({ open }) => (
                                        <>
                                            <Dropdown.Button as="div" className="h-full">
                                                <UnderlinedLink active={open || searchString('/hajj-and-umrah', router.pathname)} as="button">{__('nav.hajj_umrah')}</UnderlinedLink>
                                            </Dropdown.Button>
                                            <Dropdown.Content>
                                                <button className="w-full bg-white hocus:bg-gray-100 outline-none focus:outline-none ring-0 focus:ring-0 transition duration-200 flex items-center justify-start space-x-2 px-3 py-2 text-sm font-semibold text-gray-900 tracking-wider" onClick={() => setModalOpen('landArrangementModal')}>
                                                    <KaabaIcon className="w-5 h-5 mr-2 text-rose-500" />
                                                    {__('nav.land_arrangement')}
                                                </button>
                                                <Link className="w-full bg-white hocus:bg-gray-100 outline-none focus:outline-none ring-0 focus:ring-0 transition duration-200 flex items-center justify-start space-x-2 px-3 py-2 text-sm font-semibold text-gray-900 tracking-wider" href="/flights">
                                                    <AirplaneTakeoffIcon className="w-5 h-5 mr-2 text-rose-500" />
                                                    {__('nav.flight')}
                                                </Link>
                                                <Link className="w-full bg-white hocus:bg-gray-100 outline-none focus:outline-none ring-0 focus:ring-0 transition duration-200 flex items-center justify-start space-x-2 px-3 py-2 text-sm font-semibold text-gray-900 tracking-wider" href="/hajj-and-umrah/pay-later">
                                                    <CreditCardIcon className="w-5 h-5 mr-2 text-rose-500" />
                                                    {__('nav.pay_later')}
                                                </Link>
                                                <Link className="w-full bg-white hocus:bg-gray-100 outline-none focus:outline-none ring-0 focus:ring-0 transition duration-200 flex items-center justify-start space-x-2 px-3 py-2 text-sm font-semibold text-gray-900 tracking-wider" href="/hajj-and-umrah/visa">
                                                    <IdentificationIcon className="w-5 h-5 mr-2 text-rose-500" />
                                                    {__('nav.visa')}
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

            <ResponsiveNavbar user={user} logout={logout} />
        </header>
    );
};