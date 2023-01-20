import GuestLayout from "@/layouts/guest";
import btwLogo from "@/assets/images/btw-logo.png";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";
import Image from "next/image";
import { Input } from "@/components/forms";
import { FacebookIcon, GoogleIcon, SpinnerIcon } from "@/components/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import Alert from "@/components/alert";
import { InputError } from "@/components/forms/input-error";
import { useLocale } from "@/hooks/locale";

const Login = () => {
    const router = useRouter()
    
    const [loading, setLoading] = useState(false)
    const [loginCredential, setLoginCredential] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState(null)
    const { __ } = useLocale()

    const { login } = useAuth({ middleware: "guest", redirectIfAuthenticated: "/" })

    const handleLogin = async () => {
        await login({
            setLoading: setLoading,
            setErrors: setErrors,
            setStatus,
            login: loginCredential,
            password
        })
    }

    const loginWith = (provider) => {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/social/${provider}?lang=${router.locale}`
    }
    
    useEffect(() => {
        if (router.query.message) {
            setStatus(router.query.message)
            router.replace(router.pathname)
        }
    }, [router])

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    }, [router.query.reset, errors])
    
    return (
        <GuestLayout title={__('nav.login')}>
            <div className="w-full grid place-items-center min-h-screen bg-cover bg-no-repeat bg-center">
                <div className="w-full sm:max-w-md p-3">
                    <div className="flex flex-col items-center justify-center mb-2">
                        <Link href="/">
                            <Image src={btwLogo} alt="BTW Logo" className="h-10 w-auto" />
                        </Link>
                        <h2 className="text-xl font-bold text-gray-800 text-center">
                            {__('nav.login')}
                        </h2>
                        <p className="text-center">{__('title.login', {
                            link: process.env.NEXT_PUBLIC_APP_NAME
                        })}</p>
                    </div>
                    
                    <div className="w-full px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg relative">
                        {
                            loading && (
                                <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-50">
                                    <SpinnerIcon className="w-10 h-10 text-rose-600 animate-spin" />
                                </div>
                            )
                        }
                        {
                            errors.length > 0 && (
                                <Alert type="error" title="Oops! Terjadi kesalahan!">
                                    <ul className="list-disc list-inside px-1">
                                        {
                                            errors.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))
                                        }
                                    </ul>
                                </Alert>
                            )
                        }
                        {
                            status && (
                                <Alert type="success" title="Sukses!">{status}</Alert>
                            )
                        }
                        <div className="my-3">
                            <Input className="mb-0" value={loginCredential} placeholder="johndoe@example.com / +6281234567890" type="text" id="loginCredential" name="loginCredential" label={__('input.email_or_phone')} onChange={(e) => setLoginCredential(e.target.value)} />
                            <InputError errors={errors.login} />
                        </div>
                        <div className="my-3">
                            <Input className="mb-0" onEnter={handleLogin} placeholder="**********" type="password" id="passwordInput" name="passwordInput" label={__('input.password')} onChange={(e) => setPassword(e.target.value)} />
                            <InputError errors={errors.password} />
                        </div>

                        <button type="button" className="btn-rose w-full relative" disabled={loading} onClick={handleLogin}>
                            <span>{__('nav.login')}</span>
                        </button>
                        <div className="flex items-center justify-center my-2">
                            <hr className="w-10 border-t border-gray-300" />
                            <span className="text-center w-auto text-xs text-gray-600 font-medium mx-2">{__('dont_have_account')}</span>
                            <hr className="w-10 border-t border-gray-300" />
                        </div>
                        <Link href="/auth/register" className="btn-light w-full">{__('nav.register')}</Link>
                        <div className="flex items-center justify-center my-2">
                            <hr className="w-10 border-t border-gray-300" />
                            <span className="text-center w-auto text-xs text-gray-600 font-medium mx-2">{__('login_easier')}</span>
                            <hr className="w-10 border-t border-gray-300" />
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            <button onClick={() => loginWith("facebook")} className="btn-light">
                                <FacebookIcon className="w-6 h-6 mr-2" />
                                Facebook
                            </button>
                            <button onClick={() => loginWith('google')} className="btn-light">
                                <GoogleIcon className="w-6 h-6 mr-2" />
                                Google
                            </button>
                        </div>

                        <div className="my-2 flex items-center justify-center">
                            <Link href="/auth/forgot-password" className="btn-text text-gray-700 py-0 underline underline-offset-2">{__('forgot_password')}</Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-2">
                        <p className="text-center text-xs">Copyright &copy; {(new Date()).getFullYear()} Bumi Tihamah Wisata</p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default Login;