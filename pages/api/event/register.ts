import { db } from "@/utils/db";
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
          const event = await getEvent(eventId)
          res.status(201).json({ data: event });
    }
  else if (req.method === 'DELETE') {
            const { _id } = req.body;
            await deleteRegistration(_id);
            res.status(204).json;
    }
    else if (req.method === 'GET') {
        const { id } = req.query;
        const events = getEventsRegisteredByUser(id)
        res.status(200).json({ data: events }) 
}
}
async function getEvent(_id :number | any) {
    const event = await db.collection("events").find({_id})
    return event;
}

async function registerEvent(registeredEventData:RegisterEvents) {
    const registeredEvent = await db.collection("registrations").create({registeredEventData})
    return registeredEvent;
}

async function deleteRegistration(_id:number) {
    const registeredEvent=await db.collection("registrations").delete({_id})
}

async function getEventsRegisteredByUser(address:string) {
    let events = []
    const registrations = await db.collection("registrations").find({address}).toArray();
    console.log(registrations)

    for (const reg of registrations) {
            const { _id, eventId, address} = reg;
            console.log(eventId)
            const event = await db.collection("events").find({_id: `ObjectId(${eventId})`});
            events.push(event)
    }

    return events
    
}