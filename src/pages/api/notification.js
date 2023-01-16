/** @type {import('next').NextApiHandler} */
export default function notification (req, res) {
    console.log({
        body: req.body,
        query: req.query,
        time: new Date().toISOString()
    });

    res.status(200).json({ status: "ok" })
}