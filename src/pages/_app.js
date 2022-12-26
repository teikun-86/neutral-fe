import '@/styles/globals.css'
import 'react-day-picker/dist/style.css';
import { RecoilRoot } from 'recoil'
import { Source_Sans_Pro } from "@next/font/google";

const ssp = Source_Sans_Pro({
    variable: "--font-source-sans-pro",
    subsets: ["latin"],
    weight: ["200", "300", "400", "600", "700", "900"]
})

function MyApp({ Component, pageProps }) {
    return (
        <RecoilRoot>
            <main className={`${ssp.variable} font-sans`}>
                <Component {...pageProps} />
            </main>
        </RecoilRoot>
    )
}

export default MyApp
