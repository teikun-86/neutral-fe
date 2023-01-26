import { useAuth } from "@/hooks/auth"
import GuestLayout from "@/layouts/guest"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import logo from "@/assets/images/tripla-logo.png";
import Alert from "@/components/alert"
import { SpinnerIcon } from "@/components/icons"
import AuthFooter from "@/components/auth/footer"
import { useLocale } from "@/hooks/locale"
import { AuthCard } from "@/components/auth"
import { AuthContainer } from "@/components/auth/container"


const VerifyEmail = () => {
    const { __ } = useLocale()

    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/',
    })

    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)

    return (
        <GuestLayout title={__('auth.verify_email')}>
            <div className="w-full grid place-items-center min-h-screen bg-cover bg-no-repeat bg-center">
                <AuthContainer title={__('auth.verify_email')}>
                    <AuthCard className="w-full px-6 py-4 bg-white dark:bg-gray-900 shadow-md overflow-hidden rounded-lg relative">
                        {
                            loading && (
                                <div className="w-full absolute inset-0 h-full bg-white/80 dark:bg-black/60 grid place-items-center">
                                    <SpinnerIcon className="h-10 w-10 text-rose-600 animate-spin" />
                                </div>
                            )
                        }
                        {
                            status === 'verification-link-sent' && (
                                <Alert type="success" title="Sukses!" className="mb-4 font-medium text-sm text-green-600">
                                    {__('auth.verification_email_sent')}
                                </Alert>
                            )
                        }

                        <p className="text-center dark:text-gray-300">
                            {__('auth.verify_email_desc')}
                        </p>

                        <div className="mt-4">
                            <button className="btn-rose w-full mb-3"
                                onClick={() => resendEmailVerification({ setStatus, setLoading })}>
                                {__('auth.resend_verification_link')}
                            </button>

                            <button
                                type="button"
                                className="btn-light dark:btn-dark !w-full"
                                onClick={logout}>
                                {__('nav.logout')}
                            </button>
                        </div>
                    </AuthCard>
                </AuthContainer>
            </div>
        </GuestLayout>
    )
}

export default VerifyEmail