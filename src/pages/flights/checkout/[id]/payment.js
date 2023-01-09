import AppLayout from "@/layouts/app";
import { Disclosure, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
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
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import modalState from "@/hooks/modal";
import drawerState from "@/hooks/drawer";
import { useEffect, useState } from "react";
import { Drawer, Modal } from "@/components/modal";
import { useViewport } from "@/hooks/viewport";
import { formatIDR } from "@/util";

const Payment = ({ props }) => {
    const router = useRouter()

    const [modalOpen, setModalOpen] = useRecoilState(modalState)
    const [drawerOpen, setDrawerOpen] = useRecoilState(drawerState)

    const [checkoutData, setCheckoutData] = useState(null)
    const [passengers, setPassengers] = useState([])
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
        ],
        "Retail": [
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
        ]
    }

    const { width } = useViewport({})

    const [prices, setPrices] = useState({
        adult: {
            count: 0,
            price: 0
        },
        child: {
            count: 0,
            price: 0
        },
        infant: {
            count: 0,
            price: 0
        },
        fees: [],
        total: 0
    })
    
    const passengerTypeMap = {
        "adult": "Dewasa",
        "child": "Anak",
        "infant": "Bayi",
    }

    const getCheckoutData = () => {
        const data = JSON.parse(localStorage.getItem('__flight_checkout'))
        let totalPassengers = data.passengers.adult + data.passengers.child + data.passengers.infant
        const passengersList = []

        for (let i = 0; i < totalPassengers; i++) {
            passengersList.push({
                name: "",
                title: "Mr",
                type: i < data.passengers.adult ? "adult" : i < data.passengers.adult + data.passengers.child ? "child" : "infant",
                number: i + 1,
            })
        }

        setPassengers(passengersList)

        let priceAdult = Number(data.depFlight.available.Amount)
        let priceChild = Number(data.depFlight.available.Amount)
        let priceInfant = Number(data.depFlight.available.Amount)

        let fees = [
            {
                name: "Biaya Layanan",
                price: 15000
            },
            {
                name: "Biaya Jasa",
                price: 12000
            }
        ]

        const priceList = {
            adult: {
                count: data.passengers.adult,
                price: priceAdult
            },
            child: {
                count: data.passengers.child,
                price: priceChild
            },
            infant: {
                count: data.passengers.infant,
                price: priceInfant
            },
            fees,
            total: (priceAdult * data.passengers.adult) + (priceChild * data.passengers.child) + (priceInfant * data.passengers.infant) + fees.reduce((acc, cur) => acc + cur.price, 0)
        }

        setPrices(priceList)
        setCheckoutData(data)

        console.log({
            data,
            priceList
        });
    }

    useEffect(() => {
        getCheckoutData()
    }, [])

    const openPriceDetail = () => {
        if (width >= 768) {
            setModalOpen("priceDetailModal")
        } else {
            setDrawerOpen("priceDetailDrawer")
        }
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
                            <div key={group} className="w-full bg-white p-3 rounded-lg my-6 shadow">
                                <h5 className="text-lg font-semibold text-gray-800">{group}</h5>
                                
                                <div className="block space-y-3 mt-3">
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
                            </div>
                        )
                    })
                }
                {
                    checkoutData && (
                       <div className="flex items-center justify-end bg-white sticky bottom-0 shadow rounded-t-lg">
                            <button onClick={openPriceDetail} className="flex items-center mb-3 md:mb-0 justify-between cursor-pointer">
                                <div className="btn-text space-x-2 text-rose-600">
                                    <span className="text-lg font-semibold text-gray-900">Total</span>
                                    <span className="text-lg">{formatIDR(prices.total)}</span>
                                </div>
                                <ChevronDownIcon className="w-6 h-6" />
                            </button>
                        </div>
                    )
                }
            </div>


            {
                !checkoutData
                ? <></>
                : (
                    width < 768
                        ?
                        <Drawer id="priceDetailDrawer">
                            <Drawer.Header>
                                <h4 className="text-lg font-semibold text-center">Detail Harga</h4>
                            </Drawer.Header>
                            <Drawer.Body>
                                <div className="block w-full py-2 px-4">
                                    <h6 className="text-gray-800 text-base font-semibold">Tarif</h6>
                                    <ul className="list-disc w-full pl-8 [&_li::marker]:text-gray-400">
                                        <li className="text-sm font-semibold text-gray-500">
                                            <div className="flex items-center justify-between w-full">
                                                <span>Dewasa ({prices.adult.count}x)</span>
                                                <span>{formatIDR(prices.adult.price)}</span>
                                            </div>
                                        </li>
                                        {
                                            prices.child.count > 0 && (
                                                <li className="text-sm font-semibold text-gray-500">
                                                    <div className="flex items-center justify-between w-full">
                                                        <span>Anak ({prices.child.count}x)</span>
                                                        <span>{formatIDR(prices.child.price)}</span>
                                                    </div>
                                                </li>
                                            )
                                        }
                                        {
                                            prices.infant.count > 0 && (
                                                <li className="text-sm font-semibold text-gray-500">
                                                    <div className="flex items-center justify-between w-full">
                                                        <span>Bayi ({prices.infant.count}x)</span>
                                                        <span>{formatIDR(prices.infant.price)}</span>
                                                    </div>
                                                </li>
                                            )
                                        }
                                    </ul>
                                    <h6 className="text-gray-800 text-base font-semibold mt-4">Pajak dan biaya lainnya</h6>
                                    <ul className="list-disc w-full pl-8 [&_li::marker]:text-gray-400">
                                        {
                                            prices.fees.length > 0 && (
                                                prices.fees.map((fee, idx) => (
                                                    <li key={idx} className="text-sm font-semibold text-gray-500">
                                                        <div className="flex items-center justify-between w-full">
                                                            <span>{fee.name}</span>
                                                            <span>{formatIDR(fee.price)}</span>
                                                        </div>
                                                    </li>
                                                ))
                                            )
                                        }
                                        <li className="text-sm font-semibold text-gray-500">
                                            <div className="flex items-center justify-between w-full">
                                                <span>Pajak</span>
                                                <span className="text-rose-600">Termasuk</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Drawer.Body>
                            <Drawer.Footer className="flex items-center justify-between mt-3 py-2">
                                <h6 className="text-gray-800 text-base font-semibold">Total</h6>
                                <h6 className="text-rose-600 text-lg font-semibold">{formatIDR(prices.total)}</h6>
                            </Drawer.Footer>
                        </Drawer>
                        :
                        <Modal size="xl" id="priceDetailModal">
                            <Modal.Header>
                                <button onClick={() => setModalOpen("")} className="grid place-items-center p-2 absolute top-2 right-2 btn-light rounded-full">
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                                <h4 className="text-lg font-semibold text-center">Detail Harga</h4>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="block w-full py-2 px-4 text-start">
                                    <h6 className="text-gray-800 text-base font-semibold">Tarif</h6>
                                    <ul className="list-disc w-full pl-8 [&_li::marker]:text-gray-400">
                                        <li className="text-sm font-semibold text-gray-500">
                                            <div className="flex items-center justify-between w-full">
                                                <span>Dewasa ({prices.adult.count}x)</span>
                                                <span>{formatIDR(prices.adult.price)}</span>
                                            </div>
                                        </li>
                                        {
                                            prices.child.count > 0 && (
                                                <li className="text-sm font-semibold text-gray-500">
                                                    <div className="flex items-center justify-between w-full">
                                                        <span>Anak ({prices.child.count}x)</span>
                                                        <span>{formatIDR(prices.child.price)}</span>
                                                    </div>
                                                </li>
                                            )
                                        }
                                        {
                                            prices.infant.count > 0 && (
                                                <li className="text-sm font-semibold text-gray-500">
                                                    <div className="flex items-center justify-between w-full">
                                                        <span>Bayi ({prices.infant.count}x)</span>
                                                        <span>{formatIDR(prices.infant.price)}</span>
                                                    </div>
                                                </li>
                                            )
                                        }
                                    </ul>
                                    <h6 className="text-gray-800 text-base font-semibold mt-4">Pajak dan biaya lainnya</h6>
                                    <ul className="list-disc w-full pl-8 [&_li::marker]:text-gray-400">
                                        {
                                            prices.fees.length > 0 && (
                                                prices.fees.map((fee, idx) => (
                                                    <li key={idx} className="text-sm font-semibold text-gray-500">
                                                        <div className="flex items-center justify-between w-full">
                                                            <span>{fee.name}</span>
                                                            <span>{formatIDR(fee.price)}</span>
                                                        </div>
                                                    </li>
                                                ))
                                            )
                                        }
                                        <li className="text-sm font-semibold text-gray-500">
                                            <div className="flex items-center justify-between w-full">
                                                <span>Pajak</span>
                                                <span className="text-rose-600">Termasuk</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Modal.Body>
                            <Modal.Footer className="flex items-center justify-between mt-3 py-2">
                                <h6 className="text-gray-800 text-base font-semibold">Total</h6>
                                <h6 className="text-rose-600 text-lg font-semibold">{formatIDR(prices.total)}</h6>
                            </Modal.Footer>
                        </Modal>
                )
            }

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