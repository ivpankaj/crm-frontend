import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';


const ReviewPage = () => {
  // Sample reviews with profile images
  const navigate=useNavigate();
  const reviews = [
    {
      id: 1,
      name: 'Vikram Sign',
      profileImage: '/pic1.jpg',
      review: 'Great performance! Always reliable and delivers quality work.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Muskan Gupta',
      profileImage: '/pic5.jpg',
      review: 'Good team player and consistently meets deadlines.',
      rating: 4,
    },
    {
      id: 3,
      name: 'Pankaj Kumar',
      profileImage: '/pic6.jpg',
      review: 'Shows excellent problem-solving skills and attention to detail.',
      rating: 5,
    },
    {
      id: 4,
      name: 'Sanjeev Kumar',
      profileImage: '/pic7.jpg',
      review: 'Needs improvement in communication but good technical skills.',
      rating: 3,
    },
  ];
   const handlebutton =()=>{
    navigate('/dashboard/feedback')
   }

  return (
    <div className="min-h-screen bg-red-300 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Employee Reviews</h1>
          <button onClick={handlebutton} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Submit Your Review
          </button>
        </div>
        
        {/* Reviews Section */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm">
              <img
                src={review.profileImage}
                alt={`${review.name}'s profile`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">{review.name}</h2>
                  <div className="flex items-center space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <FaStar key={i} className="text-gray-300" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{review.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
