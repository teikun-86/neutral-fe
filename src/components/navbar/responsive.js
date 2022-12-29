import drawerState from "@/hooks/drawer";
import { searchString } from "@/util";
import { UserIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { AirplaneTakeoffIcon, KaabaIcon } from "../icons";
import { Drawer } from "../modal";
import SearchBox from "../search";
import { ResponsiveLink } from "./responsive-link";

export const ResponsiveNavbar = () => {
    const [drawerOpen, setDrawerOpen] = useRecoilState(drawerState)
    const router = useRouter()

    return (
        <Drawer id="responsiveNavDrawer">
            <Drawer.Header>
                <h4 className="text-xl font-bold text-gray-900 text-center mb-3">Menu</h4>
                <SearchBox />
            </Drawer.Header>
            <Drawer.Body className="px-1 !max-h-[70vh]">
                <nav className="w-full block">
                    <h6 className="my-2 text-rose-600 py-2 border-b border-gray-300/60 font-semibold text-base mx-4 flex items-center justify-start">
                        <UserIcon className="w-6 h6 mr-2" />
                        Akun
                    </h6>
                    <ResponsiveLink href="#elite-rewards">Elite Rewards</ResponsiveLink>
                    <ResponsiveLink href="#elite-rewards">Cek Order</ResponsiveLink>
                    <ResponsiveLink href="#login">Masuk</ResponsiveLink>
                    <ResponsiveLink href="#register">Daftar</ResponsiveLink>
                    <h6 className="my-2 text-rose-600 py-2 border-b border-gray-300/60 font-semibold text-base mx-4 flex items-center justify-start">
                        <AirplaneTakeoffIcon className="w-6 h6 mr-2" />
                        Travel
                    </h6>
                    <ResponsiveLink active={searchString('/flights', router.pathname)} href="/flights">Pesawat</ResponsiveLink>
                    <ResponsiveLink active={router.pathname === '/hotel'} href="/hotel">Hotel</ResponsiveLink>
                    <ResponsiveLink active={router.pathname === '/trains'} href="/trains">Kereta Api</ResponsiveLink>
                    <ResponsiveLink active={router.pathname === '/pelni'} href="/pelni">Pelni</ResponsiveLink>
                    <ResponsiveLink active={router.pathname === '/rent-car'} href="/rent-car">Sewa Mobil</ResponsiveLink>
                    <ResponsiveLink active={router.pathname === '/cargo'} href="/cargo">Cargo</ResponsiveLink>
                    <h6 className="my-2 text-rose-600 py-2 border-b border-gray-300/60 font-semibold text-base mx-4 flex items-center justify-start">
                        <KaabaIcon className="w-6 h6 mr-2" />
                        Haji & Umrah
                    </h6>
                    <ResponsiveLink as="button" onClick={() => setDrawerOpen('landArrangementDrawer')}>
                        Land Arrangement
                    </ResponsiveLink>
                    <ResponsiveLink href="/flights">
                        Pesawat
                    </ResponsiveLink>
                    <ResponsiveLink href="/hajj-and-umrah/pay-later">
                        Pay Later
                    </ResponsiveLink>
                    <ResponsiveLink href="/hajj-and-umrah/visa">
                        VISA
                    </ResponsiveLink>
                </nav>
            </Drawer.Body>
            <Drawer.Footer>
                <div className="flex items-center w-full justify-end">
                    <button onClick={() => setDrawerOpen('')} className="btn-text text-gray-900">Close</button>
                </div>
            </Drawer.Footer>
        </Drawer>
    )
};