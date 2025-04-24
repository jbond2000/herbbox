import React, { useState } from 'react';

import config from '../config/index.json';
import { useCart } from '../Context/CartContext'; // 👈 Adjust path if needed

const Pricing = () => {
  const { pricing } = config;
  const { addToCart } = useCart(); // 👈 Hook into the cart
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(false); // 👈 State for success message

  const productImages = [
    '/assets/images/box.png',
    '/assets/images/kitchen.png',
    '/assets/images/outside.png',
    '/assets/images/watering.png',
    '/assets/images/instructions.png',
  ];

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleAddToCart = () => {
    addToCart(quantity);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <section id="pricing" className="py-12 bg-background relative">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-primary mb-8">
          {pricing.title}
        </h2>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Image Preview Section */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="w-full h-[500px] rounded-2xl bg-background flex items-center justify-center overflow-hidden">
              <img
                src={productImages[currentIndex]}
                alt={`Product ${currentIndex + 1}`}
                className="object-contain max-h-full max-w-full transition-all duration-300"
              />
            </div>

            <div className="flex gap-2 justify-center mt-4 flex-wrap">
              {productImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleThumbnailClick(index)}
                  className={`h-16 w-16 object-cover rounded-lg cursor-pointer border-2 transition duration-200 ${
                    index === currentIndex
                      ? 'border-primary'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Pricing Details Section */}
          <div className="w-full md:w-1/2">
            {pricing.items.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-gray-100 bg-white"
              >
                <h3 className="text-2xl font-semibold mb-2">{item.name}</h3>
                <p className="text-3xl font-bold text-primary mb-2">
                  {item.price}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  {item.priceDetails}
                </p>
                <ul className="mb-6 text-sm text-gray-800 list-disc pl-5">
                  {item.features.map((feature, fIdx) => (
                    <li key={fIdx}>{feature}</li>
                  ))}
                </ul>

                <div className="flex items-center gap-4 mb-4">
                  <label htmlFor="quantity" className="text-sm">
                    Quantity:
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min="1"
                    className="w-20 border border-gray-300 rounded px-2 py-1 text-center"
                  />
                </div>

                <button
                  onClick={handleAddToCart}
                  className="bg-primary hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
                >
                  Add to Cart
                </button>

                {/* Success Message */}
                {showMessage && (
                  <div className="mt-4 text-sm text-green-700 font-medium bg-green-100 px-4 py-2 rounded">
                    Added to cart!
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
