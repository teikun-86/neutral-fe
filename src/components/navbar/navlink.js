import Link from "next/link";

export const NavLink = props => {
    return (
        <Link {...props} className={`btn-text px-2 py-1 group select-none ${props.className}`}>
            { props.children }
        </Link>
    );
};