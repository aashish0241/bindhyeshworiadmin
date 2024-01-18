import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Message = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:3000/api/contact/message')
      .then(response => response.json())
      .then(data => {
        // Update the state with the fetched data
        setMessages(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = async (messageId) => {
    try {
      // Send a DELETE request to the API endpoint with the message ID
      const response = await fetch(`http://localhost:3000/api/contact/delete/${messageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        localStorage.setItem("isLogin", "true");
        toast.success('Delete successful!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        console.log('Delete successful!');
      } else {
        toast.error("Delete Failed")
        console.error(`Delete failed! Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 min-h-screen">
      <ToastContainer/>
      <h1 className="text-3xl font-bold text-center sm:mt-0 sm:ml-200">Message From Parents</h1>
      <h1 className="text-2xl font-bold">Message Cannot delete from mobile</h1>
      <div className="overflow-x-auto w-full sm:ml-120">
        <table className="md:ml-[260px] md:w-[80%] bg-white shadow-md rounded-xl">
          <thead>
            <tr className="bg-blue-gray-100 text-gray-700">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Address</th>
              <th className="py-3 px-4">Message</th>
              <th className="py-3 px-4">Subject</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-blue-gray-900">
            {messages.map(message => (
              <tr key={message.id} className="border-b border-blue-gray-200">
                <td className="py-4 px-4">{message.name}</td>
                <td className="py-3 px-4">{message.email}</td>
                <td className="py-3 px-4">{message.address}</td>
                <td className="py-3 px-4">{message.message}</td>
                <td className="py-3 px-4">{message.subject}</td>
                <td className="py-3 px-4">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                    onClick={() => handleDelete(message._id)}
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

export default Message;
