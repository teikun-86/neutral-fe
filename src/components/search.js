import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBox = ({ placeholder }) => {
    return (
        <div className="block w-full mx-auto bg-white dark:bg-gray-900 rounded-full px-4 py-1 focus-within:bg-gray-100 transition-colors duration-200 border border-gray-300/50 dark:border-gray-700/50 shadow">
            <div className="flex w-full items-center">
                <input type="text" placeholder={placeholder} className="block w-full border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 bg-transparent leading-none dark:text-gray-100 dark:placeholder:text-gray-400" />
                <button className="outline-none focus:outline-none">
                    <MagnifyingGlassIcon className="w-6 h-6 text-gray-500 dark:text-gray-300" />
                </button>
            </div>
        </div>
    );
};

export default SearchBox;