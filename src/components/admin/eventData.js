import React, { useState, useEffect } from 'react';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/event/event`);
        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    const truncatedText = words.slice(0, maxWords).join(' ');
    return words.length > maxWords ? `${truncatedText} ...` : truncatedText;
  };

  return (
    <div className="lg:flex">
      {/* Sidebar (hidden on mobile) */}
      <div className="hidden lg:block w-1/5 bg-gray-200 p-4">
        {/* Add sidebar content here */}
      </div>

      {/* Main content */}
      <div className="lg:w-3/4 p-4">
        <ul className="list-none divide-y divide-gray-100 bg-neutral-200">
          <li className="bg-blue-500 py-2 text-center">
            <h1 className="text-2xl font-bold text-white">School Notice Board</h1>
          </li>
          {events.map((event) => (
            <li key={event.title} className="flex justify-center items-center gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4 items-center">
                <img className="h-23 w-20 flex-none rounded-full bg-gray-50" src={event.file} alt="" />
                <div className="flex flex-col ml-4">
                  <p className="text-lg font-semibold leading-6 text-gray-900">{event.title}</p>
                  <p className="mt-1 text-lg leading-5 text-gray-500 font-bold">
                    {truncateText(event.description, 20)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventList;
