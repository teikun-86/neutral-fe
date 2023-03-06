import Alert from "@/components/alert";
import Combobox from "@/components/combobox";
import { SpinnerIcon } from "@/components/icons";
import { Modal } from "@/components/modal";
import { useForm } from "@/hooks/form";
import { useLocale } from "@/hooks/locale";
import modalState from "@/hooks/modal";
import { axios } from "@/libs/axios";
import { formatIDR, searchString } from "@/util";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { Input } from "../input";
import { InputError } from "../input-error";

const AddPayment = ({
    reservation,
    reload = () => {},
}) => {
    const { __ } = useLocale()
    const [modalOpen, setModalOpen] = useRecoilState(modalState)
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [query, setQuery] = useState('')
    const [errors, setErrors] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { data, handleChange, isDirty } = useForm({
        reservation_id: reservation.id,
        payment_method: null,
        amount: reservation.total_price - reservation.amount_paid,
    })

    const getPaymentMethods = async () => {
        setLoading(true)
        await axios.get("/payment/payment-methods").then(res => {
            setLoading(false)
            let methods = res.data.data
            let method = methods.filter(m => m.enabled)[0]
            if (method) {
                handleChange('payment_method', method)
            }
            setPaymentMethods(res.data.data)
        })
    }

    const queriedPaymentMethods = paymentMethods.filter((paymentMethod) => {
        return searchString(query, paymentMethod.name)
            || searchString(query, paymentMethod.code)
    });

    const handleSubmit = async () => {
        setLoading(true)
        setErrors({})
        if (!data.payment_method) {
            setErrors({
                payment_method: __('Payment method is required')
            })
            setLoading(false)
            return;
        }
        if (!data.amount) {
            setErrors({
                amount: __('Amount is required')
            })
            setLoading(false)
            return;
        }
        
        let url = {
            flight: "/hajj-umrah/flights/reservations/add-payment",
            hotel: "/hajj-umrah/hotels/reservations/add-payment",
            package: "/hajj-umrah/packages/reservations/add-payment",
        }

        let type = reservation.flight ? 'flight' : reservation.hotel ? 'hotel' : 'package'
        
        await axios.post(url[type], {
            id: data.reservation_id,
            payment_method_code: data.payment_method.code,
            amount: data.amount
        }).then(res => {
            setLoading(false)
            setModalOpen(false)
            toast.success(__(res.data.message))
            reload()
        }).catch(err => {
            setLoading(false)
            if (err.response.status === 422) {
                setErrors(err.response.data.errors)
                return;
            }
            setError(err.response.data.message)
        })
    }

    useEffect(() => {
        getPaymentMethods()
    }, [])
    
    return (
        <Modal id="reservation-addPaymentModal" size="lg">
            <Modal.Header>
                <h4 className="text-gray-900 dark:text-white text-lg font-semibold">Add Payment</h4>
            </Modal.Header>
            <Modal.Body>
                <div className="w-full">
                    {
                        error !== null && (
                            <Alert title={__('error')} type="error">{__(error)}</Alert>
                        )
                    }
                    <div className="mb-3">
                        <Combobox value={data.payment_method} onChange={(value) => {
                            handleChange('payment_method', value)
                        }} className="relative">
                            <label htmlFor="companyCombobox" className="absolute -top-2 left-3 text-xs z-10 bg-white dark:bg-gray-900 dark:text-white px-1 transition-all duration-200 font-medium tracking-wide cursor-pointer rounded-lg">{__('payment.method')}</label>
                            <Combobox.Input autoFocus showButton={false} onChange={(e) => setQuery(e.target.value)} type="text" id="departureInput" className="form-input rounded-lg border border-gray-300 dark:border-gray-700 focus:border-sky-600 dark:focus:border-gray-400 transition-all duration-200 ring-0 focus:ring-0 outline-none focus:outline-none w-full block peer/input placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:transition-opacity placeholder:duration-500 disabled:opacity-50 dark:disabled:opacity-80 peer/input disabled:cursor-not-allowed dark:bg-gray-900 dark:text-gray-200 dark:placeholder:text-gray-400" displayValue={(paymentMethod) => paymentMethod?.name ?? ""} />
                            <Combobox.Container className="w-full px-0 py-1 left-0">
                                {
                                    queriedPaymentMethods.length === 0
                                    ? <p className="text-center text-sm text-gray-700 dark:text-gray-300 py-3">No payment method available</p>
                                    : queriedPaymentMethods.map(paymentMethod => {
                                        return <Combobox.Option className="btn-light dark:btn-dark !w-full disabled:!opacity-50 disabled:!cursor-not-allowed !border-0 !justify-start" key={paymentMethod.id} value={paymentMethod} disabled={paymentMethod.enabled}>
                                            {paymentMethod.name}
                                        </Combobox.Option>
                                    })
                                }
                            </Combobox.Container>
                        </Combobox>
                        <InputError errors={errors.payment_method_code} />
                    </div>
                    <div className="mb-3">
                        <Input label={__('payment.amount')} max={reservation.total_price - reservation.amount_paid} noSymbols onlyNumbers type="number" min={1} value={data.amount} onChange={(e) => handleChange('amount', e.target.value)} info={formatIDR(data.amount)}/>
                    </div>
                </div>
                {
                    loading && (
                        <div className="absolute inset-0 w-full bg-white/70 dark:bg-black/70 grid place-items-center z-50">
                            <SpinnerIcon className="w-8 h-8 animate-spin text-rose-600" />
                        </div>
                    )
                }
            </Modal.Body>
            <Modal.Footer className="flex items-center justify-end space-x-2">
                <button className="btn-light dark:btn-dark !rounded-full" disabled={loading} onClick={() => {
                    setModalOpen('')
                }}>Close</button>
                <button className="btn-rose !rounded-full" disabled={loading} onClick={handleSubmit}>
                    Continue
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddPayment;