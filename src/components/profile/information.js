import { useLocale } from "@/hooks/locale"
import { ViewfinderCircleIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { useEffect, useState } from "react"
import Alert from "../alert"
import { Input } from "../forms"
import { SpinnerIcon } from "../icons"

export const ProfileInformation = ({ user, updateProfile = async () => { }, resendEmailVerification = () => { } }) => {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [name, setName] = useState(user.name)
    const [avatarPreview, setAvatarPreview] = useState(user.avatar)
    const [avatar, setAvatar] = useState(null)
    const { __ } = useLocale()

    const update = () => {
        updateProfile({
            setLoading,
            setErrors,
            setStatus,
            name: name,
            avatar: avatar,
            after: () => {
                setAvatar(null)
            }
        })
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setAvatar(file);
            const reader = new FileReader();

            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };

            reader.readAsDataURL(file);
        }
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
                    {__('basic_info')}
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {__('your_basic_info')}
                </p>
            </header>

            <main className="my-4 max-w-3xl">
                <div className="block">
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

                    <div className="flex items-center justify-center md:justify-start">
                        <label htmlFor="avatarInput" className="relative w-32 h-32 cursor-pointer rounded-full overflow-hidden group p-1 shadow">
                            <Image src={avatarPreview} priority alt={user.name} width={500} height={500} className="w-full h-full rounded-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                                <div className="flex items-center flex-col">
                                    <ViewfinderCircleIcon className="w-8 h-8 text-white" />
                                    <span className="text-white text-xs font-medium">{__('input.change_avatar')}</span>
                                </div>
                            </div>
                        </label>

                        <input type="file" id="avatarInput" className="!hidden" onChange={handleAvatarChange} accept="image/jpg,image/jpeg,image/png,image/gif,image/webp,image/svg" />
                    </div>

                    <Input id="nameInput" className="mt-4" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} label={__('input.name')} autoCapitalize info={__('info.name')} />
                </div>
            </main>

            <footer className="flex items-center justify-end max-w-3xl">
                <button disabled={name.trim() === user.name && avatar === null} onClick={update} className="btn-rose rounded-full">{__('command.save')}</button>
            </footer>
        </section>
    )
}