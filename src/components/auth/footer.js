import Link from "next/link";
import { useRouter } from "next/router";

const AuthFooter = () => {
    const router = useRouter();
    
    return (
        <div className="flex flex-col items-center justify-center">
            <p className="text-center text-sm dark:text-gray-400">Copyright &copy; {(new Date()).getFullYear()} Bumi Tihamah Wisata</p>
            <div className="flex items-center flex-wrap justify-center space-x-2 mt-2">
                <Link shallow href={router.asPath} locale="id" className="underline underline-offset-2 text-gray-600 dark:text-gray-400 tracking-wide text-xs whitespace-nowrap">Bahasa Indonesia</Link>
                <Link shallow href={router.asPath} locale="en" className="underline underline-offset-2 text-gray-600 dark:text-gray-400 tracking-wide text-xs whitespace-nowrap">English</Link>
                <Link shallow href={router.asPath} locale="jp" className="underline underline-offset-2 text-gray-600 dark:text-gray-400 tracking-wide text-xs whitespace-nowrap">日本語</Link>
            </div>
        </div>
    );
};

export default AuthFooter;