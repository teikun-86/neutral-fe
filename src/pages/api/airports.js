import airportsData from "@/data/airports";

export default function handler(req, res) {
    let query = req.query
    let { iata, intl } = query
    
    let airports = airportsData.filter(airport => airport.type === 'airport')

    if (iata) {
        if (!Array.isArray(iata)) iata = [iata]

        let result = airports.filter(airport => {
            let cond = iata.includes(airport.airportCode.trim())
            return cond
        })

        return res.status(200).json({ airport: result })
    }
    
    if (!intl) {
        airports = airports.filter(airport => airport.countryName === "Indonesia")
    }
    
    return res.status(200).json({ airports, query })
}