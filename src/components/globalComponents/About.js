import Image from 'next/image';
import { FaTruck, FaShieldAlt } from 'react-icons/fa';

export default function About() {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <Image 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="About Workout-Shop" 
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Workout-Shop was founded in 2020 by two brothers, Amadou and Mamadou, who shared a passion for fitness and helping others achieve their health goals. 
            </p>
            <p className="text-gray-600 mb-6">
              After struggling to find quality home workout equipment in Senegal at reasonable prices, we decided to create a solution. We source directly from manufacturers to bring you the best products at the most competitive prices.
            </p>
            <div className="flex space-x-4">
              <div className="bg-white p-4 rounded-lg shadow-sm flex-1 text-center">
                <FaTruck className="text-blue-500 text-2xl mb-2 mx-auto" />
                <h4 className="font-semibold text-gray-800">Fast Delivery</h4>
                <p className="text-gray-600 text-sm">Across Senegal in 2-5 days</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm flex-1 text-center">
                <FaShieldAlt className="text-blue-500 text-2xl mb-2 mx-auto" />
                <h4 className="font-semibold text-gray-800">Quality Guarantee</h4>
                <p className="text-gray-600 text-sm">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}