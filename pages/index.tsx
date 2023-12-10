import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";


export default function Index() {
  const [events, setAllEvents] = useState([]);
  const { address } = useAccount();
  const [tab, setTab] = useState<"allEvents" | "myEvents">("allEvents");
  const router = useRouter()

  const fetchEvents = async (url: string) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setAllEvents(data.data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const postEvent = async (eventId: string, address: string) => {
    try {
      const response = await fetch("/api/event/register", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( {eventId , address})
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchEvents("/api/event/all");
  }, []);

  useEffect(() => {
    if (tab == "allEvents")
    fetchEvents("/api/event/all");
    else 
    fetchEvents("/api/event/all")
  }, [tab]);

  const handleRegistration = async (eventId: string) => {
    await postEvent(eventId, "address")
  }

  return (
    <Layout pageTitle="All Events">

    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-5xl font-bold tracking-tight text-white py-6">
                  Meetups at MONAverse made easier 💯
                </h1>
                <h5 className="text-md tracking-tight text-white pt-2">With MonaCal, Schedule events on the MONAverse without any hassle. </h5>
              </div>
              <div>

              <a onClick={() => {router.push("/spaces")}} className  ={"inline-block m-6 mt-8 p-3 rounded-lg bg-gray-100 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"} aria-current="page">Schedule an event</a>
                
              {/* <ul className ="flex flex-wrap text-sm font-medium justify-center pt-5 text-center text-gray-500 dark:text-gray-400">
                <li className ="me-2">
                    <a onClick={() => setTab("allEvents")} className  ={tab == "allEvents" ? "inline-block px-4 py-3 text-white bg-gray-800 rounded-lg active": "inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"} aria-current="page">All Events</a>
                </li>
                <li className ="me-2">
                    <a onClick={() => setTab("myEvents")}  className  ={tab == "myEvents" ? "inline-block px-4 py-3 text-white bg-gray-800 rounded-lg active": "inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"}>My Events</a>
                </li>
                </ul> */}
            </div>  
            <h1 className="text-xl tracking-tight text-white pt-20">Happening in Monaverse... </h1>
        <ul
          role="list"
          className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
        >
          {tab == "allEvents" ? 
          events.map((event) => (
                  <li key={event.title} className=" bg-gray-800 px-8 py-10">
                    <img className="mx-auto h-48 w-48 md:h-56 md:w-56" src={event.thumbnail} alt="" />
                    <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">{event.title}</h3>
                    <p className="text-sm leading-6 text-gray-400 truncate ...">{event.description}</p>
                    <ul role="list" className="mt-4 flex justify-center text-white">
                      <div className="flex">
                      <svg class="h-5 w-5 mx-1 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="4" y="5" width="16" height="16" rx="2" />  <line x1="16" y1="3" x2="16" y2="7" />  <line x1="8" y1="3" x2="8" y2="7" />  <line x1="4" y1="11" x2="20" y2="11" />  <line x1="11" y1="15" x2="12" y2="15" />  <line x1="12" y1="15" x2="12" y2="18" /></svg>
                        <p className="text-sm">{new Date(event.startTime).toString().split(" ").slice(0,4).join(" ")}</p>
                      </div>

                      <div className="flex mx-2">
                      <svg class="h-5 w-5 mx-1 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="7" />  <polyline points="12 9 12 12 13.5 13.5" />  <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83" /></svg>
                      <p className="text-sm">{new Date(event.startTime).toString().split(" ")[4]}</p>
                      </div> 
                    
                    </ul>
                    { new Date(event.startTime) > new Date() ?
                        <button type="button" class="text-gray-900 bg-gray-100 font-medium rounded-full text-sm mt-4 px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={handleRegistration} >Register Now</button>
                    : <p className="bg-gray-700 text-sm my-4 py-1"> This Event is expired.</p>} 
                        </li>
          )) : events.map((event) => (
            <li key={event.title} className=" bg-gray-800 px-8 py-10">
              <img className="mx-auto h-48 w-48 md:h-56 md:w-56" src={event.thumbnail} alt="" />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">{event.title}</h3>
              <p className="text-sm leading-6 text-gray-400 truncate ...">{event.description}</p>
              <ul role="list" className="mt-4 flex justify-center text-white">
                <div className="flex">
                <svg class="h-5 w-5 mx-1 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="4" y="5" width="16" height="16" rx="2" />  <line x1="16" y1="3" x2="16" y2="7" />  <line x1="8" y1="3" x2="8" y2="7" />  <line x1="4" y1="11" x2="20" y2="11" />  <line x1="11" y1="15" x2="12" y2="15" />  <line x1="12" y1="15" x2="12" y2="18" /></svg>
                  <p className="text-sm">{new Date(event.startTime).toString().split(" ").slice(0,4).join(" ")}</p>
                </div>

                <div className="flex mx-2">
                <svg class="h-5 w-5 mx-1 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="7" />  <polyline points="12 9 12 12 13.5 13.5" />  <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83" /></svg>
                <p className="text-sm">{new Date(event.startTime).toString().split(" ")[4]}</p>
                </div> 
              
              </ul>
              { new Date(event.startTime) > new Date() ?
                  <button type="button" class="text-gray-900 bg-gray-100 font-medium rounded-full text-sm mt-4 px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" >Join Now</button>
              : <p className="bg-gray-700 text-sm my-4 py-1"> This Event is expired.</p>} 
                  </li>
    )) }
        </ul>
      </div>
    </div>
    </Layout>

  );
}
