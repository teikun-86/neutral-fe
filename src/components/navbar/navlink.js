import Link from "next/link";

export const NavLink = props => {
    return (
        <Link {...props} className={`cursor-pointer disabled:opacity-50 disabled:text-gray-400 disabled:cursor-not-allowed inline-flex justify-center items-center text-base font-medium text-white hover:text-rose-700 focus:text-rose-700 focus:outline-none sm:w-auto sm:text-sm transition duration-100 px-3 py-2 group select-none ${props.className}`}>
            { props.children }
        </Link>
    );
};