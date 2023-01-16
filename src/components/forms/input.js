import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon, InformationCircleIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

export const Input = ({ 
    className = "",
    label = "My Input",
    autoCapitalize = false,
    id = "myInput",
    name = "my-input",
    onChange = (event) => { },
    invalidMessage = null,
    info = null,
    type = "text",
    noSymbols = false,
    onlyNumbers = false,
    minChar = null,
    maxChar = null,
    onEnter = (e) => { },
    disabled = false,
    ...props
}) => {
    const [focus, setFocus] = useState(false)
    const [valid, setValid] = useState(null)
    const [empty, setEmpty] = useState(props.value === "" || !props.value ? true : false)
    const [typeS, setTypeS] = useState(type)

    // check email validity
    const checkEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }
    
    return (
        <div className="relative w-full z-10 mb-3">
            <input disabled={disabled} type={typeS} {...props} id={id} name={name} className={`form-input rounded-lg border border-gray-300 focus:border-sky-600 transition-all duration-200 ring-0 focus:ring-0 outline-none focus:outline-none w-full block ${className} peer/input placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:transition-opacity placeholder:duration-500 disabled:opacity-50 peer/input disabled:cursor-not-allowed`} onFocus={() => setFocus(true)} onChange={(e) => {
                // if autoCapitalize is true, capitalize the first letter of each word
                if (autoCapitalize) {
                    e.target.value = e.target.value.replace(/\w\S*/g, (txt) => {
                        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                    })
                }
                // if noSymbols is true, remove all symbols
                if (noSymbols) {
                    e.target.value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "")
                }
                // if onlyNumbers is true, remove all non-numbers
                if (onlyNumbers) {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "")
                }

                // if minChar is set, check if the input is less than the minChar
                if (minChar !== null) {
                    if (e.target.value.length < minChar) {
                        setValid(false)
                    }
                }

                // if maxChar is set, check if the input is more than the maxChar, if so, remove the last character
                if (maxChar !== null) {
                    if (e.target.value.length > maxChar) {
                        e.target.value = e.target.value.slice(0, -1)
                    }
                }

                setEmpty(e.target.value.trim().length === 0)
                
                if (typeS === "email") {
                    setValid(e.target.value.trim().length > 0 && checkEmail(e.target.value.trim()))
                } else if (typeS === "number") {
                    setValid(e.target.value.trim().length > 0 && !isNaN(e.target.value.trim()))
                } else {
                    setValid(e.target.value.trim().length > 0)
                }
                onChange(e)
            }} onBlur={() => setFocus(false)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    onEnter(e)
                }
            }}
             />
            <label htmlFor={id} className={`absolute text-sm left-2 z-10 bg-white px-1 transition-all duration-200 font-medium tracking-wide cursor-pointer rounded-lg ${focus || valid || !empty ? "-top-2 text-xs left-3" : " text-gray-700 select-none top-[0.75rem]"} peer-disabled/input:opacity-50 peer-disabled/input:cursor-not-allowed`}>{label}</label>
            {
                valid !== null && valid !== true && invalidMessage !== null
                ? (
                    <div className="flex items-center justify-start space-x-1 mb-2 mt-1">
                        <ExclamationCircleIcon className="w-4 h-4 text-rose-600" />
                        <small className="text-xs font-medium text-rose-600">{invalidMessage}</small>
                    </div>
                )
                : (
                    info !== null && (
                        <div className="flex items-center justify-start space-x-1 mb-2 mt-1">
                            <InformationCircleIcon className="w-4 h-4" />
                            <small className="text-xs font-medium text-gray-500">{info}</small>
                        </div>
                    )
                )
            }
            {
                type === "password" && (
                    <div className="absolute right-2 top-2 z-10">
                        <button disabled={disabled} type="button" className="focus:outline-none outline-none p-1 disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => setTypeS(typeS === "password" ? "text" : "password")}>
                            {
                                typeS === "password"
                                ? (
                                    <EyeIcon className="w-5 h-5" />
                                )
                                : (
                                    <EyeSlashIcon className="w-5 h-5" />
                                )
                            }
                        </button>
                    </div>
                )
            }
        </div>
    )
}