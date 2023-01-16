import { useEffect, useState } from "react"
import Alert from "../alert"
import { Input } from "../forms"
import { SpinnerIcon } from "../icons"

export const UpdatePassword = ({
    user,
    updatePassword = async () => { },
}) => {
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const update = () => {
        updatePassword({
            setLoading,
            setErrors,
            setStatus,
            password: password,
            password_confirmation: passwordConfirmation,
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
        <section className="w-full p-3 rounded-lg bg-white shadow relative my-4">
            {
                loading && (
                    <div className="absolute z-[60] inset-0 bg-white/50 grid place-items-center w-full h-full">
                        <SpinnerIcon className="w-10 h-10 animate-spin text-rose-600" />
                    </div>
                )
            }
            {
                status === 'success' && (
                    <Alert type="success" title="Sukses!" className="mb-6">
                        Berhasil memperbarui password.
                    </Alert>
                )
            }

            {
                errors.length > 0 && (
                    <Alert type="error" title="Terjadi Kesalahan!" className="mb-6">
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

            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Ubah Password
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Ubah password untuk meningkatkan keamanan akun anda.
                </p>
                {
                    (user.google_id !== null || user.facebook_id !== null) && (
                        <p className="text-sm text-gray-700 mb-4">
                            Password tidak dapat diubah karena anda login menggunakan akun {user.google_id !== null ? 'Google' : 'Facebook'}.
                        </p>
                    )
                }
            </header>

            <main className="my-4 max-w-xl">
                <Input id="password" disabled={user.google_id !== null || user.facebook_id !== null} type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} label="Password" required />
                <Input id="passwordConfirmation" disabled={user.google_id !== null || user.facebook_id !== null} type="password" name="password_confirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} label="Konfirmasi Password" required />
            </main>

            <footer className="flex items-center justify-end max-w-xl">
                <button disabled={user.google_id !== null || user.facebook_id !== null} onClick={update} className="btn-rose rounded-full">Update</button>
            </footer>
        </section>
    )
}