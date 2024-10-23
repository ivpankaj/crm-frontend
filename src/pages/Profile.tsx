// import { useEffect, useState } from 'react';
// import { FaEnvelope, FaPhone, FaBuilding, FaCalendarAlt, FaMapMarkerAlt, FaUserAlt, FaEdit } from 'react-icons/fa';
// import CoverOne from '../images/cover/cover-01.png';
// import axios from 'axios'


// const Profile = () => {
//   const [userdata, setData] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null); // State to store selected image
//   const [previewImage, setPreviewImage] = useState(null); // State to store preview image URL
//   const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
 


//   useEffect(() => {
//     fetchEmployeeData();
//   },[]);



//   const fetchEmployeeData = async () => {
//     try {
//       alert('sd')
//       const response = await axios.get('/employee/get');
//       if (!response) {
//         throw new Error('Failed to fetch employee data');
//       }
//       const data = response.data
//       setData(data);
//     } catch (error) {
//       console.error('Error fetching employee data:', error);
//     }
//   };

//   if (!userdata) {
//     return <p>Loading...</p>;
//   }

//   const formattedHireDate = userdata.hireDate
//     ? new Date(userdata.hireDate).toLocaleDateString()
//     : '27/9/24';

//   const employeeDetails = [
//     { label: 'Full Name', value: userdata.name || 'Arohi', icon: <FaUserAlt /> },
//     { label: 'Email', value: userdata.email || 'arohi5@gmail.com', icon: <FaEnvelope /> },
//     { label: 'Phone', value: userdata.contactNumber || '+123 456 7890', icon: <FaPhone /> },
//     { label: 'Department', value: userdata.department || 'IT', icon: <FaBuilding /> },
//     { label: 'Hire Date', value: formattedHireDate, icon: <FaCalendarAlt /> },
//     { label: 'Address', value: userdata.address || 'Noida', icon: <FaMapMarkerAlt /> },
//   ];

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       setPreviewImage(URL.createObjectURL(file)); // Create a preview URL for the selected image
//       setIsEditing(true); // Enable editing mode when an image is selected
//     }
//   };

//   const handleUpdate = () => {
//     // Implement API call to update profile image here
//     // After successfully updating the image, you can reset the states
//     setIsEditing(false);
//     setSelectedImage(null);
//   };

//   const handleCancel = () => {
//     setPreviewImage(null);
//     setSelectedImage(null);
//     setIsEditing(false); // Exit edit mode without making changes
//   };

//   return (
//     <>
//       {/* Profile Cover Section */}
//       <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg bg-gradient-to-r from-black to-gray-300 dark:bg-gray-800">
//         <div className="relative z-20 h-36 md:h-72">
//           <img
//             src={CoverOne}
//             alt="profile cover"
//             className="h-full w-full rounded-t-lg object-cover object-center"
//           />
//           <div className="absolute bottom-4 right-4 z-10">
//             <button
//               onClick={() => document.getElementById('cover').click()}
//               className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-opacity-80 border border-transparent hover:border-primary transition duration-300"
//             >
//               <span>Edit Cover</span>
//             </button>
//             <input
//               type="file"
//               id="cover"
//               className="sr-only"
//               onChange={handleImageChange}
//             />
//           </div>
//         </div>

//         {/* Profile Information */}
//         <div className="px-6 pb-8 text-center lg:pb-10 xl:pb-12">
//           <div className="relative z-30 mx-auto -mt-24 h-32 w-32 max-w-xs rounded-full bg-white p-2 backdrop-blur border border-gray-300 dark:border-gray-700 shadow-lg">
//             <div className="relative">
//               {/* Profile Picture */}
//               <img
//                 src={previewImage || '/pic1.jpg'} // Display the preview image if available
//                 alt="Profile"
//                 className="h-full w-full rounded-full object-cover"
//               />
//               {/* Edit Icon */}
//               <div
//                 onClick={() => document.getElementById('profile-pic').click()}
//                 className="absolute bottom-0 right-0 p-2 bg-gray-800 rounded-full cursor-pointer"
//               >
//                 <FaEdit className="text-blue-500 text-2xl" />
//                 <input
//                   type="file"
//                   id="profile-pic"
//                   className="sr-only"
//                   onChange={handleImageChange}
//                 />
//               </div>
//             </div>
//           </div>

//           {isEditing && (
//             <div className="flex justify-center mt-4 space-x-4">
//               <button
//                 onClick={handleUpdate}
//                 className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
//               >
//                 Update
//               </button>
//               <button
//                 onClick={handleCancel}
//                 className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           )}

//           <div className="mt-4">
//             <h3 className="mb-2 text-3xl font-bold text-white dark:text-white">
//               {userdata.name || 'Arohi'}
//             </h3>
//             <p className="text-lg font-medium text-white dark:text-gray-400">
//               {userdata.jobTitle || 'Developer'}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Redesigned Employee Information Section */}
//       <div className="mt-10 p-8 bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
//         <h4 className="text-3xl font-semibold mb-8 text-center text-gray-800 dark:text-gray-200">
//           Employee Information
//         </h4>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {employeeDetails.map((detail, index) => (
//             <div
//               key={index}
//               className="flex items-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
//             >
//               <div className="p-3 bg-gray-100 dark:bg-gray-600 rounded-full mr-4 text-primary text-lg">
//                 {detail.icon}
//               </div>
//               <div>
//                 <span className="block font-semibold text-gray-800 dark:text-white">
//                   {detail.label}
//                 </span>
//                 <span className="text-gray-600 dark:text-gray-300">
//                   {detail.value}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;










import { useEffect, useState } from 'react';
import { FaEnvelope, FaPhone, FaBuilding, FaCalendarAlt, FaMapMarkerAlt, FaUserAlt, FaEdit } from 'react-icons/fa';
import CoverOne from '../images/cover/cover-01.png';
import axios from 'axios';
import Cookies from 'js-cookie';

interface UserData {
  name: string;
  email: string;
  contactNumber: string;
  department: string;
  hireDate: string;
  address: string;
  jobTitle?: string; // Optional field
  usertype_name?:string;
}

const Profile: React.FC = () => {
  const [userdata, setData] = useState<UserData | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const apiUrl = import.meta.env.VITE_API_URL;


  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`${ apiUrl}/employee/get`);
      if (!response) {
        throw new Error('Failed to fetch employee data');
      }
      setData(response.data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  if (!userdata) {
    return <p>Loading...</p>;
  }

  const formattedHireDate = userdata.hireDate
    ? new Date(userdata.hireDate).toLocaleDateString()
    : '27/9/24';

  const employeeDetails = [
    { label: 'Full Name', value: userdata.name || 'Arohi', icon: <FaUserAlt /> },
    { label: 'Email', value: userdata.email || 'arohi5@gmail.com', icon: <FaEnvelope /> },
    { label: 'Phone', value: userdata.contactNumber || '+123 456 7890', icon: <FaPhone /> },
    { label: 'Department', value: userdata.department || 'IT', icon: <FaBuilding /> },
    { label: 'Hire Date', value: formattedHireDate, icon: <FaCalendarAlt /> },
    { label: 'Address', value: userdata.address || 'Noida', icon: <FaMapMarkerAlt /> },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setIsEditing(true);
    }
  };

  const handleUpdate = async () => {
    if (selectedImage) {
      // Implement API call to update profile image here
      // After successfully updating the image, you can reset the states
      setIsEditing(false);
      setSelectedImage(null);
    }
  };

  const handleCancel = () => {
    setPreviewImage(null);
    setSelectedImage(null);
    setIsEditing(false);
  };

  return (
    <>
      {/* Profile Cover Section */}
      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg bg-gradient-to-r from-black to-gray-300 dark:bg-gray-800">
        <div className="relative z-20 h-36 md:h-72">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-t-lg object-cover object-center"
          />
          <div className="absolute bottom-4 right-4 z-10">
            <button
              onClick={() => document.getElementById('cover')?.click()}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-opacity-80 border border-transparent hover:border-primary transition duration-300"
            >
              <span>Edit Cover</span>
            </button>
            <input
              type="file"
              id="cover"
              className="sr-only"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Profile Information */}
        <div className="px-6 pb-8 text-center lg:pb-10 xl:pb-12">
          <div className="relative z-30 mx-auto -mt-24 h-32 w-32 max-w-xs rounded-full bg-white p-2 backdrop-blur border border-gray-300 dark:border-gray-700 shadow-lg">
            <div className="relative">
              <img
                src={previewImage || '/pic1.jpg'}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
              <div
                onClick={() => document.getElementById('profile-pic')?.click()}
                className="absolute bottom-0 right-0 p-2 bg-gray-800 rounded-full cursor-pointer"
              >
                <FaEdit className="text-blue-500 text-2xl" />
                <input
                  type="file"
                  id="profile-pic"
                  className="sr-only"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                Update
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          )}

          <div className="mt-4">
            <h3 className="mb-2 text-3xl font-bold text-white dark:text-white">
              {userdata.name || 'Arohi'}
            </h3>
            <p className="text-lg font-medium text-white dark:text-gray-400">
              {userdata.usertype_name || 'no type'}
            </p>
          </div>
        </div>
      </div>

      {/* Redesigned Employee Information Section */}
      <div className="mt-10 p-8 bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h4 className="text-3xl font-semibold mb-8 text-center text-gray-800 dark:text-gray-200">
          Employee Information
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {employeeDetails.map((detail, index) => (
            <div
              key={index}
              className="flex items-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-3 bg-gray-100 dark:bg-gray-600 rounded-full mr-4 text-primary text-lg">
                {detail.icon}
              </div>
              <div>
                <span className="block font-semibold text-gray-800 dark:text-white">
                  {detail.label}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {detail.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
