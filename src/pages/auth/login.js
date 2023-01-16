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

const Login = () => {
    const router = useRouter()
    
    const [loading, setLoading] = useState(false)
    const [loginCredential, setLoginCredential] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const [message, setMessage] = useState(null)

    const { login } = useAuth({ middleware: "guest", redirectIfAuthenticated: "/" })

    const handleLogin = async () => {
        await login({
            setLoading: setLoading,
            setErrors: setErrors,
            login: loginCredential,
            password
        })
    }

    const loginWith = (provider) => {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/social/${provider}/`
    }
    
    useEffect(() => {
        if (router.query.message) {
            setMessage(router.query.message)
            router.replace(router.pathname)
        }
    }, [router])
    
    return (
        <GuestLayout title="Login">
            <div className="w-full grid place-items-center min-h-screen bg-cover bg-no-repeat bg-center">
                <div className="w-full sm:max-w-md p-3">
                    <div className="flex flex-col items-center justify-center mb-2">
                        <Link href="/">
                            <Image src={btwLogo} alt="BTW Logo" className="h-10 w-auto" />
                        </Link>
                        <h2 className="text-xl font-bold text-gray-800 text-center">
                            Log in
                        </h2>
                        <p className="text-center">Log in untuk memesan lebih mudah</p>
                    </div>
                    
                    <div className="w-full px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg">
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
                            message !== null && (
                                <Alert type="success" title="Sukses!">{message}</Alert>
                            )
                        }
                        <Input placeholder="johndoe@example.com / +6281234567890" type="text" id="loginCredential" name="loginCredential" label="Email atau Nomor Telepon" className="mb-3" onChange={(e) => setLoginCredential(e.target.value)} />
                        <Input onEnter={handleLogin} placeholder="**********" type="password" id="passwordInput" name="passwordInput" label="Password" className="mb-3" onChange={(e) => setPassword(e.target.value)} />

                        <div className="my-2">
                            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Lupa password?</a>
                        </div>

                        <button type="button" className="btn-rose w-full relative" disabled={loading} onClick={handleLogin}>
                            {
                                loading && (
                                    <SpinnerIcon className="text-white w-5 h-5 animate-spin absolute right-2 top-2" />
                                )
                            }
                            <span>Log in</span>
                        </button>
                        <div className="flex items-center justify-center my-2">
                            <hr className="w-10 border-t border-gray-300" />
                            <span className="text-center w-auto text-xs text-gray-600 font-medium mx-2">Belum memiliki akun?</span>
                            <hr className="w-10 border-t border-gray-300" />
                        </div>
                        <Link href="/auth/register" className="btn-light w-full">Daftar</Link>
                        <div className="flex items-center justify-center my-2">
                            <hr className="w-10 border-t border-gray-300" />
                            <span className="text-center w-auto text-xs text-gray-600 font-medium mx-2">Atau masuk lebih mudah dengan</span>
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