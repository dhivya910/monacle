import {
    Bson,
    MongoClient,
  } from "https://deno.land/x/mongo@LATEST_VERSION/mod.ts";

  
interface EventSchema {
    _id: string;
    eventTitle: string;
    startTime: Date;
    endTime: Date;
    monaSpaceUrl: string;
    description: string;
}
    
const client = new MongoClient();

await client.connect(
    Deno.env.get("MONGO_URI"),
);

const db = client.database("monacal");
const events = db.collection<EventSchema>("events");

export async function getAllEvents() {
    const all_events = await events.find({ _id: { $ne: null } }).toArray();
    return all_events;
}

export async function getEvent(eventId: string) {
    const event = await events.findOne({ _id: eventId });
    return event;
}

export async function createEvent(eventData) {
    const eventId = await events.insertOne(eventData);
    return eventId;
}

export async function deleteEvent(eventId:string) {
    const deleteCount = await events.deleteOne({ _id: eventId });
}

