export const RoseTooltip = props => {
    return (
        <div className="absolute top-12 left-3 z-20">
            <div className="relative max-w-72 whitespace-normal px-3 py-2 rounded bg-rose-500 with-caret text-start text-sm font-semibold text-white selection:bg-rose-500">
                {props.children}
            </div>
        </div>
    )
}