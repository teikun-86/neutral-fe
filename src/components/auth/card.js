export const AuthCard = ({ children }) => {
    return (
        <div className="w-full px-6 py-4 bg-white dark:bg-gray-900 shadow-md overflow-hidden rounded-lg relative max-h-[70vh] overflow-y-auto gray-scrollbar">
            {children}
        </div>
    )
}