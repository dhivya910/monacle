import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import Image from "next/image";


export default function AllEventsPage() {
  const router = useRouter()
  const [spaces, setSpaces] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.hackathon.monaverse.com/collectibles?sort=popularity%3Adesc");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSpaces(data.data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


const redirectTo = (spaceUrl: string) => {
  const space = spaceUrl.split('/')[4];
  router.push(`/create-event?space=${space}`)
}

useEffect(() => {
    fetchData();
  }, []);

  

  return (
    <Layout pageTitle="Spaces">
    <div className="bg-gray-900 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Available spaces in Monaverse</h2>
          <p className="mt-4 text-lg leading-8 text-gray-400">
            Choose a space to schedule your event
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
        >
          {spaces.map((space: any) => (
            <li key={space.title} className=" bg-gray-800 px-8 py-10 hover:bg-gray-500" onClick={() => {redirectTo(space.url.explore)}}>
              <Image className="mx-auto h-48 w-48 md:h-56 md:w-56" src={space.image} alt="" />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">{space.title}</h3>
              <p className="text-sm leading-6 text-gray-400">{space.description}</p>
              <ul role="list" className="mt-6 flex justify-center gap-x-6">
                <li>
                  <a href={space.url.explore} target="_blank" className="text-gray-400 hover:text-gray-300">
                    View Space
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
