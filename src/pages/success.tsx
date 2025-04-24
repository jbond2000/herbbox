import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

const Success: React.FC = () => {
  const { query } = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  // If you want to fetch session details from your backend
  // you can hit an endpoint like /api/checkout-session?session_id=...
  useEffect(() => {
    async function fetchSession() {
      if (!query.session_id) return;
      try {
        const res = await fetch(
          `/api/checkout-session?session_id=${query.session_id}`
        );
        const data = await res.json();
        setEmail(data.customer_details.email || null);
      } catch (e) {
        console.error(e);
      }
    }
    fetchSession();
  }, [query.session_id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <h1 className="text-4xl font-bold text-herbgreen mb-4">
        🎉 Order Successful!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        {email
          ? `A confirmation email has been sent to ${email}.`
          : `A confirmation email is on its way.`}
      </p>
      <Link href="/" passHref>
        <a className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-herbgreenLight transition">
          Back to Home
        </a>
      </Link>
    </div>
  );
};

export default Success;
