import { BuildingOffice2Icon, GlobeAltIcon } from "@heroicons/react/24/outline";

export const DestinationButton = ({ active, selected, destination, ...props }) => {
    
    return (
        <div className="w-full cursor-pointer flex items-center justify-between p-2 bg-white hover:bg-gray-50">
            <span className="p-2 relative">
                {
                    destination.type === 'CITY'
                        ? <BuildingOffice2Icon className="w-6 h-6 mr-1 text-rose-500" />
                        : <GlobeAltIcon className="w-6 h-6 mr-1 text-rose-500" />
                }
            </span>
            <div className="w-full md:w-[90%]">
                <p className={`block truncate text-gray-800 ${selected ? "font-medium" : "font-normal"}`}>
                    {destination.name}
                </p>
                <small className="text-sm font-semibold text-gray-500">{destination.region !== null ? `${destination.region.name}, ` : ""} {destination.country.name}</small>
            </div>
            <span className="hidden w-20 p-2 text-gray-600 text-xs font-semibold rounded bg-gray-100 md:grid place-items-center uppercase">{destination.type}</span>
        </div>
    );
};