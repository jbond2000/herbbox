import React from 'react';

import Link from 'next/link';

const Canceled: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
    <h1 className="text-4xl font-bold text-red-500 mb-4">
      ❌ Payment Canceled
    </h1>
    <p className="text-lg text-gray-700 mb-6">
      Your payment did not go through. You can try again or continue browsing.
    </p>
    <div className="space-x-4">
      <Link href="/#pricing" passHref>
        <a className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-herbgreenLight transition">
          Try Again
        </a>
      </Link>
      <Link href="/" passHref>
        <a className="underline text-herbgreen hover:text-herbgreenLight">
          Back to Home
        </a>
      </Link>
    </div>
  </div>
);

export default Canceled;
