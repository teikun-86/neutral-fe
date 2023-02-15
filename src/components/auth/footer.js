import { useLocale } from "@/hooks/locale";
import Link from "next/link";
import { useRouter } from "next/router";

const AuthFooter = () => {
    const router = useRouter();

    const { localeMap } = useLocale();
    
    return (
        <div className="flex flex-col items-center justify-center">
            <p className="text-center text-sm dark:text-gray-400">Copyright &copy; {(new Date()).getFullYear()} Bumi Tihamah Wisata</p>
            <div className="flex items-center flex-wrap justify-center space-x-2 mt-2">
                {
                    Object.keys(localeMap).map(locale => (
                        <Link key={locale} shallow href={router.asPath} locale={localeMap[locale].locale} className="underline underline-offset-2 text-gray-600 dark:text-gray-400 tracking-wide text-xs whitespace-nowrap">
                            {localeMap[locale].name}
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default AuthFooter;