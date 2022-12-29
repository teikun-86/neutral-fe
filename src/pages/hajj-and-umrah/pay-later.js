import AppLayout from "@/layouts/app";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

import amitraSyariah from "@/assets/images/paylater-providers/logo-amitra.png";
import btn from "@/assets/images/paylater-providers/bank-btn.png";
import mncSyariah from "@/assets/images/paylater-providers/logo-mnc-syariah.png";
import Image from "next/image";
import useHorizontalScroll from "@/hooks/horizontal-scroll";

const PayLater = () => {
    const providersSelectionRef = useRef(null)

    useHorizontalScroll({ref: providersSelectionRef})
    
    const providers = {
        amitra: {
            name: "Amitra Syariah",
            image: amitraSyariah
        },
        btn: {
            name: "Bank Tabungan Negara",
            image: btn
        },
        mnc: {
            name: "MNC Dana Syariah",
            image: mncSyariah
        }
    }
    
    const [provider, setProvider] = useState(providers.amitra)
    
    return (
        <AppLayout title="Pay Later Haji & Umrah ー Neutral">
            <div className="w-full min-h-screen pb-4">
                <div className="w-full bg-rose-600 h-72 py-3 px-2 grid place-items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-white text-center">Pendaftaran Pay Later</h2>
                        <p className="text-center text-gray-100 md:max-w-[50%] mx-auto">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime deleniti aliquam ea error culpa autem ipsam magni debitis illo sunt, sapiente officiis corrupti iure atque sequi molestias! Omnis, laborum explicabo?</p>
                    </div>
                </div>
                <div className="w-full max-w-7xl mx-auto px-4 -mt-10">
                    <div className="w-full bg-white rounded-lg p-3 shadow-lg">
                        <h3 className="font-semibold text-xl tracking-wide flex items-center">
                            <CreditCardIcon className="w-8 h-8 text-rose-600 mr-3" />
                            Form Pendaftaran Pay Later
                        </h3>
                        <div className="my-2 mt-5 px-4 py-2 border-t border-gray-300/50">
                            <h6 className="text-base font-semibold text-gray-500">Pilih Penyedia</h6>
                            <div ref={providersSelectionRef} className="flex items-center px-5 py-2 gray-scrollbar overflow-x-auto overflow-y-hidden scroll-smooth space-x-3 whitespace-nowrap w-full relative">
                                {
                                    Object.keys(providers).map(key => {
                                        let prov = providers[key]
                                        let active = provider.name === prov.name
                                        return (
                                            <div key={prov.name} onClick={() => setProvider(prov)} className={`cursor-pointer md:w-[18rem] w-full inline-block rounded-lg px-3 py-2 ${active ? "border-rose-600" : "border-gray-300"} border grid place-items-center min-h-[10rem] whitespace-nowrap`}>
                                                <span></span>
                                                <Image className="w-32 h-auto object-contain" alt={prov.name} src={prov.image} />
                                                <h6 className="font-semibold text-lg text-gray-900">{prov.name}</h6>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default PayLater;