import { useAuth } from "@/hooks/auth"
import GuestLayout from "@/layouts/guest"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import btwLogo from "@/assets/images/btw-logo.png";
import Alert from "@/components/alert"
import { SpinnerIcon } from "@/components/icons"


const VerifyEmail = () => {

    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/',
    })

    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)

    return (
        <GuestLayout>
            <div className="w-full grid place-items-center min-h-screen bg-cover bg-no-repeat bg-center">
                <div className="w-full sm:max-w-md p-3">
                    <div className="flex flex-col items-center justify-center mb-2">
                        <Link href="/">
                            <Image src={btwLogo} alt="BTW Logo" className="h-10 w-auto" />
                        </Link>
                        <h2 className="text-xl font-bold text-gray-800 text-center">
                            Verifikasi Email
                        </h2>
                    </div>

                    <div className="w-full px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg relative">
                        {
                            loading && (
                                <div className="w-full absolute inset-0 h-full bg-white/80 grid place-items-center">
                                    <SpinnerIcon className="h-10 w-10 text-rose-600 animate-spin" />
                                </div>
                            )
                        }
                        {
                            status === 'verification-link-sent' && (
                                <Alert type="success" title="Sukses!" className="mb-4 font-medium text-sm text-green-600">
                                    Link verifikasi telah dikirimkan ke email anda. Silahkan cek email anda.
                                </Alert>
                            )
                        }

                        <p className="text-center">
                            Terima kasih telah mendaftar! Sebelum memulai, mohon verifikasi email anda dengan mengklik link yang telah kami kirimkan ke email anda. Jika anda tidak menerima email, Klik tombol di bawah ini untuk mengirim ulang link verifikasi.
                        </p>

                        <div className="mt-4">
                            <button className="btn-rose w-full mb-3"
                                onClick={() => resendEmailVerification({ setStatus, setLoading })}>
                                Kirim Ulang Link Verifikasi
                            </button>

                            <button
                                type="button"
                                className="btn-light w-full text-gray-800"
                                onClick={logout}>
                                Logout
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

export default VerifyEmail