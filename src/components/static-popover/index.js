const StaticPopover = props => {
    return (
        <>
            <div className="w-full block relative">
                {props.children}
            </div>
        </>
    );
};

export default StaticPopover;