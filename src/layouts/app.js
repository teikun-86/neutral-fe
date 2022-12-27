import Footer from "@/components/footer";
import { GlobalNavbar, Navbar } from "@/components/navbar";
import Head from "next/head";
import { useRouter } from "next/router";

const AppLayout = props => {
    const router = useRouter()
    
    return (
        <>
            <Head>
                <title>{props.title ?? "Neutral ー Your Best Travel Companion"}</title>
            </Head>
            <div className="w-full min-h-screen bg-gray-50 p-0 m-0 antialiased">
                {
                    router.pathname === '/'
                    ?   <Navbar fixed={props.fixed ?? true} isInViewport={props.isInViewport ?? null} />
                    :   <GlobalNavbar />
                }

                {props.children}
            </div>
            <Footer />
        </>
    );
};

export default AppLayout;