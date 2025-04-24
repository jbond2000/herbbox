// src/pages/cart.tsx
import React, { useState } from 'react';

import Link from 'next/link';

import config from '../config/index.json';
import { useCart } from '../Context/CartContext';

const CartPage: React.FC = () => {
  const { cartCount } = useCart();
  const item = config?.pricing?.items?.[0];

  const unitPrice = item?.price
    ? parseFloat(item.price.replace(/[^\d.]/g, ''))
    : 0;
  const total = (unitPrice * cartCount).toFixed(2);

  const [name, setName] = useState('');
  const [house, setHouse] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');
  const [postcode, setPostcode] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);

  const validate = () => {
    const errs: string[] = [];
    if (!name.trim()) errs.push('Name is required');
    if (!house.trim()) errs.push('House number is required');
    if (!street.trim()) errs.push('Street name is required');
    if (!city.trim()) errs.push('Town/City is required');
    if (!county.trim()) errs.push('County is required');
    if (!postcode.trim()) errs.push('Postcode is required');
    setErrors(errs);
    return errs.length === 0;
  };

  const handleCheckout = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quantity: cartCount,
            shipping: { name, house, street, city, county, postcode },
          }),
        }
      );

      if (!res.ok) throw new Error(await res.text());

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No Stripe session URL returned.');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      alert(`Failed to start checkout: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-gray-800 py-16 px-4 md:px-20">
      <h1 className="text-4xl font-bold text-primary text-center mb-12">
        Order Summary
      </h1>

      {!item || cartCount === 0 ? (
        <div className="text-center">
          <p className="mb-6">Your cart is empty.</p>
          <Link href="/" passHref>
            <a className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-herbgreenLight transition">
              Continue Shopping
            </a>
          </Link>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-soft p-8 space-y-6">
          <div className="flex justify-between">
            <span className="font-medium">{item.name}</span>
            <span>£{unitPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Quantity</span>
            <span>{cartCount}</span>
          </div>
          <div className="border-t border-gray-200" />
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>£{total}</span>
          </div>

          {/* Form Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-herbgreen">
              Delivery Details
            </h2>
            {errors.length > 0 && (
              <ul className="text-sm text-red-600 list-disc pl-5">
                {errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="House No."
                value={house}
                onChange={(e) => setHouse(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Street Name"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 col-span-2"
              />
              <input
                type="text"
                placeholder="Town/City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="County"
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={isLoading}
            className={`w-full ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-secondary hover:bg-herbgreen'
            } text-white font-semibold py-3 rounded-lg transition`}
          >
            {isLoading ? 'Redirecting…' : 'Proceed to Checkout'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
