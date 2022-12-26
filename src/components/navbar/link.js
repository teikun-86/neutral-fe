import Link from "next/link";

const NavLink = props => {
    return (
        <Link {...props} className={`text-rose-600 hover:text-rose-700 focus:text-rose-700 relative text-base hover:after:absolute hover:after:bg-rose-300 hover:after:h-[2px] hover:after:w-1/2 hover:after:bottom-1 hover:after:transition-all hover:after:animate-width-half hover:after:left-1/2 hover:after:-translate-x-1/2 focus:after:absolute focus:after:bg-rose-600 focus:after:h-[2px] focus:after:w-1/2 focus:after:bottom-1 focus:after:transition-all focus:after:animate-width-half focus:after:left-1/2 focus:after:-translate-x-1/2 flex items-center space-x-2 h-full group ${props.className}`}>
            { props.children }
        </Link>
    );
};

export default NavLink;