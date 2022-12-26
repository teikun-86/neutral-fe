export const Service = props => {
    return (
        <button className="items-center justify-center flex flex-col text-white mx-3 mb-3 group outline-none focus:outline-none focus:ring-0 ring-0" {... props}>
            <div className="px-2 py-2 rounded-full bg-white/70 grid place-items-center group-hover:bg-white transition-all duration-200 group-focus:bg-white">
                {props.icon}
            </div>
            {props.children}
        </button>
    );
};