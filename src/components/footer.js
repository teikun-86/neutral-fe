import { HeartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

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
                                    <a className="text-white font-bold text-lg relative after:w-3/4 after:h-0.5 after:bg-white after:absolute after:-bottom-1 after:left-0 flex items-center">Useful Links</a>
                                    <nav>
                                        <ul className="list-none mt-4">
                                            <li className="my-1">
                                                <Link href="/" className="text-gray-100 hover:text-white">Useful Link</Link>
                                            </li>
                                            <li className="my-1">
                                                <Link href="/" className="text-gray-100 hover:text-white">Lorem Ipsum</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="w-full lg:w-auto p-3 flex flex-col lg:flex-row lg:space-x-3 lg:justify-end">
                                <div className="w-full">
                                    <a className="text-white font-bold text-lg relative after:w-3/4 after:h-0.5 after:bg-white after:absolute after:-bottom-1 after:left-0 flex items-center">About Neutral</a>
                                    <nav>
                                        <ul className="list-none mt-4">
                                            <li className="my-1">
                                                <Link href="/" className="text-gray-100 hover:text-white">About Neutral</Link>
                                            </li>
                                            <li className="my-1">
                                                <Link href="/" className="text-gray-100 hover:text-white">Neutral LLC</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="text-center text-gray-200 flex items-center justify-center">Made with <HeartIcon className="text-white w-5 h-5 mx-1" /> by
                    <a href="https://azizfsama.vercel.app" rel="noreferrer" target="_blank" className="text-gray-100 hover:text-white hover:underline transition-all duration-200 underline-offset-1 ml-1">Aziz Febriyanto</a></div>
                <p className="text-center text-gray-200">Copyright &copy; {(new Date).getFullYear()}</p>
            </footer>
        </>
    );
};

export default Footer;