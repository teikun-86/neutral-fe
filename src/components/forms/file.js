import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

export const InputFile = ({ name, label, accept, withPreview = false, defaultPreview = null, onChange = () => {}, error, ...props }) => {
    const [preview, setPreview] = useState(defaultPreview);
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setFile(file);

            if (withPreview) {
                const reader = new FileReader();

                reader.onloadend = () => {
                    setPreview(reader.result);
                };

                reader.readAsDataURL(file);
            }
        }

        onChange(e);
    };

    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {label}
            </label>
            <div className="flex items-start space-x-3">
                {
                    withPreview && (
                        <div className="w-32 h-32 rounded-full overflow-hidden">
                            <Image src={preview} alt={name} width={200} height={200} className="w-full h-full object-cover" />
                        </div>
                    )
                }
                <div className={`relative mt-1 ${withPreview ? "w-[calc(100%-8.5rem)]" : "w-full"}`}>
                    <input
                        type="file"
                        name={name}
                        id={name}
                        accept={accept}
                        onChange={handleChange}
                        {...props}
                    />
                </div>
            </div>
            {error && (
                <div className="flex items-center justify-start space-x-1 mt-1">
                    <ExclamationCircleIcon className="w-4 h-4 text-rose-600" />
                    <small className="text-xs font-medium text-rose-600">{error}</small>
                </div>
            )}
        </div>
    );
}