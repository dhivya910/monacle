import { connectToDatabase } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from 'next'

interface Event {
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    monaSpaceUrl: string;
    hostAddress: string;
    airdropAvailable: boolean;
}
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET') {
        if (typeof req.query.id === "undefined") {
            res.status(500).json({ message: 'fail' })
        }
            const hostAddress = req.query.id;
            const events = await getEventsCreatedByUser(hostAddress);
            res.status(200).json({ data: events }) 
    }
}

async function getEventsCreatedByUser(address: string |any) {
    const db = await connectToDatabase()
    const events = await db.collection("event").findAll({address})
    return events;
}
