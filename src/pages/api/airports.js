import airportsData from "@/data/airports";

export default function handler(req, res) {
    let airports = airportsData.filter(airport => airport.type === 'airport')

    if (req.query.iata) {
        let result = airports.filter(airport => airport.airportCode === req.query.iata)[0]
        return res.status(200).json({ airport: result })
    }
    
    if (!req.query.intl) {
        airports = airports.filter(airport => airport.countryName === "Indonesia")
    }
    
    return res.status(200).json({ airports })
}