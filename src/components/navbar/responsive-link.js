import Link from "next/link";

export const ResponsiveLink = ({ className, active = false, ...props }) => {

    let classes = active
        ? "bg-gray-100 dark:bg-gray-800/20 text-rose-500 relative after:w-0.5 after:h-full after:bg-rose-500 after:absolute after:left-0 after:rounded-lg after:top-0"
        : "bg-white dark:bg-gray-1000 text-gray-800 dark:text-gray-300 dark:hocus:text-gray-100 hocus:text-gray-900 hover:bg-gray-100 focus:bg-gray-200 "

    if (props.as === 'button') {
        return (
            <button {...props} className={`${className} ${classes} flex items-center justify-start text-base font-semibold tracking-wider w-full px-3 py-2 mb-1 transition-all duration-300 hocus:shadow-sm`}>
                {props.children}
            </button>
        )
    }
    
    return (
        <Link {...props} className={`${className} ${classes} flex items-center justify-start text-base font-semibold tracking-wider w-full px-3 py-2 mb-1 transition-all duration-300 hocus:shadow-sm`}>
            {props.children}
        </Link>
    );
};