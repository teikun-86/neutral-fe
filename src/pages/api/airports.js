import airports from "@/data/airports";

export default function handler(req, res) {
    res.status(200).json({ airports })
}