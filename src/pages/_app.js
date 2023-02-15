import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import NextNProgress from 'nextjs-progressbar';
import { RecoilRoot } from 'recoil'
import { Source_Sans_Pro } from "@next/font/google";
import { useEffect, useState } from 'react';
import Loader from '@/components/loader';
import { useRouter } from 'next/router';

const ssp = Source_Sans_Pro({
    variable: "--font-source-sans-pro",
    subsets: ["latin"],
    weight: ["200", "300", "400", "600", "700", "900"]
})

function MyApp({ Component, pageProps }) {
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        setLoading(false)
    }, [])
    
    return (
        <>
            <RecoilRoot>
                <NextNProgress color="#e11d48" options={{
                    showSpinner: false
                }} />
                <main className={`${ssp.variable} font-sans`}>
                    <Loader show={loading} />
                    <Component {...pageProps} />
                </main>
            </RecoilRoot>
        </>
    )
}

export default MyApp
