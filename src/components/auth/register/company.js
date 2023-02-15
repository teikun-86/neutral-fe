import { Dropdown } from "@/components/dropdown"
import { Input } from "@/components/forms"
import { InputError } from "@/components/forms/input-error"
import { useAuth } from "@/hooks/auth"
import { useLocale } from "@/hooks/locale"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export const CompanyRegister = ({ countryCodes = [], loading, setLoading }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errors, setErrors] = useState([])
    const [countryQuery, setCountryQuery] = useState("")
    const [countryCode, setCountryCode] = useState({
        name: "Indonesia",
        dial_code: "+62",
        code: "ID"
    })

    const { register } = useAuth({ middleware: "guest" })
    const { __ } = useLocale()

    const handleRegister = async () => {
        await register({
            setLoading: setLoading,
            setErrors: setErrors,
            name,
            email,
            phone: phone,
            call_code: countryCode.dial_code,
            password,
            password_confirmation: passwordConfirmation,
            type: 'agent'
        })
    }

    return (
        <>
            <div className="my-3">
                <Input className="mb-0" autoCapitalize info={__('info.name')} placeholder="John Doe" type="text" id="name" name="name" label={__('input.name')} onChange={(e) => setName(e.target.value)} />
                <InputError errors={errors.name} />
            </div>

            <div className="my-3">
                <Input className="mb-0" placeholder="johndoe@example.com" type="email" id="email" name="email" label={__('input.email')} onChange={(e) => setEmail(e.target.value)} invalidMessage={__('invalid.email')} />
                <InputError errors={errors.email} />
            </div>

            <div className="flex items-start space-x-2 my-3">
                <div className="w-1/4">
                    <Dropdown className="w-full z-50">
                        {({ open }) => (
                            <>
                                <Dropdown.Button as="div" className="relative">
                                    <button className="w-full bg-white dark:bg-gray-900 form-input border-gray-300 dark:border-gray-700 focus:border-sky-600 ring-0 focus:ring-0 outline-none focus:outline-none transition-all text-start cursor-pointer duration-200 rounded-lg h-[2.6rem] flex items-center space-x-1" >
                                        <span className="w-6 h-3 grid place-items-center mr-2">
                                            <Image src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode.code}.svg`} width={100} height={100} alt="Indonesia" />
                                        </span>
                                    </button>
                                    <ChevronDownIcon className={`w-5 h-5 absolute top-3 right-3 ${open ? "rotate-180 " : ""} transition-all cursor-pointer duration-200 dark:text-gray-300`} />
                                </Dropdown.Button>
                                <Dropdown.Content afterLeave={() => setCountryQuery('')} className="left-0 max-h-72 overflow-y-auto gray-scrollbar pt-0">
                                    <div className="w-full px-2 py-1 bg-white dark:bg-gray-900 sticky top-0">
                                        <Input type="text" id="searchCountry" onChange={(e) => setCountryQuery(e.target.value)} label={__('input.call_code')} />
                                    </div>
                                    {
                                        countryCodes.filter((country) => {
                                            return countryQuery.trim().length <= 0 ? true : country.name.toLowerCase().includes(countryQuery.toLowerCase()) || country.dial_code.toLowerCase().includes(countryQuery.toLowerCase()) || country.code.toLowerCase().includes(countryQuery.toLowerCase())
                                        }).map((country, idx) => {
                                            const flagUrl = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code}.svg`;
                                            return (
                                                <Dropdown.Item className="flex items-center justify-start text-start" key={idx} onClick={() => setCountryCode(country)}>
                                                    <span className="w-6 h-3 grid place-items-center mr-2">
                                                        <Image src={flagUrl} width={100} height={100} alt={country.name} />
                                                    </span>
                                                    {country.name}
                                                    ({country.dial_code})
                                                </Dropdown.Item>
                                            )
                                        })
                                    }
                                </Dropdown.Content>
                            </>
                        )}
                    </Dropdown>
                </div>
                <div className="w-3/4">
                    <Input className="mb-0" placeholder="81234567890" type="text" id="phone" name="phone" label={__('input.phone')} onChange={(e) => setPhone(e.target.value)} onlyNumbers />
                    <InputError errors={errors.phone} />
                </div>
            </div>
            <div className="my-3">
                <Input className="mb-0" placeholder="**********" type="password" id="passwordInput" name="passwordInput" label={__('input.password')} onChange={(e) => setPassword(e.target.value)} />
                <InputError errors={errors.password} />
            </div>

            <div className="my-3">
                <Input className="mb-0" placeholder="**********" type="password" id="passwordConfirmInput" name="passwordConfirmInput" label={__('input.confirm_password')} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                <InputError errors={errors.password_confirmation} />
            </div>

            <button type="button" className="btn-rose w-full relative" disabled={loading} onClick={handleRegister}>
                <span>{__('nav.register')}</span>
            </button>
            <div className="flex items-center justify-center my-2">
                <hr className="w-10 border-t border-gray-300" />
                <span className="text-center w-auto text-xs text-gray-600 dark:text-gray-400 font-medium mx-2">{__('already_have_account')}</span>
                <hr className="w-10 border-t border-gray-300" />
            </div>
            <Link href="/auth/login" className="btn-light dark:btn-dark !w-full">{__('nav.login')}</Link>

        </>
    )
}