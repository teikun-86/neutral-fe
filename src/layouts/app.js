import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Head from "next/head";

const AppLayout = props => {
    return (
        <>
            <Head>
                <title>{props.title ?? "Neutral ー Your Best Travel Companion"}</title>
            </Head>
            <div className="w-full min-h-screen bg-gray-50 p-0 m-0 antialiased">
                <Navbar isInViewport={props.isInViewport ?? null} />

                {props.children}
                
            </div>
            <Footer />
        </>
    );
};

export default AppLayout;