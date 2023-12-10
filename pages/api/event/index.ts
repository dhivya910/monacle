import { db } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from 'next'

interface Event {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    monaSpaceUrl: string;
    hostAddress: string;
    airdropAvailable: boolean;
    thumbnail: string;
}
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    const {title, description, startTime, address, space } = req.body;
    const endTime = ""
    const monaSpaceUrl = `https://monaverse.com/spaces/${space}`
    const airdropAvailable = false
    let thumbnail = ""
    const collectibles = await fetch("https://api.hackathon.monaverse.com/collectibles?sort=popularity%3Adesc")
    const data = await collectibles.json()["data"]
for (const sp of data) {
    if (sp.url.explore.split('/')[4] == space)
    thumbnail = sp.image;
}

        const newEvent = {
            title,
            description,
            startTime,
            endTime,
            monaSpaceUrl,
            hostAddress: address,
            airdropAvailable,
            thumbnail,
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
    const event=await db.collection("events").insertOne(eventData)
    return event;
}

async function deleteEvent(_id:number) {
    const event=await db.collection("events").delete({_id})
}