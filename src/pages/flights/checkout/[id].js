import { Dropdown } from "@/components/dropdown";
import { Input } from "@/components/forms";
import { SpinnerIcon } from "@/components/icons";
import AppLayout from "@/layouts/app";
import { CheckIcon, ChevronDownIcon, ChevronRightIcon, ExclamationCircleIcon, IdentificationIcon, UserIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import countryCodes from "@/data/call-codes";
import Image from "next/image";
import Alert from "@/components/alert";

const Checkout = ({ checkoutId, ...props }) => {
    const [checkoutData, setCheckoutData] = useState(null)
    const [countryQuery, setCountryQuery] = useState("")
    const [passengers, setPassengers] = useState([])
    const [contact, setContact] = useState({
        name: "",
        title: "Mr",
        email: "",
        phone: "",
        countryCode: {
            code: "ID",
            name: "Indonesia",
            dial_code: "+62",
        }
    })

    const [orderInvalid, setOrderInvalid] = useState(true)

    const titleMap = {
        "Mr": "Tuan",
        "Mrs": "Nyonya",
        "Ms": "Nona",
    }

    const passengerTypeMap = {
        "adult": "Dewasa",
        "child": "Anak",
        "infant": "Bayi",
    }
    
    const getCheckoutData = () => {
        const checkoutData = JSON.parse(localStorage.getItem('__flight_checkout'))
        let totalPassengers = checkoutData.passengers.adult + checkoutData.passengers.child + checkoutData.passengers.infant
        const passengersList = []

        for (let i = 0; i < totalPassengers; i++) {
            passengersList.push({
                name: "",
                title: "Mr",
                type: i < checkoutData.passengers.adult ? "adult" : i < checkoutData.passengers.adult + checkoutData.passengers.child ? "child" : "infant",
                number: i + 1,
            })
        }

        setPassengers(passengersList)
        
        setCheckoutData(checkoutData)
    }

    const handleContact = (key, value) => {
        setContact(order => {
            order[key] = value
            return order
        })
        checkOrderValidity()
    }

    const handlePassenger = (key, value, index) => {
        setPassengers(passengers => {
            passengers[index][key] = value
            return passengers
        })
        checkOrderValidity()
    }

    const checkOrderValidity = () => {
        const fieldsToCheck = ['name', 'email', 'phone', 'countryCode'];

        setOrderInvalid(fieldsToCheck.some(field => contact[field] === '') || passengers.some(passenger => passenger.name === ''))
    }

    const continueToPayment = () => {
        // collect data and store it in local storage
        const data = {
            contact,
            passengers,
            step: "payment",
            date: new Date().toISOString(),
        }

        localStorage.setItem('__flight_to_pay', JSON.stringify(data))
    }
    
    useEffect(() => {
        let to = setTimeout(() => {
            getCheckoutData()
        }, 1000)
    }, [])
    
    return (
        <AppLayout title="Checkout Flight">
            <header className="w-full sticky top-0 shadow bg-white px-3 py-2 z-30">
                <div className="w-full max-w-7xl mx-auto">
                    <div className="flex items-center justify-start">
                        <div className="flex items-center space-x-2 select-none">
                            <span className="bg-rose-500 rounded-full grid place-items-center font-semibold text-white w-5 h-5 leading-none">1</span>
                            <span className="text-gray-700 font-medium">Pesan</span>
                        </div>
                        <ChevronRightIcon className="w-6 h-6 mx-2" />
                        <div className="flex items-center space-x-2 select-none">
                            <span className="rounded-full grid place-items-center font-semibold text-white w-5 h-5 leading-none bg-gray-600">2</span>
                            <span className="text-gray-500">Bayar</span>
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

            {
                !checkoutData
                ? (
                    <>
                        <div className="w-full grid place-items-center py-2">
                            <SpinnerIcon className="w-10 h-10 text-rose-600 animate-spin" />
                        </div>
                    </>
                )
                : (
                    <>
                        <div className="w-full max-w-7xl mx-auto px-4 py-6">
                            <div>
                                
                                {
                                    orderInvalid && (
                                        <Alert title="Perhatian" type="error" className="sticky top-10 z-30">
                                            Mohon lengkapi data pemesan dan penumpang.
                                        </Alert>
                                    )
                                }

                                <Alert className="my-4" title="Info">
                                    Mohon isi data pemesan dan penumpang dengan benar. Data yang anda masukkan akan digunakan untuk pembuatan e-ticket. Harap periksa kembali sebelum melanjutkan ke tahap pembayaran karena beberapa maskapai tidak mengizinkan perubahan data setelah pemesanan.
                                </Alert>
                                
                                <div className="w-full bg-white rounded-lg shadow p-3">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <IdentificationIcon className="w-8 h-8 text-gray-800" />
                                        <h6 className="text-xl font-semibold text-gray-900">Data Pemesan</h6>
                                    </div>
                                    <div className="my-2">
                                        <div className="flex flex-wrap">
                                            <div className="w-32 p-3 z-20">
                                                <Dropdown className="w-full">
                                                    {({ open }) => (
                                                        <>
                                                            <Dropdown.Button as="div" className="relative">
                                                                <label className={`absolute ${open || contact.title.trim().length > 0 ? "-top-3 text-xs left-3 text-rose-600" : "top-1.5 text-sm left-2 text-gray-700"} bg-white p-1 transition-all duration-200 font-medium tracking-wide cursor-pointer rounded-lg`}>Titel</label>
                                                                <button className="w-full bg-white form-input border-gray-300 focus:border-rose-600 ring-0 focus:ring-0 outline-none focus:outline-none transition-all text-start cursor-pointer duration-200 rounded-lg h-[2.6rem]" >
                                                                    {titleMap[contact.title]}
                                                                </button>
                                                                <ChevronDownIcon className={`w-5 h-5 absolute top-3 right-3 ${open ? "rotate-180 text-rose-600" : ""} transition-all cursor-pointer duration-200`} />
                                                            </Dropdown.Button>
                                                            <Dropdown.Content className="!w-full">
                                                                <Dropdown.Item onClick={() => handleContact("title", "Mr")}>
                                                                    Tuan
                                                                </Dropdown.Item>
                                                                <Dropdown.Item onClick={() => handleContact("title", "Mrs")}>
                                                                    Nyonya
                                                                </Dropdown.Item>
                                                                <Dropdown.Item onClick={() => handleContact("title", "Ms")}>
                                                                    Nona
                                                                </Dropdown.Item>
                                                            </Dropdown.Content>
                                                        </>
                                                    )}
                                                </Dropdown>
                                            </div>
                                            <div className="w-[calc(100%-8rem)] p-3">
                                                <Input autoCapitalize noSymbols type="text" onChange={(e) => handleContact("name", e.target.value)} label="Nama Lengkap" invalidMessage="Harap Isi Nama Lengkap Anda" info="Isi sesuai KTP/Paspor/SIM (tanpa gelar dan tanda baca)" />
                                            </div>
                                            <div className="w-full p-3">
                                                <Input type="email" onChange={(e) => handleContact("email", e.target.value)} label="Email" invalidMessage="Isi dengan email yang valid" info="E-Ticket akan dikirim ke alamat email ini" />
                                            </div>
                                            <div className="w-40 p-3 z-20">
                                                <Dropdown className="w-full">
                                                    {({ open }) => (
                                                        <>
                                                            <Dropdown.Button as="div" className="relative">
                                                                <label className={`absolute ${open || contact.countryCode.name !== undefined ? "-top-3 text-xs left-3 text-rose-600" : "top-1.5 text-sm left-2 text-gray-700"} bg-white p-1 transition-all duration-200 font-medium tracking-wide cursor-pointer rounded-lg`}>Kode Negara</label>
                                                                <button className="w-full bg-white form-input border-gray-300 focus:border-rose-600 ring-0 focus:ring-0 outline-none focus:outline-none transition-all text-start cursor-pointer duration-200 rounded-lg h-[2.6rem] flex items-center space-x-1" >
                                                                    <span className="w-6 h-3 grid place-items-center mr-2">
                                                                        <Image src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${contact.countryCode.code}.svg`} width={100} height={100} alt="Indonesia" />
                                                                    </span>
                                                                    ({contact.countryCode.dial_code})
                                                                </button>
                                                                <ChevronDownIcon className={`w-5 h-5 absolute top-3 right-3 ${open ? "rotate-180 text-rose-600" : ""} transition-all cursor-pointer duration-200`} />
                                                            </Dropdown.Button>
                                                            <Dropdown.Content afterLeave={() => setCountryQuery('')} className="left-0 max-h-72 overflow-y-auto gray-scrollbar pt-0">
                                                                <div className="w-full px-2 py-1 bg-white sticky top-0">
                                                                    <Input type="text" id="searchCountry" onChange={(e) => setCountryQuery(e.target.value)} label="Cari Kode Negara" />
                                                                </div>
                                                                {
                                                                    countryCodes.filter((country) => {
                                                                        return countryQuery.trim().length <= 0 ? true : country.name.toLowerCase().includes(countryQuery.toLowerCase()) || country.dial_code.toLowerCase().includes(countryQuery.toLowerCase()) || country.code.toLowerCase().includes(countryQuery.toLowerCase())
                                                                    }).map((country, idx) => {
                                                                        const flagUrl = `http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code}.svg`;
                                                                        return (
                                                                            <Dropdown.Item className="flex items-center justify-start text-start" key={idx} onClick={() => handleContact("countryCode", country)}>
                                                                                <span className="w-6 h-3 grid place-items-center mr-2">
                                                                                    <Image src={flagUrl} width={100} height={100} alt={country.name} />
                                                                                </span>
                                                                                {country.name}
                                                                                ({country.dial_code})
                                                                            </Dropdown.Item>
                                                                        )
                                                                    })
                                                                }
                                                            </Dropdown.Content>
                                                        </>
                                                    )}
                                                </Dropdown>
                                            </div>
                                            <div className="w-[calc(100%-10rem)] p-3">
                                                <Input type="text" label="Nomor Telepon" minChar={6} maxChar={13} name="phoneNumber" id="contactPhoneNumber" onChange={(e) => {
                                                    handleContact("phone", e.target.value)
                                                }} onlyNumbers noSymbols invalidMessage="Panjang Nomor Telepon Harus antara 6-13 karakter." info="Isi nomor telepon tanpa awalan 0 atau kode negara" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full bg-white rounded-lg shadow p-3 my-3">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <IdentificationIcon className="w-8 h-8 text-gray-800" />
                                        <h6 className="text-xl font-semibold text-gray-900">Data Penumpang</h6>
                                    </div>
                                    <div className="w-full">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {
                                                passengers.map((passenger, idx) => {
                                                    return (
                                                        <div className="w-full bg-white rounded-lg shadow p-3" key={idx}>
                                                            <div className="flex items-center space-x-2 mb-4">
                                                                <UserIcon className="w-8 h-8 text-gray-800" />
                                                                <h6 className="text-xl font-semibold text-gray-900">Penumpang {idx + 1}: ({passengerTypeMap[passenger.type]})</h6>
                                                            </div>
                                                            <div className="w-full">
                                                                <div className="flex flex-wrap w-full items-start">
                                                                    <div className="w-32 p-3 z-20">
                                                                        <Dropdown className="w-full">
                                                                            {({ open }) => (
                                                                                <>
                                                                                    <Dropdown.Button as="div" className="relative">
                                                                                        <label className={`absolute ${open || passenger.title.length > 0 ? "-top-3 text-xs left-3 text-rose-600" : "top-1.5 text-sm left-2 text-gray-700"} bg-white p-1 transition-all duration-200 font-medium tracking-wide cursor-pointer rounded-lg`}>Titel</label>
                                                                                        <button className="w-full bg-white form-input border-gray-300 focus:border-rose-600 ring-0 focus:ring-0 outline-none focus:outline-none transition-all text-start cursor-pointer duration-200 rounded-lg h-[2.6rem]" >
                                                                                            {titleMap[passenger.title]}
                                                                                        </button>
                                                                                        <ChevronDownIcon className={`w-5 h-5 absolute top-3 right-3 ${open ? "rotate-180 text-rose-600" : ""} transition-all cursor-pointer duration-200`} />
                                                                                    </Dropdown.Button>
                                                                                    <Dropdown.Content className="!w-full">
                                                                                        <Dropdown.Item onClick={() => handlePassenger("title", "Mr", idx)}>
                                                                                            Tuan
                                                                                        </Dropdown.Item>
                                                                                        <Dropdown.Item onClick={() => handlePassenger("title", "Mrs", idx)}>
                                                                                            Nyonya
                                                                                        </Dropdown.Item>
                                                                                        <Dropdown.Item onClick={() => handlePassenger("title", "Ms", idx)}>
                                                                                            Nona
                                                                                        </Dropdown.Item>
                                                                                    </Dropdown.Content>
                                                                                </>
                                                                            )}
                                                                        </Dropdown>
                                                                    </div>
                                                                    <div className="w-[calc(100%-8rem)] p-3">
                                                                        <Input type="text" label="Nama Lengkap" minChar={3} maxChar={30} name="FullName" id={`passengerFullName${idx}`} onChange={(e) => {
                                                                            handlePassenger("name", e.target.value, idx)
                                                                        }} autoCapitalize noSymbols invalidMessage="Panjang Nama Harus antara 3-30 karakter." info="Isi sesuai KTP/Paspor/SIM (tanpa gelar dan tanda baca)" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end w-full">
                                    <button onClick={continueToPayment} disabled={orderInvalid} className="btn-rose rounded-full">Lanjutkan ke Pembayaran <ChevronRightIcon className="w-5 h-5 ml-2" /></button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </AppLayout>
    );
}

export const getServerSideProps = async (context) => {
    const { params } = context;
    
    return {
        props: {
            checkoutId: params.id
        },
    }
}
export default Checkout;