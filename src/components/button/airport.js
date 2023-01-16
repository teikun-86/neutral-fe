import { BuildingOffice2Icon } from '@heroicons/react/24/outline';
import Highlighter from 'react-highlight-words';
import { AirplaneTakeoffIcon } from '../icons';

export const AirportButton = props => {
    const { airport, active, selected, query = "" } = props
    
    return (
        <div className="w-full cursor-pointer flex items-center justify-between p-2 bg-white hover:bg-gray-50">
            <span className="p-2 relative">
            <AirplaneTakeoffIcon className="w-6 h-6 mr-2 text-rose-500" />
            </span>
            <div className="w-[90%]">
                <p className={`block truncate text-gray-800 ${selected ? "font-medium" : "font-normal"}`}>
                    <Highlighter
                        highlightClassName="text-rose-500 bg-transparent font-semibold"
                        searchWords={query.split(" ")}
                        autoEscape={true}
                        textToHighlight={airport.name}
                     />
                </p>
                <small className="text-sm font-semibold text-gray-500">
                    <Highlighter
                        highlightClassName="text-rose-500 bg-transparent font-semibold"
                        searchWords={query.split(" ")}
                        autoEscape={true}
                        textToHighlight={`${airport.city}, ${airport.country}`}
                    />
                </small>
            </div>
            <span className="w-14 p-2 text-gray-600 text-xs font-semibold rounded bg-gray-100 grid place-items-center uppercase">
                <Highlighter
                    highlightClassName="text-rose-500 bg-transparent font-semibold"
                    searchWords={query.split(" ")}
                    autoEscape={true}
                    textToHighlight={airport.iata}
                />
            </span>
        </div>
    );
};