import { connectToDatabase } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from 'next'

interface User {
    address: string;
    name: string;
    email: string;
}
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    createUser(req.body)

  } 
  else if (req.method === 'GET') {
        if (typeof req.query.id === "undefined") {
            res.status(500).json({ message: 'fail' })
        }
            const address = req.query.id
            const user: User = await getUser(address)
            res.status(200).json({ data: user }) 
    }
}

async function getUser(address: string | any) {
    const db = await connectToDatabase()
    const user: User = await db.collection("users").find({address})
    return user;
}

function createUser(userData: User) {

}