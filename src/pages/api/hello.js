// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import tempFlight from "@/data/temp-flight"

export default function handler(req, res) {
  res.status(200).json({ flights: tempFlight })
}
