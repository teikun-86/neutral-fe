import endpoints from "@/data/train-endpoints";

export default function handler(req, res) {
    res.status(200).json({ endpoints })
}