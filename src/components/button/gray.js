import Link from "next/link";

export const GrayButton = ({ as = 'button', className = "", children, ...props }) => {
    let classes = "px-3 py-2 rounded bg-gray-100 hocus:bg-gray-200 outline-none focus:outline-none ring-0 focus:ring-0 cursor-pointer transition-all duration-200 text-xs font-semibold tracking-wide ";

    if (as === 'link') {
        return <Link className={`${ classes } ${ className }`} { ...props }>{ children }</Link>
    }

    return <button className={`${ classes } ${ className }`} { ...props }>{ children }</button>
}