import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBox = () => {
    return (
        <div className="block w-full sm:w-2/3 lg:w-1/2 mx-auto bg-white rounded-full px-4 py-3">
            <div className="flex w-full items-center">
                <input type="text" placeholder="Mau kemana hari ini?" className="block w-full border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0" />
                <button>
                    <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
                </button>
            </div>
        </div>
    );
};

export default SearchBox;