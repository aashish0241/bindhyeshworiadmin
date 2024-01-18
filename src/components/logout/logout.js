import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      // Clear the login state from local storage
      localStorage.removeItem('isLogin');

      // Show success toast
      toast.success('Logout successful!', {
        position: 'top-right',
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Redirect to the desired route
      navigate('/');

      // Refresh the browser
      window.location.reload();
    };

    // Automatically handle logout when the component mounts
    handleLogout();
  }, [navigate]); // Adding navigate as a dependency to useEffect

  return (
    <div>
      {/* Your JSX for the logout component */}
      <ToastContainer />
    </div>
  );
};

export default Logout;
