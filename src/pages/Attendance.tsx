import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

interface AttendanceRecord {
  date: string;
  day: string;
  status: 'Present' | 'Absent';
}

const Attendance: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL as string;

  


  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedMonth, setSelectedMonth] = useState<string>(''); 
  const [selectedDate, setSelectedDate] = useState<string>(''); 

  const userData = Cookies.get('userData');

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: new Date(0, i).toLocaleString('default', { month: 'long' }),
  }));

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const getCurrentMonthName = (month: number): string => {
    return new Date(0, month).toLocaleString('default', { month: 'long' }) + ' ' + new Date().getFullYear();
  };

  const getDaysInMonth = (month: number): number => {
    const now = new Date();
    const year = now.getFullYear();
    return new Date(year, month + 1, 0).getDate();
  };

  const getDayName = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { weekday: 'long' });
  };

  const getFilteredAttendance = (): AttendanceRecord[] => {
    let filteredAttendance = attendance;

    // Filter by month if selected
    if (selectedMonth !== '') {
      filteredAttendance = filteredAttendance.filter((item) => {
        const date = new Date(item.date);
        return date.getMonth() === parseInt(selectedMonth, 10);
      });
    }

    // Filter by date if selected
    if (selectedDate !== '') {
      filteredAttendance = filteredAttendance.filter((item) => {
        const date = new Date(item.date);
        return date.getDate() === parseInt(selectedDate, 10);
      });
    }

    return filteredAttendance;
  };

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/attendance/get`, {
        month: selectedMonth !== '' ? parseInt(selectedMonth) : undefined,
        day: selectedDate !== '' ? parseInt(selectedDate) : undefined,
      });
      const data = response.data;
      if (data) {
        setAttendance(data);
        setError(null);
      } else {
        setError('No attendance data found');
      }
    } catch (err : any) {
      // Check if error response exists
      if (err.response) {
        // Server responded with a status other than 2xx
        if (err.response.status === 404) {
          setError(err.response.data.message || 'No attendance data found');
        } else {
          setError('An error occurred while fetching attendance data');
        }
      } else {
        // No response was received from the server
        setError('Network error or server is not reachable');
      }
    } finally {
      setLoading(false); // Stop loading after request is complete
    }
  };
  
  // Add this useEffect to call fetchAttendance when selectedMonth or selectedDate changes
  useEffect(() => {
    fetchAttendance();
  }, [selectedMonth, selectedDate]);
  




  if (loading) return <p className="text-gray-600">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const filteredAttendance = getFilteredAttendance();
  const totalDaysInMonth = getDaysInMonth(selectedMonth !== '' ? parseInt(selectedMonth) : new Date().getMonth());
  const currentMonthName = selectedMonth !== '' ? getCurrentMonthName(parseInt(selectedMonth)) : 'All Months';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg max-w-full md:max-w-4xl w-full p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Attendance Overview</h1>

        <div className="flex flex-col md:flex-row justify-between mb-6 gap-5">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="month">
              Select Month
            </label>
            <select
              id="month"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="">All Months</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Select Date
            </label>
            <select
              id="date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="">All Days</option>
              {days.slice(0, getDaysInMonth(selectedMonth !== '' ? parseInt(selectedMonth) : new Date().getMonth())).map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xl font-semibold text-gray-700 mb-4">Summary for {currentMonthName}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-200 p-4 rounded-lg shadow-md">
            <div className="p-4 bg-gradient-to-r from-black to-blue-400 rounded-lg shadow-sm transition transform hover:scale-105">
              <p className="text-white">Total Days in Month</p>
              <p className="text-yellow-400 text-2xl font-bold">{totalDaysInMonth}</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-black to-blue-400 rounded-lg shadow-sm transition transform hover:scale-105">
              <p className="text-white">Days Present</p>
              <p className="text-green-400 text-2xl font-bold">
                {filteredAttendance.filter((item) => item.status === 'Present').length}
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-black to-blue-400 rounded-lg shadow-sm transition transform hover:scale-105">
              <p className="text-white">Days Absent</p>
              <p className="text-red-400 text-2xl font-bold">
                {filteredAttendance.filter((item) => item.status === 'Absent').length}
              </p>
            </div>
          </div>
        </div>

        {filteredAttendance.length > 0 ? (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Detailed Attendance Records</h2>
            <div className="space-y-4">
              {filteredAttendance.map((item, index) => (
                <div key={index} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center transition transform hover:scale-105">
                  <div>
                    <p className="text-gray-800 font-medium">{item.date}</p>
                    <p className="text-gray-600">{item.day} ({getDayName(item.date)})</p>
                  </div>
                  <span
                    className={`font-semibold ${item.status === 'Present' ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-600 mt-6">No attendance records available for the selected month and date.</p>
        )}
      </div>
    </div>
  );
};

export default Attendance;
