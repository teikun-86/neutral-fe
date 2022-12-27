import Link from "next/link";

export const UnderlinedLink = ({active = false, ...props}) => {
    let classes = active
        ? "font-semibold text-rose-500 hover:text-rose-600 after:w-2/3 after:h-0.5 after:bg-rose-600 after:absolute after:bottom-0.5 after:animate-width-2/3 after:transition-all after:duration-200 after:left-0"
        : "text-gray-800 hocus:text-rose-500 hocus:after:w-2/3 hocus:after:h-0.5 hocus:after:bg-rose-600 hocus:after:absolute hocus:after:bottom-0.5 hocus:after:animate-width-2/3 hocus:after:transition-all hocus:after:duration-200 hocus:after:left-0"
    
    return (
        <Link {...props} className={`${classes} h-full grid place-items-center group relative ${props.className}`}>
            {props.children}
        </Link>
    );
};