
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';
import CiroAgent from './components/CiroAgent';

const App: React.FC = () => {
  return (
    <div className="bg-white min-h-screen font-sans text-custom-dark antialiased">
      <div className="relative overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 -mr-96 mt-20 transform-gpu blur-3xl" aria-hidden="true">
          <div 
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#fda4af] to-[#f9a8d4] opacity-20" 
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}
          ></div>
        </div>
        <div className="absolute bottom-0 left-0 -z-10 -ml-96 mb-20 transform-gpu blur-3xl" aria-hidden="true">
          <div 
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#fbcfe8] to-[#f0abfc] opacity-20" 
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}
          ></div>
        </div>

        <Header />
        <main>
          <Hero />
          <Features />
          <CTA />
        </main>
        <Footer />
        <CiroAgent />
      </div>
    </div>
  );
};

export default App;