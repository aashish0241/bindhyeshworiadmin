import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  const truncatedText = text.substr(0, maxLength);
  const lastSpaceIndex = truncatedText.lastIndexOf(' ');
  return lastSpaceIndex === -1 ? `${truncatedText}...` : `${truncatedText.substr(0, lastSpaceIndex)}...`;
};

const TeacherTable = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/teacher/teacher`)
      .then(response => response.json())
      .then(data => {
        // Update the state with the fetched data
        setTeachers(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data');
      });
  }, []);

  const handleDelete = async (teacherId) => {
    try {
      // Send a DELETE request to the API endpoint with the teacher ID
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/teacher/delete/${teacherId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update the teachers state after successful deletion
        setTeachers((prevTeachers) =>
          prevTeachers.filter((teacher) => teacher.id !== teacherId)
        );

        toast.success('Delete successful!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(`Delete failed! Server responded with status: ${response.status}`);
        console.error(`Deletion failed. Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting teacher:', error);
      toast.error('Delete failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200  min-h-screen">
      <ToastContainer />
      <h1 className='text-3xl  font-bold text-center sm:mt-0 '>Our School Teacher Data</h1>

      <div className="overflow-x-auto w-full sm:ml-120">
        <table className="md:ml-[260px] md:w-[80%] bg-white shadow-md rounded-xl">
          <thead>
            <tr className="bg-blue-gray-100 text-gray-700">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Position</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Subject</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-blue-gray-900">
            {teachers.map(teacher => (
              <tr key={teacher.id} className="border-b border-blue-gray-200">
                <td className="py-4 px-4">{teacher.name}</td>
                <td className="py-3 px-4">{teacher.position}</td>
                <td className="py-3 px-4">{teacher.phone}</td>
                <td className="py-3 px-4">{teacher.subject}</td>
                <td className="py-3 px-4">{truncateText(teacher.description, 30)}</td>
                <td className="py-3 px-4">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                    onClick={() => handleDelete(teacher._id)}
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

export default TeacherTable;
