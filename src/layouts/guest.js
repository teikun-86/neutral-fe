import Head from "next/head";
import { useEffect } from "react";

const GuestLayout = props => {

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [])

    return (
        <>
            <Head>
                <title>{props.title ?? `${process.env.NEXT_PUBLIC_APP_NAME} ー ${process.env.NEXT_PUBLIC_APP_SLOGAN}`}</title>
            </Head>
            <main className="w-full min-h-screen bg-gray-50 dark:bg-gray-1000 antialiased">
                {props.children}
            </main>
        </>
    );
};

export default GuestLayout;