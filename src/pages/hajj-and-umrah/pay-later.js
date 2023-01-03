import AppLayout from "@/layouts/app";
import { CameraIcon, CheckCircleIcon, CreditCardIcon, PaperAirplaneIcon, ViewfinderCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useMemo, useRef, useState } from "react";

import amitraSyariah from "@/assets/images/paylater-providers/logo-amitra.png";
import btn from "@/assets/images/paylater-providers/bank-btn.png";
import mncSyariah from "@/assets/images/paylater-providers/logo-mnc-syariah.png";
import Image from "next/image";
import useHorizontalScroll from "@/hooks/horizontal-scroll";
import { CircleIcon } from "@/components/icons";
import Combobox from "@/components/combobox";
import { searchString } from "@/util";

const PayLater = () => {
    const jobs = [
        "PNS",
        "TNI/Polri",
        "Wiraswasta",
        "Wirausaha"
    ]

    const allowedFileExts = [
        'image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    ]

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
    
    const providersSelectionRef = useRef(null)

    const [provider, setProvider] = useState(providers.amitra)
    const [identity, setIdentity] = useState(null)
    const [identityPreview, setIdentityPreview] = useState(null)
    const [npwp, setNpwp] = useState(null)
    const [npwpPreview, setNpwpPreview] = useState(null)
    const [job, setJob] = useState(jobs[0])
    const [query, setQuery] = useState('')
    const [identityError, setIdentityError] = useState(null)
    const [npwpError, setNpwpError] = useState(null)

    const queriedJobs = query.length === 0 ? jobs : jobs.filter(job => searchString(query, job))

    useHorizontalScroll({ref: providersSelectionRef})
    
    const handleFile = (event, type) => {
        let file = event.target.files[0]
        if (!file) {
            
            return
        }
        let filetype = file.type
        let check = allowedFileExts.includes(filetype)
        let message = null
        if (!check) {
            message = `Ekstensi file tidak didukung. Ekstensi yang didukung: ${allowedFileExts.map(ext => ext.split("/")[1]).join(", ")}`
        }
        if (type === 'identity') {
            setIdentityError(message)
        } else {
            setNpwpError(message)
        }
        if (message !== null) {
            return
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (type === 'identity') {
                setIdentityPreview(reader.result)
            } else {
                setNpwpPreview(reader.result)
            }
        }
        reader.readAsDataURL(file);
    }
    
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
                                            <div key={prov.name} onClick={() => setProvider(prov)} className={`cursor-pointer md:w-[18rem] w-full inline-block rounded-lg px-3 py-2 ${active ? "border-rose-600" : "border-gray-300"} border grid place-items-center min-h-[10rem] whitespace-nowrap relative`}>
                                                {
                                                    active
                                                    ? <CheckCircleIcon className="w-6 h-6 text-rose-600 absolute top-2 right-2" />
                                                    : <CircleIcon className="w-6 h-6 text-gray-300/70 absolute top-2 right-2" />
                                                }
                                                <span></span>
                                                <Image className="w-32 h-auto object-contain" alt={prov.name} src={prov.image} />
                                                <h6 className="font-semibold text-lg text-gray-900">{prov.name}</h6>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="my-2 mt-5 px-4 py-2">
                            <div className="flex w-full flex-wrap">
                                <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                                    <div className="flex flex-col">
                                        <label htmlFor="identityUploadInput" className="text-base font-semibold text-gray-500">
                                            Upload Foto KTP
                                            {
                                                identityPreview !== null
                                                ?   <div className="w-full rounded-lg aspect-video group relative overflow-hidden cursor-pointer bg-white shadow-lg p-1">
                                                        <Image src={identityPreview} alt="Identity Preview" className="w-full h-full rounded-lg aspect-video object-cover" width={200} height={100} />
                                                        <div className="absolute hidden inset-1 rounded-lg bg-black/50 group-hover:grid place-items-center">
                                                            <span></span>
                                                            <ViewfinderCircleIcon className="w-10 h-10 text-white" />
                                                            <p className="text-center text-gray-200">Tekan untuk memilih foto</p>
                                                        </div>
                                                    </div>
                                                :
                                                    <div className="cursor-pointer mt-2 w-full rounded-lg border-2 border-dashed border-gray-300/60 bg-gray-100 p-3 grid place-items-center aspect-video">
                                                        <div className="flex items-center justify-center flex-col">
                                                            <CameraIcon className="w-6 h-6" />
                                                            <p className="text-center text-gray-700">Tekan untuk memilih foto</p>
                                                        </div>
                                                    </div>
                                            }
                                        </label>
                                        {
                                            identityError !== null && (
                                                <small className="my-2 text-rose-600 text-xs font-semibold">{identityError}</small>
                                            )
                                        }
                                        <input onChange={e => handleFile(e, 'identity')} accept={allowedFileExts.join(",")} type="file" name="identityPhoto" id="identityUploadInput" className="form-file mt-2 !hidden" />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                                    <div className="flex flex-col">
                                        <label htmlFor="npwpUploadInput" className="text-base font-semibold text-gray-500">
                                            Upload Foto NPWP
                                            {
                                                npwpPreview !== null
                                                ?   <div className="w-full rounded-lg aspect-video group relative overflow-hidden cursor-pointer bg-white shadow-lg p-1">
                                                        <Image src={npwpPreview} alt="NPWP Preview" className="w-full h-full rounded-lg aspect-video object-cover" width={200} height={100} />
                                                        <div className="absolute hidden inset-1 rounded-lg bg-black/50 group-hover:grid place-items-center">
                                                            <span></span>
                                                            <ViewfinderCircleIcon className="w-10 h-10 text-white" />
                                                            <p className="text-center text-gray-200">Tekan untuk memilih foto</p>
                                                        </div>
                                                    </div>
                                                :
                                                    <div className="cursor-pointer mt-2 w-full rounded-lg border-2 border-dashed border-gray-300/60 bg-gray-100 p-3 grid place-items-center aspect-video">
                                                        <div className="flex items-center justify-center flex-col">
                                                            <CameraIcon className="w-6 h-6" />
                                                            <p className="text-center text-gray-700">Tekan untuk memilih foto</p>
                                                        </div>
                                                    </div>
                                            }
                                        </label>
                                        {
                                            npwpError !== null && (
                                                <small className="my-2 text-rose-600 text-xs font-semibold">{npwpError}</small>
                                            )
                                        }
                                        <input onChange={e => handleFile(e, 'npwp')} accept={allowedFileExts.join(",")} type="file" name="npwpPhoto" id="npwpUploadInput" className="form-file mt-2 !hidden" />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/3 p-2">
                                    <div className="flex flex-col">
                                        <label htmlFor="jobSelectionInput" className="text-base font-semibold text-gray-500">Pekerjaan</label>
                                        <Combobox>
                                            <Combobox.Input id="jobSelectionInput" showButton placeholder="Pilih Pekerjaan Anda" className="select-all w-full px-1 text-base font-semibold text-gray-900 border-0 border-b border-gray-300 focus:border-gray-500 outline-none focus:outline-none focus:ring-0 cursor-pointer" onChange={(e) => setQuery(e.target.value)} />
                                            <Combobox.Container className="z-30 left-0">
                                                <Combobox.Header>
                                                    <div className="flex items-center justify-between">
                                                        <h5 className="text-base font-semibold text-gray-900">Cari Pekerjaan</h5>
                                                        <button className="w-8 h-8 rounded-full grid place-items-center border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 hocus:bg-gray-100" type="button">
                                                            <XMarkIcon className="w-6 h-6" />
                                                        </button>
                                                    </div>
                                                </Combobox.Header>
                                                <Combobox.Options>
                                                    {
                                                        queriedJobs.map(qJob => {
                                                            return (
                                                                <Combobox.Option as="button" key={qJob} value={qJob} className="w-full bg-white hocus:bg-gray-100 outline-none focus:outline-none ring-0 focus:ring-0 transition duration-200 flex items-center justify-start space-x-2 px-3 py-2 text-sm font-semibold text-gray-900 tracking-wider cursor-pointer">
                                                                    {qJob}
                                                                </Combobox.Option>
                                                            )
                                                        })
                                                    }
                                                </Combobox.Options>
                                            </Combobox.Container>
                                        </Combobox>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-end p-2">
                                <button className="btn-rose justify-between w-full md:w-auto"><span></span> Daftar <PaperAirplaneIcon className="w-5 h-5 ml-2" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default PayLater;