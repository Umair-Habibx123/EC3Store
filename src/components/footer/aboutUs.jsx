import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 py-10 sm:py-16">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-700">
            Welcome to <strong>EC3 Store</strong>, your trusted destination
            for premium quality bags and accessories.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left - Text */}
          <div className="lg:w-1/2">
            <p className="text-gray-700 text-lg mb-4">
              We are passionate about providing stylish, durable, and functional
              products that meet the diverse needs of our valued customers. Our
              commitment to excellence and customer satisfaction sets us apart
              in the market.
            </p>
            <p className="text-gray-700 text-lg mb-4">
              At <strong>EC3 Store</strong>, we believe that every product
              tells a story, and we strive to ensure that our products not only
              meet but exceed your expectations. From everyday essentials to
              statement pieces, we take pride in offering a carefully curated
              collection that caters to a wide range of preferences and
              lifestyles.
            </p>
          </div>

          {/* Right - Features */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <ul className="list-disc pl-5 space-y-3 text-gray-700">
              <li>
                <strong>Quality Assurance:</strong> Every product undergoes
                rigorous quality checks to ensure durability, design, and
                craftsmanship.
              </li>
              <li>
                <strong>Customer Support:</strong> Our dedicated team is always
                ready to assist you, whether you have questions, need guidance,
                or require after-sales support.
              </li>
              <li>
                <strong>Secure Shopping:</strong> Enjoy a seamless and secure
                shopping experience with our user-friendly website and payment
                systems.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg">
            To deliver exceptional products and unparalleled service while
            creating a community of happy and loyal customers. We are committed
            to innovation, style, and quality, ensuring you always find
            something you’ll love at <strong>EC3 Store</strong>.
          </p>
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect With Us</h2>
          <p className="text-gray-700 text-lg mb-4">
            We value your feedback and are here to help with any queries or
            concerns.
          </p>
          <ul className="space-y-3 text-gray-700 text-lg">
            <li>
              <strong>WhatsApp:</strong> +92-324-0161704
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto: umairhabibabc@gmail.com"
                className="text-blue-600 hover:underline"
              >
                 umairhabibabc@gmail.com
              </a>
            </li>
            <li>
              <strong>Website:</strong>{" "}
              <a
                href="https://EC3 Store.vercel.app/"
                className="text-blue-600 hover:underline"
              >
                https://EC3Store.vercel.app/
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
