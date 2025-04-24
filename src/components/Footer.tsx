import React from 'react';

const Footer = () => (
  <footer className="bg-background text-herbgray text-center py-6 border-t mt-12">
    <p className="text-sm">
      &copy; {new Date().getFullYear()} The Herb Box. All rights reserved.
    </p>
  </footer>
);

export default Footer;
