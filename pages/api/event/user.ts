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
            const address = req.query.id;
            const events = await getEventsCreatedByUser(address);
            res.status(200).json({ data: events }) 
    }
}

function getEventsCreatedByUser(address: string) {

}
