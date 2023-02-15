import { midtransClient } from '@/libs/midtrans';

/** @type {import('next').NextApiHandler} */
export default async function midtrans (req, res) {
    console.log({
        body: req.body,
        query: req.query,
        time: new Date().toISOString()
    });

    const payload = req.body;

    let transaction = await midtransClient.createTransaction(payload)

    console.log({transaction});

    res.status(200).json({ status: "ok", transaction })
}