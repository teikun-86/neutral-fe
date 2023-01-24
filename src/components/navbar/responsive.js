import drawerState from "@/hooks/drawer";
import { useLocale } from "@/hooks/locale";
import { searchString } from "@/util";
import { LanguageIcon, UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { AirplaneTakeoffIcon, KaabaIcon } from "../icons";
import { Drawer } from "../modal";
import SearchBox from "../search";
import { ResponsiveLink } from "./responsive-link";

export const ResponsiveNavbar = ({ user, logout }) => {
    const [drawerOpen, setDrawerOpen] = useRecoilState(drawerState)
    const router = useRouter()
    const { __ } = useLocale()

    return (
        <Drawer id="responsiveNavDrawer">
            <Drawer.Header>
                <h4 className="text-xl font-bold text-gray-900 text-center mb-3">{__('menu')}</h4>
                <SearchBox />
            </Drawer.Header>
            <Drawer.Body className="px-1 !max-h-[80vh]">
                <nav className="w-full block">
                    {
                        user
                        ? (
                            <>
                                <Link className="w-full flex flex-col my-2 py-1" href="/@me">
                                    <div className="grid place-items-center">
                                        <Image className="w-24 h-24 object-cover rounded-full" src={user.avatar} alt={user.name} width={100} height={100} />
                                    </div>
                                    <div className="w-full px-2 py-2">
                                        <p className="text-lg font-medium truncate text-center">{user.name}</p>
                                        <p className="text-base text-gray-500 truncate text-center">{user.email}</p>
                                    </div>
                                </Link>
                            </>
                        )
                        :   <></>
                        
                    }
                    <h6 className="my-2 text-rose-600 py-2 border-b border-gray-300/60 font-semibold text-base mx-4 flex items-center justify-start">
                        <UserIcon className="w-6 h6 mr-2" />
                        {__('account')}
                    </h6>
                    <ResponsiveLink href="#elite-rewards">{__('nav.elite_rewards')}</ResponsiveLink>
                    <ResponsiveLink href="#elite-rewards">{__('nav.check_order')}</ResponsiveLink>
                    {
                        user
                        ? (
                            <>
                                <ResponsiveLink href="/@me">{__('nav.profile')}</ResponsiveLink>
                                <ResponsiveLink as="button" onClick={logout}>{__('nav.logout')}</ResponsiveLink>
                            </>
                        )
                        : (
                            <>
                                <ResponsiveLink href="/auth/login">{__('nav.login')}</ResponsiveLink>
                                <ResponsiveLink href="/auth/register">{__('nav.register')}</ResponsiveLink>
                            </>
                        )
                    }
                    <h6 className="my-2 text-rose-600 py-2 border-b border-gray-300/60 font-semibold text-base mx-4 flex items-center justify-start">
                        <AirplaneTakeoffIcon className="w-6 h6 mr-2" />
                        {__('travel')}
                    </h6>
                    <ResponsiveLink active={searchString('/flights', router.pathname)} href="/flights">{__('nav.flight')}</ResponsiveLink>
                    <ResponsiveLink active={router.pathname === '/hotel'} href="/hotel">{__('nav.hotel')}</ResponsiveLink>
                    <ResponsiveLink active={router.pathname === '/trains'} href="/trains">{__('nav.train')}</ResponsiveLink>
                    <ResponsiveLink active={router.pathname === '/pelni'} href="/pelni">{__('nav.pelni')}</ResponsiveLink>
                    <ResponsiveLink active={router.pathname === '/rent-car'} href="/rent-car">{__('nav.car_rent')}</ResponsiveLink>
                    <ResponsiveLink active={router.pathname === '/cargo'} href="/cargo">{__('nav.cargo')}</ResponsiveLink>
                    <h6 className="my-2 text-rose-600 py-2 border-b border-gray-300/60 font-semibold text-base mx-4 flex items-center justify-start">
                        <KaabaIcon className="w-6 h6 mr-2" />
                        {__('nav.hajj_umrah')}
                    </h6>
                    <ResponsiveLink as="button" onClick={() => setDrawerOpen('landArrangementDrawer')}>
                        {__('nav.land_arrangement')}
                    </ResponsiveLink>
                    <ResponsiveLink href="/flights">
                        {__('nav.flight')}
                    </ResponsiveLink>
                    <ResponsiveLink href="/hajj-and-umrah/pay-later">
                        {__('nav.pay_later')}
                    </ResponsiveLink>
                    <ResponsiveLink href="/hajj-and-umrah/visa">
                        {__('nav.visa')}
                    </ResponsiveLink>
                </nav>
            </Drawer.Body>
        </Drawer>
    )
};