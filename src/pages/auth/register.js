import GuestLayout from "@/layouts/guest";
import btwLogo from "@/assets/images/btw-logo.png";
import { useState } from "react";
import { useAuth } from "@/hooks/auth";
import Image from "next/image";
import { Input } from "@/components/forms";
import { FacebookIcon, GoogleIcon, SpinnerIcon } from "@/components/icons";
import Link from "next/link";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Dropdown } from "@/components/dropdown";
import countryCodes from "@/data/call-codes";
import Alert from "@/components/alert";

const Register = () => {
    const [loading, setLoading] = useState(false)
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

    const handleRegister = async () => {
        await register({
            setLoading: setLoading,
            setErrors: setErrors,
            name,
            email,
            phone: `${countryCode.dial_code}${phone}`,
            password,
            password_confirmation: passwordConfirmation
        })
    }

    const loginWith = (provider) => {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/social/${provider}/`
    }

    return (
        <GuestLayout title="Register">
            <div className="w-full grid place-items-center min-h-screen bg-cover bg-no-repeat bg-center">
                <div className="w-full sm:max-w-md p-3">
                    <div className="flex flex-col items-center justify-center mb-2">
                        <Link href="/">
                            <Image src={btwLogo} alt="BTW Logo" className="h-10 w-auto" />
                        </Link>
                        <h2 className="text-xl font-bold text-gray-800 text-center">
                            Daftar
                        </h2>
                        <p className="text-center">Mendaftar untuk memesan lebih mudah dan dapatkan keuntungan lainnya!</p>
                    </div>

                    <div className="w-full px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg">
                        {
                            errors.length > 0 && (
                                <Alert type="error" title="Oops! Terjadi kesalahan!">
                                    <ul className="list-disc list-inside px-1">
                                        {
                                            errors.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))
                                        }
                                    </ul>
                                </Alert>
                            )
                        }
                        <Input autoCapitalize info="Isi sesuai KTP/SIM/Passport/Kitas" placeholder="John Doe" type="text" id="name" name="name" label="Nama" onChange={(e) => setName(e.target.value)} />
                        <Input placeholder="johndoe@example.com" type="email" id="email" name="email" label="Email" onChange={(e) => setEmail(e.target.value)} invalidMessage="Isi dengan email yang valid!" />
                        <div className="flex items-start space-x-2">
                            <div className="w-1/4">
                                <Dropdown className="w-full z-50">
                                    {({ open }) => (
                                        <>
                                            <Dropdown.Button as="div" className="relative">
                                                <button className="w-full bg-white form-input border-gray-300 focus:border-sky-600 ring-0 focus:ring-0 outline-none focus:outline-none transition-all text-start cursor-pointer duration-200 rounded-lg h-[2.6rem] flex items-center space-x-1" >
                                                    <span className="w-6 h-3 grid place-items-center mr-2">
                                                        <Image src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode.code}.svg`} width={100} height={100} alt="Indonesia" />
                                                    </span>
                                                </button>
                                                <ChevronDownIcon className={`w-5 h-5 absolute top-3 right-3 ${open ? "rotate-180 " : ""} transition-all cursor-pointer duration-200`} />
                                            </Dropdown.Button>
                                            <Dropdown.Content afterLeave={() => setCountryQuery('')} className="left-0 max-h-72 overflow-y-auto gray-scrollbar pt-0">
                                                <div className="w-full px-2 py-1 bg-white sticky top-0">
                                                    <Input type="text" id="searchCountry" onChange={(e) => setCountryQuery(e.target.value)} label="Cari Kode Negara" />
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
                                <Input placeholder="81234567890" type="text" id="phone" name="phone" label="Nomor Telepon" onChange={(e) => setPhone(e.target.value)} onlyNumbers />
                            </div>
                            
                        </div>
                        <Input placeholder="**********" type="password" id="passwordInput" name="passwordInput" label="Password" onChange={(e) => setPassword(e.target.value)} />
                        <Input placeholder="**********" type="password" id="passwordConfirmInput" name="passwordConfirmInput" label="Konfirmasi Password" onChange={(e) => setPasswordConfirmation(e.target.value)} />

                        <button type="button" className="btn-rose w-full relative" disabled={loading} onClick={handleRegister}>
                            {
                                loading && (
                                    <SpinnerIcon className="text-white w-5 h-5 animate-spin absolute right-2 top-2" />
                                )
                            }
                            <span>Daftar</span>
                        </button>
                        <div className="flex items-center justify-center my-2">
                            <hr className="w-10 border-t border-gray-300" />
                            <span className="text-center w-auto text-xs text-gray-600 font-medium mx-2">Sudah memiliki akun?</span>
                            <hr className="w-10 border-t border-gray-300" />
                        </div>
                        <Link href="/auth/login" className="btn-light w-full">Login</Link>
                        <div className="flex items-center justify-center my-2">
                            <hr className="w-10 border-t border-gray-300" />
                            <span className="text-center w-auto text-xs text-gray-600 font-medium mx-2">Atau mendaftar lebih mudah dengan</span>
                            <hr className="w-10 border-t border-gray-300" />
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            <button onClick={() => loginWith("facebook")} className="btn-light">
                                <FacebookIcon className="w-6 h-6 mr-2" />
                                Facebook
                            </button>
                            <button onClick={() => loginWith('google')} className="btn-light">
                                <GoogleIcon className="w-6 h-6 mr-2" />
                                Google
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-2">
                        <p className="text-center text-xs">Copyright &copy; {(new Date()).getFullYear()} Bumi Tihamah Wisata</p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default Register;