
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-custom-dark sm:text-6xl">
            Meet <span className="text-custom-pink-dark">Ciro</span>, Your Personal AI Assistant
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Ciro simplifies your daily tasks, enhances your creativity, and boosts your productivity. Experience the future of personal assistance, tailored just for you.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-custom-pink-dark px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 transition-transform duration-300 ease-in-out hover:scale-105"
            >
              Get started for free
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-custom-dark group">
              Learn more <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
