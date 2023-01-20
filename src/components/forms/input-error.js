import { ExclamationCircleIcon } from "@heroicons/react/24/outline"

export const InputError = ({ errors }) => {
    if (!errors) return null

    return (
        <div className="flex flex-col mb-3 mt-0.5">
            {errors.map((error, i) => (
                <div className="flex items-center space-x-1" key={i}>
                    <ExclamationCircleIcon className="w-4 h-4 text-red-500" />
                    <p className="text-xs text-red-600 font-medium">{error}</p>
                </div>
            ))}
        </div>
    )
}