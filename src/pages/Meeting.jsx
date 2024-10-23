import React, { useEffect, useState } from 'react';
import { FiLoader, FiCheckCircle, FiXCircle, FiCalendar, FiClock, FiMapPin, FiVideo } from 'react-icons/fi'; // Added video icon

const MeetingList = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch(`${apiUrl}/meetings/getAll`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setMeetings(result.data);
        } else {
          setMeetings([]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [apiUrl]);

  return (
    <div className="min-h-screen flex flex-col items-center  py-10">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Your Meetings</h1>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <FiLoader className="animate-spin text-5xl text-blue-600" />
        </div>
      ) : error ? (
        <p className="text-center text-red-600">Error: {error}</p>
      ) : meetings.length === 0 ? (
        <p className="text-center text-gray-600">No meetings found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4">
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="bg-white dark:bg-boxdark shadow-lg rounded-xl p-6 transition hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 duration-300 relative"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{meeting.topic}</h2>

              <div className="flex items-center text-gray-600 mb-2">
                <FiCalendar className="mr-2" />
                <p>{new Date(meeting.meetingDate).toLocaleDateString()}</p>
              </div>

              <div className="flex items-center text-gray-600 mb-2">
                <FiClock className="mr-2 " />
                <p>{meeting.startTime} - {meeting.endTime}</p>
              </div>

              <div className="flex items-center text-gray-600 mb-2">
                <FiMapPin className="mr-2" />
                <p>{meeting.isOnline ? 'Online' : meeting.location}</p>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-between">
                <button
                  className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 rounded-full shadow-lg transition-all duration-300 hover:shadow-2xl"
                  onClick={() => console.log('Join Meeting:', meeting.id)}
                >
                  <FiVideo className="mr-2 text-lg" /> Join
                </button>
                <button
                  className="flex items-center bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => console.log('Cancel Meeting:', meeting.id)}
                >
                  <FiXCircle className="mr-2" /> Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MeetingList;
