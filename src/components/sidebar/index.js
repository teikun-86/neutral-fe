import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { SpinnerIcon } from "../icons";
import { ResponsiveLink } from "../navbar";

import logo from "@/assets/images/tripla-logo.png";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";

const Sidebar = ({
    user,
    showLogo = false
}) => {
    const router = useRouter()
    
    return (
        <div className={`w-full h-full bg-white dark:bg-gray-900 py-2 px-1 mt-2 ${showLogo ? "shadow-lg" : ""}`}>
            <Transition
                show={showLogo}
                enter="transition ease-out duration-100"
                enterFrom="transform -translate-y-10 opacity-0"
                enterTo="transform translate-y-0 opacity-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform translate-y-0 opacity-100"
                leaveTo="transform -translate-y-10 opacity-0"
            >
                <Link className="py-2" href="/">
                    <Image alt={process.env.NEXT_PUBLIC_APP_NAME} priority src={logo} className="h-14 w-auto" />
                </Link>
            </Transition>
            <nav className="w-full flex flex-col justify-between min-h-[94%] max-h-[94%] overflow-y-auto gray-scrollbar">
                {
                    user
                    ? (
                        <nav className="list-none mt-3 flex flex-col space-y-1">
                            <h6 className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">
                                Flight
                            </h6>
                            {
                                user.user_type === 'company' && (
                                    <ResponsiveLink active={router.pathname === '/hajj-and-umrah/flight'} href="/hajj-and-umrah/flight">
                                        Flight
                                    </ResponsiveLink>
                                )
                            }
                            <ResponsiveLink active={router.pathname === '/hajj-and-umrah/flight/pool'} href="/hajj-and-umrah/flight/pool">
                                Pool
                            </ResponsiveLink>
                            <ResponsiveLink active={router.pathname === '/hajj-and-umrah/flight/reservations'} href="/hajj-and-umrah/flight/reservations">
                                Reservations
                            </ResponsiveLink>
                            <h6 className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase !mt-3">
                                Hotel
                            </h6>
                            {
                                user.user_type === 'company' && (
                                    <ResponsiveLink active={router.pathname === '/hajj-and-umrah/hotel'} href="/hajj-and-umrah/hotel">
                                        Hotel
                                    </ResponsiveLink>
                                )
                            }
                            <ResponsiveLink active={router.pathname === '/hajj-and-umrah/hotel/pool'} href="/hajj-and-umrah/hotel/pool">
                                Pool
                            </ResponsiveLink>
                            <ResponsiveLink active={router.pathname === '/hajj-and-umrah/hotel/reservations'} href="/hajj-and-umrah/hotel/reservations">
                                Reservations
                            </ResponsiveLink>
                            <h6 className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase !mt-3">
                                Flight + Hotel Package
                            </h6>
                            {
                                user.user_type === 'company' && (
                                    <ResponsiveLink active={router.pathname === '/hajj-and-umrah/package'} href="/hajj-and-umrah/package">
                                        Package
                                    </ResponsiveLink>
                                )
                            }
                            <ResponsiveLink active={router.pathname === '/hajj-and-umrah/package/pool'} href="/hajj-and-umrah/package/pool">
                                Pool
                            </ResponsiveLink>
                            <ResponsiveLink active={router.pathname === '/hajj-and-umrah/package/reservations'} href="/hajj-and-umrah/package/reservations">
                                Reservations
                            </ResponsiveLink>
                        </nav>
                    )
                    : (
                        <div className="w-full grid place-items-center">
                            <SpinnerIcon className="w-6 h-6 animate-spin text-rose-600" />
                        </div>
                    )
                }
                {
                    !user
                    ? (
                        <div className="w-full grid place-items-center">
                            <SpinnerIcon className="w-6 h-6 animate-spin text-rose-600" />
                        </div>
                    )
                    : (
                        user && (
                            <Transition
                                as={Fragment}
                                show={showLogo}
                                enter="transition ease-out duration-200"
                                enterFrom="transform -translate-y-10 opacity-0"
                                enterTo="transform translate-y-0 opacity-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform translate-y-0 opacity-100"
                                leaveTo="transform -translate-y-10 opacity-0"
                            >
                                <Link className="w-full flex my-2 px-2 py-1 pb-4" href="/@me">
                                    <div className="w-1/4 grid place-items-center">
                                        <Image className="w-12 h-12 object-cover rounded-full" src={user.avatar} alt={user.name} width={400} height={400} />
                                    </div>
                                    <div className="w-3/4 px-2 py-2">
                                        <p className="text-sm font-medium truncate dark:text-white">{user.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-300 truncate">{user.email}</p>
                                    </div>
                                </Link>
                            </Transition>
                        )
                    )
                }
            </nav>
        </div>
    );
};

export default Sidebar;