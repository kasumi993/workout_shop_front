import React from 'react';
import Avatar from '../globalComponents/Avatar';

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Benjamin Marie',
      date: '15/04/2024',
      rating: 5,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
    },
    // ... add more reviews
  ];

  return (
    <section className="py-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Avis clients</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <Avatar name={review.name[0]}/>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{review.name}</h3>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex text-yellow-400 mb-2">
                  {'★'.repeat(review.rating)}
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;