import airports from "@/data/airports";

export default function handler(req, res) {
    let results = airports.filter(airport => airport.type === 'airport')
    if (!req.query.intl) {
        results = results.filter(airport => airport.countryName === "Indonesia")
    }
    
    res.status(200).json({ airports: results })
}