import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import GuestLayout from '@/layouts/guest'
import { Input } from '@/components/forms'
import { SpinnerIcon } from '@/components/icons'
import Alert from '@/components/alert'
import Image from 'next/image'
import btwLogo from "@/assets/images/btw-logo.png";

const PasswordReset = () => {
    const router = useRouter()

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
        <GuestLayout title="Reset Password">
            <div className="w-full grid place-items-center min-h-screen bg-cover bg-no-repeat bg-center">
                <div className="w-full sm:max-w-md p-3">
                    <div className="flex flex-col items-center justify-center mb-2">
                        <Link href="/">
                            <Image src={btwLogo} alt="BTW Logo" className="h-10 w-auto" />
                        </Link>
                        <h2 className="text-xl font-bold text-gray-800 text-center">
                            Lupa Password?
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
                        <div className="pt-4">

                            <Input type="email" name="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="john@example.com" autoFocus invalidMessage="Isi dengan alamat email yang valid!" />
                            <Input placeholder="**********" type="password" id="passwordInput" name="passwordInput" label="Password" onChange={(e) => setPassword(e.target.value)} />
                            <Input placeholder="**********" type="password" id="passwordConfirmInput" name="passwordConfirmInput" label="Konfirmasi Password" onChange={(e) => setPasswordConfirmation(e.target.value)} />

                            <button disabled={password !== passwordConfirmation || password.length === 0 || passwordConfirmation.length === 0} className="btn-rose w-full mb-3"
                                onClick={handleResetPassword}>
                                Reset Password
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-2">
                        <p className="text-center text-xs">Copyright &copy; {(new Date()).getFullYear()} Bumi Tihamah Wisata</p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}

export default PasswordReset