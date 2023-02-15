export const ThreeDots = () => {
    return (
        <div className="flex items-center justify-center space-x-4">
            <span className="w-2 h-2 bg-rose-600 rounded-full animate-ping"></span>
            <span className="w-2 h-2 bg-rose-600 rounded-full animate-ping [animation-delay:100ms]"></span>
            <span className="w-2 h-2 bg-rose-600 rounded-full animate-ping [animation-delay:200ms]"></span>
        </div>
    );
}