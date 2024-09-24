import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white py-6 shadow-md p-4 mx-auto text-center">
      <div className="flex justify-center space-x-4 mt-2">
        <a href="/privacy-policy" className="text-gray-600 hover:text-gray-800">
          Privacy Policy
        </a>
        <a
          href="/terms-of-service"
          className="text-gray-600 hover:text-gray-800"
        >
          Terms of Service
        </a>
        <a href="/contact" className="text-gray-600 hover:text-gray-800">
          Contact Us
        </a>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-gray-700 text-sm">
          &copy; {new Date().getFullYear()} Beetle. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
