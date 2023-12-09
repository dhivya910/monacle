import { connectToDatabase } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from 'next'

interface User {
    address: string;
    name: string;
    email: string;
}
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
        const { address, name, email } = req.body;
        if (address && name && email) {
            const newUser = {
              address,
              name,
              email,
            };
            res.status(201).json({ user: newUser, message: 'User created successfully' });
        }
  } 
  else if (req.method === 'GET') {
        if (typeof req.query.id === "undefined") {
            res.status(500).json({ message: 'fail' })
        }
            const address = req.query.id
            const user = await getUser(address)
            res.status(200).json({ data: user }) 
    }
}

async function getUser(address: string | any) {
    const db = await connectToDatabase()
    const user = await db.collection("users").find({address})
    return user;
}

async function createUser(userData: User) {
    const db = await connectToDatabase()
    const user=await db.collection("users").create({userData})
    return user;
}