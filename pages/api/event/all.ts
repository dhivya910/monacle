import { connectToDatabase } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from 'next'
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET') {
        const users = await getAllEvents()
        res.status(200).json({ data: users }) 
    }
}

async function getAllEvents() {
    const db = await connectToDatabase()
    const users = await db.collection("users").find({}).toArray()
    return users;
}