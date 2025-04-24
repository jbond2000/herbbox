// src/components/Header.tsx
import React from 'react';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import config from '../config/index.json';
import { useCart } from '../Context/CartContext';

const Header: React.FC = () => {
  const { company, navigation } = config;
  const { cartCount } = useCart();

  return (
    <header className="bg-background shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / Home */}
        <Link href="/" passHref>
          <a className="flex items-center space-x-3">
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="h-10 w-10 object-contain"
            />
            <span className="text-xl font-bold text-herbgreen">
              {company.name}
            </span>
          </a>
        </Link>

        {/* Navigation */}
        <nav className="flex space-x-6">
          {navigation.map((navItem, i) => {
            // hash links vs page links
            if (!navItem.href.startsWith('/')) {
              return (
                <a
                  key={i}
                  href={`#${navItem.href}`}
                  className="text-herbgreen hover:text-herbgreenLight transition"
                >
                  {navItem.name}
                </a>
              );
            }
            return (
              <Link key={i} href={navItem.href} passHref>
                <a className="text-herbgreen hover:text-herbgreenLight transition">
                  {navItem.name}
                </a>
              </Link>
            );
          })}
        </nav>

        {/* Cart Icon (now clickable) */}
        <Link href="/cart" passHref>
          <a className="relative">
            <ShoppingCart className="text-herbgreen w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
