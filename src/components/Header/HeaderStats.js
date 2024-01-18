
import React, { useState, useEffect } from "react";
// components

import CardStats from "../Cards/CardStats.js";

export default function HeaderStats() {
  const [totalEvents, setTotalEvents] = useState(0);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:3000/api/event/event")
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API response has an array of events
        const events = data && data.events ? data.events : [];

        // Calculate the total number of events
        const totalEventsCount = events.length;

        // Set the total count
        setTotalEvents(totalEventsCount);
      })
      .catch((error) => console.error("Error fetching event data:", error));
  }, []); // Empty dependency array ensures that this effect runs once when the component mounts

  return (
    <>
      {/* Header */}
      <div className="relative bg-blue-500 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Event"
                  statTitle={totalEvents !== null ? totalEvents : "Loading..."}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="NEW USERS"
                  statTitle="2,356"
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="SALES"
                  statTitle="924"
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PERFORMANCE"
                  statTitle="49,65%"
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
        
      </div>
      
    </>
  );
}
