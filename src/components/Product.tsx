import React from 'react';

import config from '../config/index.json';
import Divider from './Divider';

const Product = () => {
  const { product } = config;

  return (
    <section className="bg-background py-8" id="product">
      <div className="container max-w-5xl mx-auto m-8">
        {/* Refined Title Styling */}
        <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center">
          <span className="text-gray-800">How </span>
          <span className="text-primary">It </span>
          <span className="text-gray-800">Works</span>
        </h1>

        <Divider />

        {/* Steps */}
        {product.items.map((item, index) => (
          <div
            key={index}
            className={`flex flex-wrap items-center my-12 ${
              index % 2 !== 0 ? 'flex-col-reverse sm:flex-row-reverse' : ''
            }`}
          >
            <div className="w-full sm:w-1/2 p-6">
              <img
                src={item.img}
                alt={item.title}
                className="rounded shadow-md w-full transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="w-full sm:w-1/2 p-6 mt-10 sm:mt-0">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Product;
