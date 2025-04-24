// src/pages/index.tsx
import React from 'react';

import About from '../components/About';
import Canvas from '../components/Canvas';
import Features from '../components/Features';
import MainHero from '../components/MainHero';
import MainHeroImage from '../components/MainHeroImage';
import Pricing from '../components/Pricing';
import Product from '../components/Product';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-24">
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
            <MainHero />
            <MainHeroImage />
          </div>
        </div>
        <Canvas />
      </section>

      {/* Product */}
      <section id="product" className="relative overflow-hidden">
        <Product />
        <Canvas />
      </section>

      {/* Features */}
      <section id="features" className="relative overflow-hidden">
        <Features />
        <Canvas />
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative overflow-hidden">
        <Pricing />
        <Canvas />
      </section>

      {/* About */}
      <section id="about" className="relative overflow-hidden">
        <About />
        <Canvas />
      </section>
    </div>
  );
};

export default HomePage;
