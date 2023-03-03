import GuestLayout from "@/layouts/guest";
import { useEffect, useState } from "react";
import { FacebookIcon, GoogleIcon, SpinnerIcon } from "@/components/icons";
import { useLocale } from "@/hooks/locale";
import { AuthCard, AuthContainer } from "@/components/auth";
import { axios } from "@/libs/axios";
import { Tab } from "@/components/tab";
import { PersonalRegister } from "@/components/auth/register/personal";
import { AgentRegister } from "@/components/auth/register/agent";
import { CompanyRegister } from "@/components/auth/register/company";
import Link from "next/link";
import { InputError } from "@/components/forms/input-error";
import { Input } from "@/components/forms";
import { Dropdown } from "@/components/dropdown";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/hooks/auth";

const Register = () => {
    const { register } = useAuth({ middleware: "guest" })
    const { __, locale } = useLocale();

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errors, setErrors] = useState([])
    const [countryQuery, setCountryQuery] = useState("")
    const [countryCodes, setCountryCodes] = useState([])
    const [countryCode, setCountryCode] = useState({
        name: "Indonesia",
        dial_code: "+62",
        code: "ID",
        id: 1
    })
    const [type, setType] = useState("personal")
    const [company, setCompany] = useState({
        name: "",
        email: "",
        phone: "",
        ppiu: "",
        image: null,
    })

    const handleRegister = async () => {
        let data = {
            name,
            email,
            phone: phone,
            country_id: countryCode.id,
            password,
            password_confirmation: passwordConfirmation,
            type,
        }

        if (type === "company") {
            data.company = company
        }
        
        await register({
            setLoading: setLoading,
            setErrors: setErrors,
            ...data
        })
    }

    const handleCompany = (key, value) => {
        setCompany({
            ...company,
            [key]: value
        })
    }

    const loginWith = (provider) => {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/social/${provider}/?lang=${locale}`
    }

    const getCountries = async () => {
        await axios.get('/countries').then(res => {
            setCountryCodes(res.data.data)
        })
    }

    useEffect(() => {
        getCountries()
    }, [])

    return (
        <GuestLayout title={__('nav.register')}>
            <div className="w-full grid place-items-center min-h-screen">
                <AuthContainer description={__('title.register', {
                    link: process.env.NEXT_PUBLIC_APP_NAME
                })} title={__('nav.register')}>
                    <AuthCard>
                        {
                            loading && (
                                <div className="fixed inset-0 bg-white/50 dark:bg-black/60 flex items-center justify-center z-[80]">
                                    <SpinnerIcon className="w-10 h-10 text-rose-600 animate-spin" />
                                </div>
                            )
                        }
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

                        <div className="my-3">
                            <Dropdown className="w-full z-50">
                                {({ open }) => (
                                    <>
                                        <Dropdown.Button className="w-full bg-white dark:bg-gray-900 form-input border-gray-300 dark:border-gray-700 focus:border-sky-600 ring-0 focus:ring-0 outline-none focus:outline-none transition-all text-start cursor-pointer duration-200 rounded-lg h-[2.6rem] flex items-center space-x-1 justify-between relative capitalize">
                                            <span className="absolute -top-2 left-3 text-xs z-10 bg-white dark:bg-gray-900 dark:text-white px-1 transition-all duration-200 font-medium tracking-wide cursor-pointer rounded-lg">{__('input.account_type')}</span>
                                            {type}
                                            <ChevronDownIcon className={`w-5 h-5 ${open ? "rotate-180 " : ""} transition-all cursor-pointer duration-200 dark:text-gray-300`} />
                                        </Dropdown.Button>
                                        <Dropdown.Content className="left-0 max-h-72 overflow-y-auto gray-scrollbar pt-0">
                                            <Dropdown.Item onClick={() => setType('personal')}>
                                                Personal
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => setType('agent')}>
                                                Agent
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => setType('company')}>
                                                Company
                                            </Dropdown.Item>
                                        </Dropdown.Content>
                                    </>
                                )}
                            </Dropdown>
                        </div>

                        {
                            type === 'company' && (
                                <>
                                    <h6 className="text-gray-800 dark:text-gray-100 font-semibold text-sm">{__('info.company_detail')}</h6>
                                    <div className="my-3">
                                        <Input className="mb-0" placeholder="Company Name" type="text" id="companyName" name="companyName" value={company.name} label={__('input.company_name')} onChange={(e) => handleCompany('name', e.target.value)} />
                                        <InputError errors={errors["company.name"]} />
                                    </div>
                                    <div className="my-3">
                                        <Input className="mb-0" placeholder="PPIU" type="text" id="companyPPiU" name="companyPPiU" value={company.ppiu} label={__('input.ppiu_number')} onChange={(e) => handleCompany('ppiu', e.target.value)} />
                                        <InputError errors={errors["company.ppiu"]} />
                                    </div>
                                    <div className="my-3">
                                        <Input className="mb-0" placeholder="info@mycompany.com" type="email" id="companyEmail" name="companyEmail" value={company.email} label={__('input.email')} onChange={(e) => handleCompany('email', e.target.value)} />
                                        <InputError errors={errors["company.email"]} />
                                    </div>
                                    <div className="my-3">
                                        <Input className="mb-0" placeholder="Telephone" type="text" id="companyPhone" name="companyPhone" value={company.phone} label={__('input.phone')} onChange={(e) => handleCompany('phone', e.target.value)} />
                                        <InputError errors={errors["company.phone"]} />
                                    </div>
                                </>
                            )
                        }

                        <button type="button" className="btn-rose w-full relative" disabled={loading} onClick={handleRegister}>
                            <span>{__('nav.register')}</span>
                        </button>
                        <div className="flex items-center justify-center my-2">
                            <hr className="w-10 border-t border-gray-300" />
                            <span className="text-center w-auto text-xs text-gray-600 dark:text-gray-400 font-medium mx-2">{__('already_have_account')}</span>
                            <hr className="w-10 border-t border-gray-300" />
                        </div>
                        <Link href="/auth/login" className="btn-light dark:btn-dark !w-full">{__('nav.login')}</Link>
                        {
                            type === 'personal' && (
                                <>
                                    <div className="flex items-center justify-center my-2">
                                        <hr className="w-10 border-t border-gray-300" />
                                        <span className="text-center w-auto text-xs text-gray-600 dark:text-gray-400 font-medium mx-2">{__('login_easier')}</span>
                                        <hr className="w-10 border-t border-gray-300" />
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <button onClick={() => loginWith("facebook")} className="btn-light dark:btn-dark">
                                            <FacebookIcon className="w-6 h-6 mr-2" />
                                            Facebook
                                        </button>
                                        <button onClick={() => loginWith('google')} className="btn-light dark:btn-dark">
                                            <GoogleIcon className="w-6 h-6 mr-2" />
                                            Google
                                        </button>
                                    </div>
                                </>
                            )
                        }
                    </AuthCard>
                </AuthContainer>
            </div>
        </GuestLayout>
    );
};

export default Register;