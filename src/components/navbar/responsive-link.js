import Link from "next/link";

export const ResponsiveLink = ({ className, active = false, ...props }) => {

    let classes = active
        ? "bg-gradient-to-r from-rose-50/60 to-rose-50/40 text-rose-500 relative after:w-0.5 after:h-full after:bg-rose-500 after:absolute after:left-px after:rounded-lg after:top-0"
        : "bg-white text-gray-800 hocus:text-gray-900 hover:bg-gray-100 focus:bg-gray-200 "
    
    return (
        <Link {...props} className={`${className} ${classes} block text-base font-semibold tracking-wider w-full px-3 py-2 mb-1 transition-all duration-300 hocus:shadow-sm`}>
            {props.children}
        </Link>
    );
};