
import React from 'react';
import ChatIcon from './icons/ChatIcon';
import ZapIcon from './icons/ZapIcon';
import GlobeIcon from './icons/GlobeIcon';

const features = [
  {
    name: 'Conversational AI',
    description: 'Engage in natural, human-like conversations. Ciro understands context and provides relevant, insightful responses.',
    icon: ChatIcon,
  },
  {
    name: 'Task Automation',
    description: 'Let Ciro handle your repetitive tasks. From scheduling meetings to sending emails, boost your productivity effortlessly.',
    icon: ZapIcon,
  },
  {
    name: 'Personalized Experience',
    description: 'Ciro learns your preferences and adapts to your needs, providing a truly personalized and helpful experience.',
    icon: GlobeIcon,
  },
];

const Features: React.FC = () => {
  return (
    <div id="features" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-custom-pink-dark">Everything you need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-custom-dark sm:text-4xl">
            A better workflow starts with Ciro
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover a suite of features designed to make your life easier and more efficient, all powered by cutting-edge AI.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-custom-dark">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-custom-pink-dark">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
