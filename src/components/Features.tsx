import React from 'react';

import config from '../config/index.json';

const Features = () => {
  const { features } = config;

  return (
    <section className="bg-background py-12" id="features">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-primary mb-4">
          {features.title}
        </h2>
        <p className="text-center text-gray-600 mb-12">{features.subtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-xl text-center"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {item.name}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
