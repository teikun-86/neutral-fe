import Head from "next/head";

const GuestLayout = props => {
    return (
        <>
            <Head>
                <title>{props.title ?? `${process.env.NEXT_PUBLIC_APP_NAME} ー ${process.env.NEXT_PUBLIC_APP_SLOGAN}`}</title>
            </Head>
            <main className="w-full min-h-screen bg-gray-50 antialiased">
                {props.children}
            </main>
        </>
    );
};

export default GuestLayout;