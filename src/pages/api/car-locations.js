import locations from "@/data/car-locations";

export default function handler(req, res) {
    res.status(200).json({ locations })
}