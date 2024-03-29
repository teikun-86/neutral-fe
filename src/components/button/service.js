import Link from "next/link";

export const Service = ({ href = "#", ...props}) => {
    return (
        <Link href={href} className="items-center justify-center flex flex-col text-white mx-3 mb-3 group outline-none focus:outline-none focus:ring-0 ring-0 text-center" {... props}>
            <div className="p-2 rounded-full bg-white/70 grid place-items-center group-hover:bg-white transition-all duration-200 group-focus:bg-white">
                <div className="p-1 rounded-full grid place-items-center bg-rose-100">{props.icon}</div>
            </div>
            {props.children}
        </Link>
    );
};