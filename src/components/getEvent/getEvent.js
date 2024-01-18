import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

const EventTable = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/event/event`)
      .then(response => response.json())
      .then(data => {
        // Update the state with the fetched data
        setEvents(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = async (orderId) => {
    try {
      // Send a DELETE request to the API endpoint with the order ID
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/event/delete/${orderId}`, {
        method: "DELETE",
      });

      // Update the events state after successful deletion
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== orderId)
      );
      if (response.status) {
        // localStorage.setItem("isLogin", "true");
        toast.success("Delete successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Delete failed!");
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200  min-h-screen">
      <ToastContainer />
      <h1 className='text-3xl  font-bold text-center sm:mt-0 sm:ml-200'>Our Total Event Data</h1>
      <div className="overflow-x-auto w-full sm:ml-120">
        <table className="md:ml-[260px] md:w-[80%] bg-white shadow-md rounded-xl">
          <thead>
            <tr className="bg-blue-gray-100 text-gray-700">
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-blue-gray-900">
            {events.map(event => (
              <tr key={event.id} className="border-b border-blue-gray-200">
                <td className="py-4 px-4">{event.title}</td>
                <td className="py-3 px-4">{truncateText(event.description, 40)}</td>
                <td className="py-3 px-4">{event.date}</td>
                <td className="py-3 px-4">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                    onClick={() => handleDelete(event._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full pt-5 px-4 mb-8">
        {/* Additional content goes here */}
      </div>
    </div>
  );
};

export default EventTable;
