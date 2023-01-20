export const ThreeDots = () => {
    return (
        <div className="flex items-center justify-center space-x-2">
            <span className="w-2 h-2 bg-rose-600 rounded-full animate-bounce-fast"></span>
            <span className="w-2 h-2 bg-rose-600 rounded-full animate-bounce-fast [animation-delay:100ms]"></span>
            <span className="w-2 h-2 bg-rose-600 rounded-full animate-bounce-fast [animation-delay:200ms]"></span>
        </div>
    );
}