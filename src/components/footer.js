import Image from 'next/image';
import Link from 'next/link';
import appStore from "@/assets/images/download-on-app-store.png";

const Footer = () => {
    return (
        <>

            <footer className="w-full bg-red-600 p-3">
                <div className="flex w-full max-w-7xl mx-auto py-2 flex-wrap lg:justify-between">
                    <div className="w-full lg:w-1/4 p-3">
                        <h1 className="text-3xl font-bold text-white text-center lg:text-start">Neutral</h1>
                        <p className="text-gray-100 text-sm text-center lg:text-start">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore repellendus perferendis praesentium quasi dolores iusto tempora et pariatur incidunt harum, ratione ex sed minima, at, hic vitae fugit expedita nisi.</p>
                    </div>
                    <div className="block w-full lg:w-3/4">
                        <div className="flex w-full flex-wrap justify-end">
                            <div className="w-full lg:w-auto p-3 flex flex-col lg:flex-row lg:space-x-3 lg:justify-end">
                                <div className="w-full">
                                    <a className="text-white font-bold text-lg relative after:w-3/4 after:h-0.5 after:bg-white after:absolute after:-bottom-1 after:left-0 flex items-center">Payment Partners</a>
                                    <div className="flex flex-wrap">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row space-x-2 justify-center items-center">
                    <Link href={`https://play.google.com/store/search?q=${process.env.NEXT_PUBLIC_APP_NAME}&c=apps`} target="_blank">
                        <Image src="https://lh3.googleusercontent.com/q1k2l5CwMV31JdDXcpN4Ey7O43PxnjAuZBTmcHEwQxVuv_2wCE2gAAQMWxwNUC2FYEOnYgFPOpw6kmHJWuEGeIBLTj9CuxcOEeU8UXyzWJq4NJM3lg=s0" alt="Get it on Google Play Store" className="w-32" width={200} height={200} />
                    </Link>
                    <Link href={`https://play.google.com/store/search?q=${process.env.NEXT_PUBLIC_APP_NAME}&c=apps`} target="_blank">
                        <Image src={appStore} alt="Download on App Store" className="w-28" />
                    </Link>
                </div>
                <p className="text-center text-gray-200">Copyright &copy; {(new Date).getFullYear()}</p>
            </footer>
        </>
    );
};

export default Footer;