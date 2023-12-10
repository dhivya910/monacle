import { db } from "@/utils/db";
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

  if (req.method === 'POST') {
    const {title, description, startTime, endTime, monaSpaceUrl,hostAddress, airdropAvailable } = req.body;
        const newEvent = {
            title,
            description,
            startTime,
            endTime,
            monaSpaceUrl,
            hostAddress,
            airdropAvailable
          };
          const event= await createEvent(newEvent)
          res.status(201).json({ message: 'Event registration created successfully' });
  } 
  else if (req.method === 'GET') {
        if (typeof req.query.id === "undefined") {
            res.status(500).json({ message: 'fail' })
        }
            const _id = req.query.id
            const event = await getEvent(_id)
            res.status(200).json({ data: event }) 
    }
    else if(req.method === 'DELETE') {
        const { _id } = req.body;
        res.status(204).json;
        await deleteEvent(_id);
    }
}

async function getEvent(_id :number | any) {
    const event = await db.collection("events").find({_id})
    return event;
}

async function createEvent(eventData: Event) {
    const event=await db.collection("events").create({eventData})
    return event;
}

async function deleteEvent(_id:number) {
    const event=await db.collection("events").delete({_id})
}