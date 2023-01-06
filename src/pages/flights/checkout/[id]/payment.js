import AppLayout from "@/layouts/app";
import { Disclosure, Transition } from "@headlessui/react";
import { CheckIcon, ChevronRightIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import bcaLogo from "@/assets/images/payment/bca-logo.png";
import bniLogo from "@/assets/images/payment/bni-logo.png";
import briLogo from "@/assets/images/payment/bri-logo.png";
import mandiriLogo from "@/assets/images/payment/mandiri-logo.png";
import permataLogo from "@/assets/images/payment/permata-logo.png";
import gopayLogo from "@/assets/images/payment/gopay-logo.png";
import danaLogo from "@/assets/images/payment/dana-logo.png";
import shopeepayLogo from "@/assets/images/payment/shopeepay-logo.png";
import linkajaLogo from "@/assets/images/payment/linkaja-logo.png";
import ovoLogo from "@/assets/images/payment/ovo-logo.png";
import indomaretLogo from "@/assets/images/payment/indomaret-logo.png";
import alfamartLogo from "@/assets/images/payment/alfamart-logo.png";
import alfamidiLogo from "@/assets/images/payment/alfamidi-logo.png";

const Payment = ({ props }) => {
    const paymentMethods = {
        "Virtual Account": [
            {
                "name": "BCA Virtual Account",
                "image": bcaLogo,
                "description": "Bayar dengan Virtual Account BCA",
                "type": "virtual_account",
                "code": "bca_va",
                "status": "active"
            },
            {
                "name": "BNI Virtual Account",
                "image": bniLogo,
                "description": "Bayar dengan Virtual Account BNI",
                "type": "virtual_account",
                "code": "bni_va",
                "status": "active"
            },
            {
                "name": "Mandiri Virtual Account",
                "image": mandiriLogo,
                "description": "Bayar dengan Virtual Account Mandiri",
                "type": "virtual_account",
                "code": "mandiri_va",
                "status": "active"
            },
            {
                "name": "Permata Virtual Account",
                "image": permataLogo,
                "description": "Bayar dengan Virtual Account Permata",
                "type": "virtual_account",
                "code": "permata_va",
                "status": "active"
            },
            {
                "name": "BRI Virtual Account",
                "image": briLogo,
                "description": "Bayar dengan Virtual Account BRI",
                "type": "virtual_account",
                "code": "bri_va",
                "status": "active"
            },
        ],
        "Bank Transfer": [
            {
                "name": "BCA Bank Transfer",
                "image": bcaLogo,
                "description": "Bayar dengan Bank Transfer BCA",
                "type": "bank_transfer",
                "code": "bca",
                "status": "active"
            },
            {
                "name": "BNI Bank Transfer",
                "image": bniLogo,
                "description": "Bayar dengan Bank Transfer BNI",
                "type": "bank_transfer",
                "code": "bni",
                "status": "active"
            },
            {
                "name": "Mandiri Bank Transfer",
                "image": mandiriLogo,
                "description": "Bayar dengan Bank Transfer Mandiri",
                "type": "bank_transfer",
                "code": "mandiri",
                "status": "active"
            },
            {
                "name": "Permata Bank Transfer",
                "image": permataLogo,
                "description": "Bayar dengan Bank Transfer Permata",
                "type": "bank_transfer",
                "code": "permata",
                "status": "active"
            },
            {
                "name": "BRI Bank Transfer",
                "image": briLogo,
                "description": "Bayar dengan Bank Transfer BRI",
                "type": "bank_transfer",
                "code": "bri",
                "status": "active"
            },
        ],
        "Offline Merchant": [
            {
                "name": "Indomaret",
                "image": indomaretLogo,
                "description": "Bayar dengan Indomaret",
                "type": "offline_merchant",
                "code": "indomaret",
                "status": "active"
            },
            {
                "name": "Alfamart",
                "image": alfamartLogo,
                "description": "Bayar dengan Alfamart",
                "type": "offline_merchant",
                "code": "alfamart",
                "status": "active"
            },
            {
                "name": "Alfamidi",
                "image": alfamidiLogo,
                "description": "Bayar dengan Alfamidi",
                "type": "offline_merchant",
                "code": "alfamidi",
                "status": "active"
            },
        ],
        "E-Wallet": [
            {
                "name": "OVO",
                "image": ovoLogo,
                "description": "Bayar dengan OVO",
                "type": "e_wallet",
                "code": "ovo",
                "status": "active"
            },
            {
                "name": "DANA",
                "image": danaLogo,
                "description": "Bayar dengan DANA",
                "type": "e_wallet",
                "code": "dana",
                "status": "active"
            },
            {
                "name": "Gopay",
                "image": gopayLogo,
                "description": "Bayar dengan Gopay",
                "type": "e_wallet",
                "code": "gopay",
                "status": "active"
            },
            {
                "name": "LinkAja",
                "image": linkajaLogo,
                "description": "Bayar dengan LinkAja",
                "type": "e_wallet",
                "code": "linkaja",
                "status": "active"
            },
            {
                "name": "ShopeePay",
                "image": shopeepayLogo,
                "description": "Bayar dengan ShopeePay",
                "type": "e_wallet",
                "code": "shopeepay",
                "status": "active"
            },
        ]
    }
    
    return (
        <AppLayout title="Payment">
            <header className="w-full sticky top-0 shadow bg-white px-3 py-2 z-30">
                <div className="w-full max-w-7xl mx-auto">
                    <div className="flex items-center justify-start">
                        <div className="flex items-center space-x-2 select-none">
                            <span className="rounded-full grid place-items-center font-semibold text-white w-5 h-5 leading-none bg-rose-500">
                                <CheckIcon className="w-4 h-4" />
                            </span>
                            <span className="text-gray-700 font-medium">Pesan</span>
                        </div>
                        <ChevronRightIcon className="w-6 h-6 mx-2" />
                        <div className="flex items-center space-x-2 select-none">
                            <span className="rounded-full grid place-items-center font-semibold text-white w-5 h-5 leading-none bg-rose-500">2</span>
                            <span className="text-gray-700 font-medium">Bayar</span>
                        </div>
                        <ChevronRightIcon className="w-6 h-6 mx-2" />
                        <div className="flex items-center space-x-2 select-none">
                            <span className="rounded-full grid place-items-center font-semibold text-white w-5 h-5 leading-none bg-gray-600">
                                3
                            </span>
                            <span className="text-gray-500">E-Ticket</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="w-full max-w-7xl mx-auto px-4 py-6">
                <h3 className="text-xl font-bold text-gray-900">Pilih Metode Pembayaran</h3>
                {
                    Object.keys(paymentMethods).map((group) => {
                        const paymentMethod = paymentMethods[group];
                        return (
                            <div key={group} className="w-full bg-white p-3 rounded-lg my-3 shadow">
                                <Disclosure>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className={`flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg ${open ? "bg-rose-600 hover:bg-rose-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-900"} focus:outline-none focus-visible:ring-opacity-75`}>
                                                <span>{group}</span>
                                                <ChevronUpIcon
                                                    className={`${
                                                        open ? 'transform rotate-180 text-white' : 'text-gray-500'
                                                    } w-5 h-5`}
                                                />
                                            </Disclosure.Button>
                                            <Transition
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                                    <div className="block space-y-3">
                                                        {
                                                            paymentMethod.map((method) => {
                                                                return (
                                                                    <button key={method.code} className="flex items-center space-x-2 btn-light w-full shadow justify-start text-start">
                                                                        <Image src={method.image} alt={method.name} className="w-10 h-auto" width={100} height={100} />
                                                                        <div>
                                                                            <h3 className="text-sm font-medium">{method.name}</h3>
                                                                            <p className="text-xs text-gray-500">{method.description}</p>
                                                                        </div>
                                                                    </button>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </Disclosure.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Disclosure>
                            </div>
                        )
                    })
                }
            </div>

        </AppLayout>
    );
}

export const getServerSideProps = async (context) => {
    return {
        props: {
            checkoutId: context.params.id
        },
    }
}
export default Payment;