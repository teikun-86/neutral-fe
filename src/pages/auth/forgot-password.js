import { useAuth } from "@/hooks/auth"
import GuestLayout from "@/layouts/guest"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import btwLogo from "@/assets/images/btw-logo.png";
import Alert from "@/components/alert"
import { SpinnerIcon } from "@/components/icons"
import { Input } from "@/components/forms"
import { useLocale } from "@/hooks/locale"
import AuthFooter from "@/components/auth-footer"


const ForgotPassword = () => {

    const { __ } = useLocale();

    const { forgotPassword } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    })

    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    useEffect(() => {
        if (status) {
            setTimeout(() => {
                setStatus(null)
            }, 5000)
        }
    }, [status])

    return (
        <GuestLayout title={__('forgot_password')}>
            <div className="w-full grid place-items-center min-h-screen bg-cover bg-no-repeat bg-center">
                <div className="w-full sm:max-w-md p-3">
                    <div className="flex flex-col items-center justify-center mb-2">
                        <Link href="/">
                            <Image src={btwLogo} alt="BTW Logo" className="h-10 w-auto" />
                        </Link>
                        <h2 className="text-xl font-bold text-gray-800 text-center">
                            {__('forgot_password')}
                        </h2>
                    </div>

                    <div className="w-full px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg relative">
                        {
                            loading && (
                                <div className="w-full absolute inset-0 h-full bg-white/80 grid place-items-center z-50">
                                    <SpinnerIcon className="h-10 w-10 text-rose-600 animate-spin" />
                                </div>
                            )
                        }
                        {
                            status && (
                                <Alert type="success" title="Sukses!" className="mb-4 font-medium text-sm text-green-600">
                                    {status}
                                </Alert>
                            )
                        }
                        {
                            errors.length > 0 && (
                                <Alert type="error" title="Terjadi Kesalahan!" className="mb-4 font-medium text-sm text-red-600">
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

                        <p className="text-center">
                            {__('forgot_password_desc')}
                        </p>

                        <div className="mt-4">
                            
                            <Input type="email" name="email" label={__('input.email')} value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="john@example.com" autoFocus invalidMessage="Isi dengan alamat email yang valid!" />
                            
                            <button disabled={!email || !isEmailValid} className="btn-rose w-full mb-3"
                                onClick={() => forgotPassword({ setErrors, setStatus, setLoading, email: email })}>
                                {__('send_password_reset_link')}
                            </button>

                            <Link
                                className="btn-light w-full text-gray-800 mt-3"
                                href="/auth/login">
                                {__('nav.login')}
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-2">
                        <AuthFooter />
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}

export default ForgotPassword