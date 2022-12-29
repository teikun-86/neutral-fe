import { BuildingOffice2Icon, MapPinIcon } from '@heroicons/react/24/outline';

export const CarLocationButton = props => {
    const { location, active, selected } = props

    return (
        <div className="w-full cursor-pointer flex items-center justify-between p-2 bg-white hover:bg-gray-50">
            <span className="p-2 relative">
                {
                    location.levelName === 'City'
                        ? <BuildingOffice2Icon className="w-6 h-6 mr-2 text-rose-500" />
                        : <MapPinIcon className="w-6 h-6 mr-2 text-rose-500" />
                }
            </span>
            <div className="w-[90%]">
                <p className={`block truncate text-gray-800 ${selected ? "font-medium" : "font-normal"}`}>
                    {location.regionalName}
                </p>
                <small className="text-sm font-semibold text-gray-500">
                    {location.provinceName}
                </small>
            </div>
            <span className="w-20 p-2 text-gray-600 text-xs font-semibold rounded bg-gray-100 grid place-items-center uppercase">{location.levelName}</span>
        </div>
    );
};