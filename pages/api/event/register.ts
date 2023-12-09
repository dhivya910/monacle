import { connectToDatabase } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from 'next'

interface RegisterEvents {
    eventId: number;
    address: string;
}
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
        const {eventId, address } = req.body;
        const newEventRegistration = {
            address,
            eventId,
          };
          const registeredEvent= await registerEvent(newEventRegistration)
          res.status(201).json({ message: 'Event registration created successfully' });
    }
  else if (req.method === 'DELETE') {
            const { _id } = req.body;
            res.status(204).json;
            await deleteRegistration(_id);
    }
}

async function registerEvent(registeredEventData:RegisterEvents) {
    const db = await connectToDatabase()
    const registeredEvent = await db.collection("registrations").create({registeredEventData})
    return registeredEvent;
}

async function deleteRegistration(_id:number) {
    const db = await connectToDatabase()
    const registeredEvent=await db.collection("registrations").delete({_id})
}