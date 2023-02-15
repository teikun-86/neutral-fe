import Image from "next/image";
import logo from "@/assets/images/tripla-logo.png";
import { ThreeDots } from "./icons";
import { Transition } from "@headlessui/react";
import { useEffect } from "react";

const Loader = ({ show }) => {
    useEffect(() => {
        if (show) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [show])
    
    return (
        <Transition
            show={show}
            appear
            leave="transition-all duration-600"
            leaveFrom="opacity-100"
            leaveTo="opacity-0 scale-[1.2]"
        >
            <div className="w-screen h-screen fixed inset-0 bg-white dark:bg-gray-900 grid place-items-center z-[500]">
                <div className="flex flex-col items-center justify-center w-full">
                    <Transition.Child
                        leave="transition-all duration-200"
                        leaveFrom="translate-y-0 scale-100"
                        leaveTo="translate-y-5 scale-[0.4]"
                        className="w-full"
                    >
                        <div className="w-full mx-auto grid place-items-center">
                            <Image priority src={logo} className="w-1/2 sm:w-1/3 md:w-1/5 lg:w-1/6 h-auto mb-3" alt={process.env.NEXT_PUBLIC_APP_NAME} width={400} height={400} />
                        </div>
                    </Transition.Child>
                    <Transition.Child
                        enter="transition-all duration-300"
                        enterFrom="w-[0px]"
                        enterTo="w-full"
                        leave="transition-all duration-200"
                        leaveFrom="w-full"
                        leaveTo="w-[0px]"
                    >
                        <div className="w-[80%] md:w-1/2 lg:w-1/4 xl:w-1/5 mx-auto relative bg-gray-200 dark:bg-gray-700 space-x-2 flex items-center overflow-hidden h-2 p-1 px-2 rounded-lg">
                            <div className="absolute bg-rose-600 w-1/4 h-1 rounded-lg animate-bounce-x"></div>
                            <div className="absolute bg-rose-600 w-1/4 h-1 rounded-lg animate-bounce-x [animation-delay:400ms]"></div>
                        </div>
                    </Transition.Child>
                </div>
            </div>
        </Transition>
    );
};

export default Loader;