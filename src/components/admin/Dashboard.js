import React from "react";

// components

// import CardLineChart from "../Cards/CardLineChart.js";
// import CardBarChart from "../Cards/CardBarChart.js";
import CardPageVisits from "../Cards/CardPageVisits.js";
import CardSocialTraffic from "../Cards/CardSocialTraffic.js";

import EventData from "./eventData.js"



export default function Dashboard() {
  return (
    <>
      <div className="w-full">
        
        <div className="w-full grid mt-[120px] xl:w-15/12 mb-12 xl:mb-0 px-4">
        
          <EventData/>
          
        </div>
        <div className="w-full xl:w-4/12 px-4">
          {/* <CardTable/> */}
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
}
