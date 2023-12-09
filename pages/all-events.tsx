import { useState, useEffect } from "react";
import Layout from "@/components/layout";

const people = [
  {
    name: 'Leonard Krasner',
    role: 'Senior Designer',
    imageUrl: "/space1.png",
    MonaSpaceUrl: '#',
  },
  {
    name: 'Leonard Krasner',
    role: 'Senior Designer',
    imageUrl: "/space2.png",
    MonaSpaceUrl: '#',
  },  
  {
    name: 'Leonard Krasner',
    role: 'Senior Designer',
    imageUrl: "/space3.png",
    MonaSpaceUrl: '#',
  },  
  {
    name: 'Leonard Krasner',
    role: 'Senior Designer',
    imageUrl: "/space4.png",
    MonaSpaceUrl: '#',
  },
]

export default function AllEventsPage() {
  const [allEvents, setAllEvents] = useState([]);

  return (
    <Layout pageTitle="">
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Available spaces</h2>
          <p className="mt-4 text-lg leading-8 text-gray-400">
            Choose a space to schedule your event
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
        >
          {people.map((person) => (
            <li key={person.name} className=" bg-gray-800 px-8 py-10">
              <img className="mx-auto h-48 w-48 md:h-56 md:w-56" src={person.imageUrl} alt="" />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">{person.name}</h3>
              <p className="text-sm leading-6 text-gray-400">{person.role}</p>
              <ul role="list" className="mt-6 flex justify-center gap-x-6">
                <li>
                  <a href={person.MonaSpaceUrl} className="text-gray-400 hover:text-gray-300">
                    <span className="sr-only">Mona space</span>
                  </a>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </Layout>
  );
}
