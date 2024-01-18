import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  const truncatedText = text.substr(0, maxLength);
  const lastSpaceIndex = truncatedText.lastIndexOf(' ');
  return lastSpaceIndex === -1 ? `${truncatedText}...` : `${truncatedText.substr(0, lastSpaceIndex)}...`;
};

const StudyTable = () => {
  const [studyMaterials, setStudyMaterials] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/study/study`)
      .then(response => response.json())
      .then(data => {
        // Update the state with the fetched data
        setStudyMaterials(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = async (studyMaterialId) => {
    try {
      // Send a DELETE request to the API endpoint with the study material ID
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/study/delete/${studyMaterialId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update the study materials state after successful deletion
        setStudyMaterials((prevStudyMaterials) =>
          prevStudyMaterials.filter((studyMaterial) => studyMaterial.id !== studyMaterialId)
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
      console.error('Error deleting study material:', error);
      toast.error('Delete failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200  min-h-screen">
      <ToastContainer />
      <h1 className='text-3xl  font-bold text-center sm:mt-0 sm:ml-200'>Our School Study Materials</h1>
      <h1 className='text-2xl font-bold'>Study Material Cannot delete from mobile</h1>
      <div className="overflow-x-auto w-full sm:ml-120">
        <table className="md:ml-[260px] md:w-[80%] bg-white shadow-md rounded-xl">
          <thead>
            <tr className="bg-blue-gray-100 text-gray-700">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Topic</th>
              <th className="py-3 px-4">Link</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-blue-gray-900">
            {studyMaterials.map(studyMaterial => (
              <tr key={studyMaterial.id} className="border-b border-blue-gray-200">
                <td className="py-4 px-4">{studyMaterial.name}</td>
                <td className="py-3 px-4">{studyMaterial.topic}</td>
                <td className="py-3 px-4">{studyMaterial.link}</td>
                <td className="py-3 px-4">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                    onClick={() => handleDelete(studyMaterial._id)}
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

export default StudyTable;
