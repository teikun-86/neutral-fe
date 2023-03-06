import { useForm } from "@/hooks/form";
import { useLocale } from "@/hooks/locale";
import modalState from "@/hooks/modal";
import { axios } from "@/libs/axios";
import { searchString } from "@/util";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import Alert from "../alert";
import Combobox from "../combobox";
import { SpinnerIcon } from "../icons";
import { Modal } from "../modal";
import { Input } from "./input";
import { InputError } from "./input-error";

const BookPackage = ({
    user,
    pool = false,
    pkg,
    setSelectedPackage,
    ...props
}) => {
    const { __ } = useLocale()
    const router = useRouter()
    const [companies, setCompanies] = useState([])
    const [loading, setLoading] = useState(false)
    const setModalOpen = useSetRecoilState(modalState)
    const [message, setMessage] = useState(null)
    const [errors, setErrors] = useState({})
    const minAmount = 1

    const { data, isDirty, handleChange } = useForm({
        package_id: pkg.id,
        company: user.user_type === 'agent' ? null : user.company,
        amount: minAmount
    })

    const reserve = async () => {
        setLoading(true)
        setErrors({})
        setMessage(null)
        await axios.post("/hajj-umrah/packages/reservations/store", {
            package_id: data.package_id,
            company_id: data.company.id,
            amount: data.amount,
            pool
        }).then(res => {
            setMessage(null)
            setLoading(false)
            setModalOpen('')
            setErrors({})
            const reservation = btoa(JSON.stringify(res.data))
            toast.success("Package reservation created successfully.")
            router.push(`/hajj-and-umrah/package/reservations?_r=${reservation}`)
        }).catch(err => {
            setLoading(false)
            toast.error("Failed to create package reservation.")
            if (err.response.status === 422) {
                setMessage(null)
                setErrors(err.response.data.errors)
                return
            }


            setMessage({
                type: 'error',
                message: err.response.data.message
            })
        })
    }

    const getCompanies = async () => {
        setLoading(true)
        await axios.get("/companies").then(res => {
            setLoading(false)
            setCompanies(res.data.data)
        })
    }

    const [query, setQuery] = useState('')

    const queriedCompanies = query.trim().length === 0
        ? companies
        : companies.filter(company => {
            return searchString(query, company.name)
                || searchString(query, company.email)
                || searchString(query, company.phone)
                || searchString(query, company.ppiu_number)
        })

    useEffect(() => {
        getCompanies()
    }, [])

    return (
        <Modal size="lg" id="reservePackageModal" static onClose={() => {
            setSelectedPackage(null)
        }}>
            <Modal.Header>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Reserve Hotel</h4>
            </Modal.Header>
            <Modal.Body>
                {
                    pool && (
                        <div className="mb-4">
                            <Alert title={__('warning')} type="warning">{__('info.flight.unchangeable')}</Alert>
                        </div>
                    )
                }
                {
                    loading && (
                        <div className="w-full h-full bg-white/70 dark:bg-black/30 absolute inset-0 grid place-items-center z-[50]">
                            <SpinnerIcon className="w-8 h-8 text-rose-600 animate-spin" />
                        </div>
                    )
                }
                {
                    message !== null && (
                        <div className="mb-4">
                            <Alert title={__(message.type)} type={message.type}>{__(message.message)}</Alert>
                        </div>
                    )
                }

                {
                    user.user_type === 'agent' && (
                        <div className="mb-3">
                            <Combobox value={data.company} id="companyCombobox" onChange={(value) => {
                                handleChange('company', value)
                            }}>
                                <label htmlFor="companyCombobox" className="absolute -top-2 left-3 text-xs z-10 bg-white dark:bg-gray-900 dark:text-white px-1 transition-all duration-200 font-medium tracking-wide cursor-pointer rounded-lg">{__('input.select_ppiu')}</label>
                                <Combobox.Input autoFocus showButton={false} onChange={(e) => setQuery(e.target.value)} type="text" id="departureInput" className="form-input rounded-lg border border-gray-300 dark:border-gray-700 focus:border-sky-600 dark:focus:border-gray-400 transition-all duration-200 ring-0 focus:ring-0 outline-none focus:outline-none w-full block peer/input placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:transition-opacity placeholder:duration-500 disabled:opacity-50 dark:disabled:opacity-80 peer/input disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200 dark:placeholder:text-gray-400" displayValue={(company) => company?.name ?? ""} />
                                <Combobox.Container afterLeave={() => {
                                    setQuery('')
                                }} className="!left-0">
                                    <Combobox.Options>
                                        {
                                            queriedCompanies.length === 0
                                                ? (
                                                    <div className="flex items-center justify-center p-4">
                                                        <XMarkIcon className="w-6 h-6 text-gray-400" />
                                                        <span className="ml-2 text-gray-400">Tidak ada data</span>
                                                    </div>
                                                )
                                                : queriedCompanies.map((company, index) => (
                                                    <Combobox.Option className="cursor-pointer" key={index} value={company}>
                                                        <div className="flex items-center p-2 space-x-2">
                                                            <div className="flex flex-col items-start">
                                                                <span className="text-sm font-medium text-gray-900 dark:text-white">{company.name}</span>
                                                                <span className="text-sm text-gray-500 dark:text-gray-400">PPIU: {company.ppiu_number}</span>
                                                            </div>
                                                        </div>
                                                    </Combobox.Option>
                                                ))
                                        }
                                    </Combobox.Options>
                                </Combobox.Container>
                            </Combobox>
                            <InputError errors={errors.company_id} />
                        </div>
                    )
                }
                <div className="mb-3">
                    <Input type="number" name="amount" min={minAmount} max={pkg.packages_left} label="Package Amount" value={data.amount} onChange={(e) => handleChange('amount', e.target.value)} noDecimal />
                    <InputError errors={errors.amount} />
                </div>
            </Modal.Body>
            <Modal.Footer className="flex items-center justify-end space-x-3">
                <button disabled={loading} className="btn-light dark:btn-dark" onClick={() => setModalOpen('')}>Close</button>
                <button disabled={loading || (
                    user.user_type === 'agent' ? data.company === null : false
                ) || (Number(data.amount) < minAmount || Number(data.amount) > pkg.packages_left) || minAmount === 0} className="btn-rose" onClick={reserve}>Reserve</button>
            </Modal.Footer>
        </Modal>
    );
};

export default BookPackage;