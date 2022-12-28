import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { TrainRightIcon } from "../icons";

export const StationButton = ({ endpoint, selected, active, ...props }) => {
    return (
        <div className="w-full cursor-pointer flex items-center justify-between p-2 bg-white hover:bg-gray-50">
            <span className="p-2 relative">
                {
                    endpoint.type === 'CITY'
                        ? <BuildingOffice2Icon className="w-6 h-6 mr-2 text-rose-500" />
                        : <TrainRightIcon className="w-6 h-6 mr-2 text-rose-500" />
                }
            </span>
            <div className="w-[90%]">
                <p className={`block truncate text-gray-800 ${selected ? "font-medium" : "font-normal"}`}>
                    {endpoint.name} ({endpoint.type === 'CITY' ? 'ALL' : endpoint.code})
                </p>
                <small className="text-sm font-semibold text-gray-500">{endpoint.type === 'CITY' ? "Semua Stasiun" : endpoint.city.name}</small>
            </div>
            <span className="w-14 p-2 text-gray-600 text-xs font-semibold rounded bg-gray-100 grid place-items-center uppercase">{endpoint.type === 'CITY' ? "ALL" : endpoint.code}</span>
        </div>
    );
}