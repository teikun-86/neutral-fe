import { useLocale } from "@/hooks/locale"
import { useEffect, useState } from "react"
import Alert from "../alert"
import { Input } from "../forms"
import { SpinnerIcon } from "../icons"

export const ProfileCredentials = ({
    user,
    updateCredentials = async () => { },
}) => {
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone ?? '')

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const { __ } = useLocale()

    const update = () => {
        updateCredentials({
            setLoading,
            setErrors,
            setStatus,
            email: email,
            phone: phone,
        })
    }

    useEffect(() => {
        if (status !== null) {
            setTimeout(() => {
                setStatus(null)
            }, 5000)
        }
    }, [status])

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

            <main className="my-4 max-w-xl">
                {
                    status === 'success' && (
                        <Alert type="success" title={__('success')} className="mb-6">
                            {__('profile.updated')}
                        </Alert>
                    )
                }

                {
                    errors.length > 0 && (
                        <Alert type="error" title={__('something_wrong')} className="mb-6">
                            <ul className="list-disc list-inside">
                                {
                                    errors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))
                                }
                            </ul>
                        </Alert>
                    )
                }
                <Input id="email" disabled={user.google_id !== null || user.facebook_id !== null} type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} label={__('input.email')} invalidMessage="Isi dengan alamat email yang valid!" required info={
                    user.google_id !== null || user.facebook_id !== null
                        ? __('email.nochange', {
                            provider: user.google_id !== null ? 'Google' : 'Facebook'
                        })
                        : null
                } />
                <Input id="phone" className="mt-3" type="text" onlyNumbers name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} label={__('input.phone')} required />
            </main>

            <footer className="flex items-center justify-end max-w-xl">
                <button disabled={
                    loading ||
                    user.email === email && (
                        user.phone === null ? phone === '' : user.phone === phone
                    )
                } onClick={update} className="btn-rose rounded-full">{__('command.save')}</button>
            </footer>
        </section>
    )
}