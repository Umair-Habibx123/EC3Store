import React from "react";
import image2 from '../../assets/images/refund.jpeg';

const ReturnsPolicy = () => {
  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden p-4 sm:p-6 lg:p-12 gap-6">
      {/* Top - Image */}
      <div className="w-full flex justify-center">
        <img
          src={image2}
          alt="Returns and Refund Policy"
          className="w-full max-w-xl md:max-w-2xl h-auto rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Bottom - Text */}
      <div className="w-full max-w-xl md:max-w-2xl text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-snug">
          Returns and Refund Policy
        </h2>
        <p className="text-gray-700 text-base sm:text-lg mb-3 sm:mb-4">
          All products are thoroughly checked prior to dispatching/shipping. If
          you receive a damaged or faulty item, it can be exchanged by
          contacting us via WhatsApp at{" "}
          <strong className="text-gray-900">+92-324-0161704</strong> or mailing
          us at{" "}
          <a
            href="mailto:umairhabibabc@gmail.com"
            className="text-blue-600 hover:underline font-semibold"
          >
            umairhabibabc@gmail.com
          </a>
          .
        </p>
        <p className="text-gray-700 text-base sm:text-lg mb-3 sm:mb-4">
          If you are not satisfied with the quality, size, or material, you can
          exchange the item for another product available in our store.
        </p>
        <p className="text-gray-700 text-base sm:text-lg">
          Please note that any price difference between the exchanged products
          and shipping costs must be borne by{" "}
          <strong className="text-gray-900">the customer</strong>.
        </p>
      </div>
    </div>
  );
};

export default ReturnsPolicy;
