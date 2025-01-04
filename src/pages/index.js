import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="bg-cover bg-center bg-gray-800 text-white py-20" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Our Restaurant</h1>
          <p className="text-lg md:text-xl mb-8">Book a table with us and enjoy a delightful dining experience.</p>
          <Link href="/booking" passHref>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Book a Table
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-lg rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-4 text-black">Delicious Food</h3>
              <p className="text-gray-600">Enjoy a variety of cuisines prepared by our top chefs.</p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-4 text-black">Convenient Booking</h3>
              <p className="text-gray-600">Book your table online with ease and save time.</p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-4 text-black">Great Ambience</h3>
              <p className="text-gray-600">Experience a cozy and welcoming atmosphere.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
