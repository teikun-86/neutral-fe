import { isEqual } from "lodash"
import { useState } from "react"

export const useForm = (initialValues) => {
    const [data, setData] = useState(initialValues)

    const isDirty = isEqual(data, initialValues)

    const handleChange = (field, value) => {
        setData({
            ...data,
            [field]: value
        })
    }

    return {
        data,
        setData,
        handleChange,
        isDirty,
    }
}