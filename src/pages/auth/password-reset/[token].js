import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import GuestLayout from '@/layouts/guest'
import { Input } from '@/components/forms'
import { SpinnerIcon } from '@/components/icons'
import Alert from '@/components/alert'
import Image from 'next/image'
import logo from "@/assets/images/tripla-logo.png";
import AuthFooter from '@/components/auth/footer'
import { useLocale } from '@/hooks/locale'
import { AuthCard } from '@/components/auth'
import { AuthContainer } from '@/components/auth/container'
import { InputError } from '@/components/forms/input-error'

const PasswordReset = () => {
    const router = useRouter()
    const { __ } = useLocale()

    const { resetPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const handleResetPassword = () => {
        resetPassword({
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
            setStatus,
            setLoading
        })
    }

    useEffect(() => {
        setEmail(router.query.email || '')
    }, [router.query.email])

    return (
        <GuestLayout title={__('reset_password')}>
            <div className="w-full grid place-items-center min-h-screen bg-cover bg-no-repeat bg-center">
                <AuthContainer title={__('reset_password')}>
                    <AuthCard>
                        {
                            loading && (
                                <div className="w-full absolute inset-0 h-full bg-white/80 dark:bg-black/60 grid place-items-center z-50">
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
                        <div className="pt-4">

                            <div className="mb-4">
                                <Input type="email" name="email" label={__('input.email')} value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="john@example.com" readOnly invalidMessage="Isi dengan alamat email yang valid!" />
                                <InputError errors={errors.email} />
                            </div>
                            <div className="mb-4">
                                <Input placeholder="**********" type="password" id="passwordInput" name="passwordInput" label={__('input.password')} onChange={(e) => setPassword(e.target.value)} />
                                <InputError errors={errors.password} />
                            </div>
                            <Input className="mb-4" placeholder="**********" type="password" id="passwordConfirmInput" name="passwordConfirmInput" label={__('input.confirm_password')} onChange={(e) => setPasswordConfirmation(e.target.value)} />

                            <button disabled={password !== passwordConfirmation || password.length === 0 || passwordConfirmation.length === 0} className="btn-rose w-full mb-3"
                                onClick={handleResetPassword}>
                                {__('reset_password')}
                            </button>
                        </div>
                    </AuthCard>
                </AuthContainer>
            </div>
        </GuestLayout>
    )
}

export default PasswordReset