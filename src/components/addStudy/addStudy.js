import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-toastify/dist/ReactToastify.css";
import Dropzone from 'react-dropzone';

const EventForm = () => {
  const [name, setName ]= useState('');
  const [topic, setTopic ]= useState('');
  const [description, setDescription] = useState('');
  const [link, setLink]= useState('');
  const [file, setFile] = useState(null);

  const handleFileDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('topic', topic);
    formData.append('link', link);
    formData.append('file', file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/study/add`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status) {
        localStorage.setItem("isLogin", "true");
        toast.success("Study Matterails added successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Post added failed!");
        console.error("Registration failed");
      }

      console.log('Event added successfully:', response.data);
      // Optionally, you can redirect the user or perform other actions here
    } catch (error) {
      console.error('Error adding event:', error);
      // Handle the error (display an error message, etc.)
    }
  };

  return (
    <div className="isolate bg-gray-400 text-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
      <ToastContainer />
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Add Student study Material
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Make help for student to get proper resource of study in website
        </p>
      </div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Book Name:
            </label>
            <div className="mt-2.5">
              <input
                 type="text"
                 id="name"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 required

                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="file"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Book Image:
            </label>
            <div className="mt-2.5">
            <Dropzone onDrop={handleFileDrop}>
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="mt-1 p-2 border border-dashed border-gray-300 rounded-md cursor-pointer"
              >
                <input {...getInputProps()} />
                <p className="text-gray-500">Drag and drop a file here, or click to select a file support only png and jpg file</p>
                {file && <p className="mt-2">Selected file: {file.name}</p>}
              </div>
            )}
          </Dropzone>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Description:
            </label>
            <div className="mt-2.5">
              
               <textarea
               id="description"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
            <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Resource Link
            </label>
            <div className="mt-2.5">
              <input
                 type="text"
                 id="link"
                 value={link}
                 onChange={(e) => setLink(e.target.value)}
                 required

                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Book Name:
            </label>
            <div className="mt-2.5">
              <input
                 type="text"
                 id="topic"
                 value={topic}
                 onChange={(e) => setTopic(e.target.value)}
                 required

                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
            </div>
          </div>
          <div className="flex gap-x-4 sm:col-span-2">
            <div className="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our{" "}
              <a href="/" className="font-semibold text-indigo-600">
                privacy policy
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
