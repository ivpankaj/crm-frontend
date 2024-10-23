import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// TaskDetail component
const TaskDetail = () => {
  const [taskData, setTaskData] = useState({
    taskDescription: '',
    workDone: '',
    date: new Date(),
    status: 'Not started',
    comments: '',
  });

  const [showPopup, setShowPopup] = useState(false);

  const statusOptions = ['Not started', 'In progress', 'Completed', 'Waiting'];

  // Handle form input changes
  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setTaskData({ ...taskData, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send this data to the backend (e.g., via API)
    console.log('Task Data Submitted: ', taskData);
    
    // Show the popup message
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Submit Your Work Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      
        <div className="flex flex-col">
          <label htmlFor="workDone" className="font-medium">Task Description</label>
          <textarea
            id="workDone"
            name="workDone"
            value={taskData.workDone}
            onChange={handleChange}
            className="p-2 border rounded focus:outline-none"
            placeholder="Detail the work you completed today"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="date" className="font-medium">Date</label>
          <DatePicker
            selected={taskData.date}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            className="w-full p-2 border rounded focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="status" className="font-medium">Status</label>
          <select
            id="status"
            name="status"
            value={taskData.status}
            onChange={handleChange}
            className="p-2 border rounded focus:outline-none"
            required
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit Work Details
          </button>
        </div>
      </form>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-100">
          <div className="bg-white p-6 rounded shadow-xl">
            <h3 className="text-lg font-bold">Thank You!</h3>
            <p>Your work details have been submitted successfully.</p>
            <button
              onClick={handleClosePopup}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
