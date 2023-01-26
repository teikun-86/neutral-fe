import Image from "next/image"
import Link from "next/link"
import AuthFooter from "./footer"
import logo from "@/assets/images/tripla-logo.png";

export const AuthContainer = ({ children, title, description = "" }) => {
    return (
        <div className="w-full sm:max-w-md p-3">
            <div className="flex flex-col items-center justify-center mb-2">
                <Link href="/">
                    <Image src={logo} alt={`${process.env.NEXT_PUBLIC_APP_NAME} Logo`} className="h-10 w-auto" />
                </Link>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 text-center">
                    {title}
                </h2>
                <p className="text-center dark:text-gray-300">{description}</p>
            </div>

            {children}

            <div className="flex flex-col items-center justify-center mt-2">
                <AuthFooter />
            </div>
        </div>
    )
}