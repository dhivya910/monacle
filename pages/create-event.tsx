import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import * as React from "react";
import Layout from "@/components/layout";
import { useState } from "react";
import { useSearchParams } from 'next/navigation'
import { useAccount } from "wagmi";

export default function NewEvent() {
  const searchParams = useSearchParams()
  const space = searchParams.get('space')
  const {address} = useAccount()

  const [title, setTitle] = useState(""); 
   const [description, setDescription] = useState("");
   const [date, setDate] = useState("");
   const [time, setTime] = useState("");
   const [msg, setMsg] = useState("");

const handleSubmit = async (e: any) => {
setMsg("")
e.preventDefault();
if (!address) {
setMsg("Please connect to your Wallet to proceed.")
} else {


const startTime = new Date(`${date} ${time}`).toISOString()
  try {
    const response = await fetch("/api/event", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title, description, startTime, address, space})
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}}



  return (
    <Layout pageTitle="Create Event">
      <form>
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Create an Event
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoComplete="given-title"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Description
                </label>
                
                <div className="mt-2">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    autoComplete="description"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="title"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    id="title"
                    autoComplete="given-title"
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Time
                </label>
                <div className="mt-2">
                  <input
                    type="time"
                    name="title"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    id="title"
                    autoComplete="given-title"
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              
            </div>
          </div>
          <div className="col">
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Create event
            </button>
            <p className="text-sm text-white">{msg}</p>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
}
