import { useLocale } from "@/hooks/locale"

export const UpdatePassword = () => {

    const { __ } = useLocale()

    return (
        <section className="w-full p-3 rounded-lg bg-white dark:bg-gray-900 shadow relative my-4">

            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {__('reset_password')}
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {__('reset_password_desc')}
                </p>
            </header>

            <main className="my-4 max-w-3xl">
                <p className="text-gray-800 dark:text-gray-200">{__('reset_password_info')}</p>
            </main>
        </section>
    )
}