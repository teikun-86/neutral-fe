import { useForm } from "@/hooks/form";
import { useLocale } from "@/hooks/locale";
import modalState from "@/hooks/modal";
import { axios } from "@/libs/axios";
import { splitString } from "@/util";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { SpinnerIcon } from "../icons";
import { Modal } from "../modal";
import { InputFile } from "./file";
import { InputError } from "./input-error";

const UploadGuestMap = ({
    reservation,
    reload = () => { },
}) => {
    const { __ } = useLocale()
    const [modalOpen, setModalOpen] = useRecoilState(modalState)

    const { data, isDirty, handleChange, setData } = useForm({
        reservation_id: reservation.id,
        file: null
    })

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const [preview, setPreview] = useState(null)

    const handleFile = (e) => {
        if (e.target.files[0]) {
            let file = e.target.files[0]
            handleChange('file', file)
            // get file size in MB


            setPreview({
                name: file.name,
                size: file.size / 1024,
                extension: file.name.split('.').pop()
            })
            return;
        }
        handleChange('file', null)
        setPreview(null)
    }

    const uploadGuestMap = async () => {
        setLoading(true)
        setErrors({})
        if (!data.file) {
            setErrors({
                file: __('File is required')
            })
            setLoading(false)
            return;
        }

        let formData = new FormData()
        formData.append('file', data.file)
        formData.append('id', data.reservation_id)

        let url = {
            hotel: "/hajj-umrah/hotels/reservations/store-guest-map",
            package: "/hajj-umrah/packages/reservations/store-guest-map"
        }

        let type = reservation.hotel ? 'hotel' : 'package'

        await axios.post(url[type], formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res)
            setErrors({})
            toast.success(__(res.data.message))
            setModalOpen('')
            reload()
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            console.log(err.response);
            if (err.response.status === 422) {
                setErrors(err.response.data.errors)
            }

            if (err.response.status === 500) {
                toast.error(__(err.response.data.message))
            }
        })
    }

    useEffect(() => {
        setData({
            ...data,
            reservation_id: reservation.id
        })
    }, [reservation])

    return (
        <Modal size="md" id="uploadGuestMapModal">
            <Modal.Header>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Upload Guest Map</h4>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3 text-start">
                    <InputFile label="File" accept=".xls, .xlsx, .pdf, .doc, .docx" name="file" onChange={handleFile} />
                    <InputError errors={errors.file} />
                </div>
                {
                    preview && (
                        <div className="my-2 w-full">
                            <div className="w-full p-2">
                                <div className="w-full rounded-lg shadow bg-white dark:bg-gray-1000 p-2">
                                    <div className="flex w-full">
                                        <span className="p-2 grid place-items-center rounded-full bg-gray-50 dark:bg-gray-800">
                                            <DocumentIcon className="w-7 h-7 text-gray-700 dark:text-gray-300" />
                                        </span>
                                        <div className="flex flex-col justify-start items-start ml-2">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{splitString(preview.name, 12, preview.extension.length + 1)}</span>
                                            <span className="text-xs font-normal text-gray-500 dark:text-gray-400">{
                                                preview.size > 1024 ?
                                                    `${(preview.size / 1024).toFixed(2)} MB` :
                                                    `${preview.size.toFixed(2)} KB`
                                            }</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    loading && (
                        <div className="absolute inset-0 bg-white-30 dark:bg-black-30 z-20 grid place-items-center">
                            <SpinnerIcon className="w-8 h-8 animate-spin text-rose-600" />
                        </div>
                    )
                }
            </Modal.Body>
            <Modal.Footer className="flex items-center justify-end space-x-3">
                <button disabled={loading} type="button" onClick={() => setModalOpen('')} className="btn-light dark:btn-dark !rounded-full">Close</button>
                <button onClick={uploadGuestMap} className="btn-rose !rounded-full" disabled={data.file === null || loading}>Upload</button>
            </Modal.Footer>
        </Modal>
    );
};

export default UploadGuestMap;