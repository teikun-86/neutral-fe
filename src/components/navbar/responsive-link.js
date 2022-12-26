import Link from "next/link";

const ResponsiveLink = ({ className, ...props }) => {
    return (
        <Link {...props} className={`${className} w-full px-3 py-2 mb-2 bg-gray-50 block text-base font-semibold tracking-wider text-gray-800 hocus:text-gray-900 hover:bg-gray-100 focus:bg-gray-200 transition-all duration-300 hocus:shadow-sm`}>
            {props.children}
        </Link>
    );
};

export default ResponsiveLink;