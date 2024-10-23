import React, { useEffect, useState } from 'react';
import { FaUser, FaStar, FaTasks, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CardDataStats from '../../components/CardDataStats';
import MapOne from '../../components/Maps/MapOne';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import axios from 'axios';

// Define a type for the user data
interface UserData {
  name: string;
  [key: string]: any; // To allow other potential user properties
}

const ECommerce: React.FC = () => {
  const navigate = useNavigate();
  const [userdata, setData] = useState<UserData | null>(null); // UserData or null
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL as string;

  // Get token and loginType from cookies
  const [token, setToken] = useState<string | null>(Cookies.get('userToken'));
  const loginType = Cookies.get('loginType') || ''; // loginType can be empty string if not present

  // Set default axios headers
  axios.defaults.headers.common['Authorization'] = `${token}`;
  axios.defaults.baseURL = apiUrl;

  // Navigation handlers
  const handleAttendance = () => navigate('/dashboard/attendance');
  const handleReview = () => navigate('/dashboard/review');
  const handleTask = () => navigate('/dashboard/task');
  const handleTaskDetail = () => navigate('/dashboard/taskdetail');
  const handleLead = () => navigate('/dashboard/viewlead');

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/employee/get`); // Adjust endpoint as needed
        setData(response.data);
      } catch (error: any) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [apiUrl]);

  if (loading) {
    return <p className="text-white text-center mt-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  if (!userdata) {
    return <p className="text-white text-center mt-4">No data found</p>;
  }

  return (
    <>
      <motion.div
        className="bg-gray-800 shadow-2xl rounded-lg p-8 mb-6 flex items-center space-x-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center space-x-4">
          <motion.div
            className="w-20 h-20 flex-shrink-0 rounded-full bg-white p-2 flex items-center justify-center shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 300 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-blue-500 hover:text-blue-600 transition-colors duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="6" x2="12" y2="12"></line>
              <line x1="12" y1="12" x2="15" y2="15"></line>
            </svg>
          </motion.div>
          <div>
            <h1 className="text-4xl font-bold text-black dark:text-white">
              Welcome,{' '}
              <span className="text-blue-300 uppercase">{userdata.name}</span>
            </h1>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div onClick={handleAttendance} className="cursor-pointer">
          <CardDataStats title="Total Attendance" total="01" rate="55" levelUp>
            <FaUser className="text-teal-500 dark:text-white text-3xl transition-transform transform hover:scale-110" />
          </CardDataStats>
        </div>

        <div onClick={handleTask} className="cursor-pointer">
          <CardDataStats title="Task Assign" total="05" rate="0%" levelUp>
            <FaTasks className="text-orange-500 dark:text-white text-3xl transition-transform transform hover:scale-110" />
          </CardDataStats>
        </div>

        <div onClick={handleTaskDetail} className="cursor-pointer">
          <CardDataStats title="Send Task Detail" total="10" rate="" levelDown>
            <FaUsers className="text-green-500 dark:text-white text-3xl transition-transform transform hover:scale-110" />
          </CardDataStats>
        </div>

        <div onClick={handleReview} className="cursor-pointer">
          <CardDataStats title="Your Reviews" total="4.5" rate="4.5%" levelUp>
            <FaStar className="text-yellow-400 dark:text-white text-3xl transition-transform transform hover:scale-110" />
          </CardDataStats>
        </div>

        {/* Conditionally render the View Lead card based on loginType */}
        {(loginType === 'sales_person' || loginType === 'counselor') && (
          <div onClick={handleLead} className="cursor-pointer">
            <CardDataStats title="View Lead" total="4.5" rate="4.5%" levelUp>
              <FaStar className="text-yellow-400 dark:text-white text-3xl transition-transform transform hover:scale-110" />
            </CardDataStats>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          {/* Additional content can go here */}
        </div>
      </div>
    </>
  );
};

export default ECommerce;
