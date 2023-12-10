import { db } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from 'next'
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET') {
        const events = await getAllEvents()
        res.status(200).json({ data: events }) 
    }
}

async function getAllEvents() { 
    const events = await db.collection("events").find({}).sort({startTime: -1}).toArray();
    return events;
}