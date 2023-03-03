import { useLocale } from "@/hooks/locale"
import { axios } from "@/libs/axios"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { useEffect, useState } from "react"
import Alert from "../alert"
import { Dropdown } from "../dropdown"
import { Input } from "../forms"
import { InputError } from "../forms/input-error"
import { SpinnerIcon } from "../icons"

export const ProfileCredentials = ({
    user,
    updateCredentials = async () => { },
    resendEmailVerification = async () => {}
}) => {
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone ?? '')
    const [countryCode, setCountryCode] = useState(user.country ?? null)

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const [countryCodes, setCountryCodes] = useState([])
    const [countryQuery, setCountryQuery] = useState('')

    const isDirty = email !== user.email || phone !== user.phone || countryCode?.id !== user.country?.id

    const { __ } = useLocale()

    const update = () => {
        updateCredentials({
            setLoading,
            setErrors,
            setStatus,
            email: email,
            phone: phone,
            country_id: countryCode.id,
        })
    }

    const getCountries = async () => {
        await axios.get('/countries').then(res => {
            setCountryCodes(res.data.data)
        })
    }

    useEffect(() => {
        if (status !== null) {
            setTimeout(() => {
                setStatus(null)
            }, 5000)
        }
    }, [status])

    useEffect(() => {
        getCountries()
    }, [])

    return (
        <section className="w-full p-3 rounded-lg bg-white dark:bg-gray-900 shadow relative my-4">
            {
                loading && (
                    <div className="absolute z-[60] inset-0 bg-white/50 dark:bg-black/50 grid place-items-center w-full h-full">
                        <SpinnerIcon className="w-10 h-10 animate-spin text-rose-600" />
                    </div>
                )
            }

            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {__('email_and_phone')}
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {__('email_and_phone_desc')}
                </p>
            </header>

            <main className="my-4 max-w-3xl">
                {
                    status === 'success' && (
                        <Alert type="success" title={__('success')} className="mb-6">
                            {__('profile.updated')}
                        </Alert>
                    )
                }
                {
                    status === 'verification-link-sent' && (
                        <Alert type="success" title="Sukses!" className="mb-6">
                            {__('auth.verification_email_sent')}
                        </Alert>
                    )
                }
                {
                    user.email_verified_at === null && (
                        <Alert type="primary" className="mb-6" title="Email Belum Terverivikasi">
                            <p>Email anda belum diverifikasi. Silahkan cek email anda untuk melakukan verifikasi.
                                Jika tidak ada email, silahkan klik tombol <strong>Kirim Ulang</strong> untuk mengirim ulang email verifikasi.
                            </p>
                            <div className="flex items-center justify-end">
                                <button onClick={() => resendEmailVerification({ setStatus, setLoading })} className="btn-rose rounded-full">Kirim Ulang</button>
                            </div>
                        </Alert>
                    )
                }
                <div className="my-3">
                    <Input id="email" disabled={user.is_google || user.is_facebook} type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} label={__('input.email')} invalidMessage="Isi dengan alamat email yang valid!" required info={
                        user.is_google || user.is_facebook
                            ? __('email.nochange', {
                                provider: user.is_google ? 'Google' : 'Facebook'
                            })
                            : null
                    } />
                    <InputError errors={errors.email} />
                </div>
                <div className="flex items-start space-x-2 my-3">
                    <div className="w-1/4">
                        <Dropdown className="w-full z-50">
                            {({ open }) => (
                                <>
                                    <Dropdown.Button as="div" className="relative">
                                        <button className="w-full bg-white dark:bg-gray-900 form-input border-gray-300 dark:border-gray-700 focus:border-sky-600 ring-0 focus:ring-0 outline-none focus:outline-none transition-all text-start cursor-pointer duration-200 rounded-lg h-[2.6rem] flex items-center space-x-1" >
                                            {
                                                countryCode === null
                                                ? <span>Select Country Code</span>
                                                : <>
                                                    <span className="w-6 h-3 grid place-items-center mr-2">
                                                        <Image src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode?.code}.svg`} width={100} height={100} alt={countryCode?.name} />
                                                    </span>
                                                    <span className="text-gray-900 dark:text-gray-100 font-medium hidden sm:flex sm:items-center">
                                                        <span className="mr-2">{countryCode?.code}</span> ({countryCode?.dial_code})
                                                    </span>
                                                </>
                                            }
                                        </button>
                                        <ChevronDownIcon className={`w-5 h-5 absolute top-3 right-3 ${open ? "rotate-180 " : ""} transition-all cursor-pointer duration-200 dark:text-gray-300`} />
                                    </Dropdown.Button>
                                    <Dropdown.Content afterLeave={() => setCountryQuery('')} className="left-0 max-h-72 overflow-y-auto gray-scrollbar pt-0">
                                        <div className="w-full px-2 py-1 bg-white dark:bg-gray-900 sticky top-0">
                                            <Input autoFocus type="text" id="searchCountry" onChange={(e) => setCountryQuery(e.target.value)} label={__('input.call_code')} />
                                        </div>
                                        {
                                            countryCodes.filter((country) => {
                                                return countryQuery.trim().length <= 0 ? true : country.name.toLowerCase().includes(countryQuery.toLowerCase()) || country.dial_code.toLowerCase().includes(countryQuery.toLowerCase()) || country.code.toLowerCase().includes(countryQuery.toLowerCase())
                                            }).map((country, idx) => {
                                                const flagUrl = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code}.svg`;
                                                return (
                                                    <Dropdown.Item className="flex items-center justify-start text-start" key={idx} onClick={() => setCountryCode(country)}>
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
                    <div className="w-3/4">
                        <Input className="mb-0" placeholder="81234567890" type="text" id="phone" name="phone" label={__('input.phone')} value={phone} onChange={(e) => setPhone(e.target.value)} onlyNumbers />
                        <InputError errors={errors.phone} />
                    </div>
                </div>
            </main>

            <footer className="flex items-center justify-end max-w-3xl">
                <button disabled={
                    loading || !isDirty
                } onClick={update} className="btn-rose rounded-full">{__('command.save')}</button>
            </footer>
        </section>
    )
}