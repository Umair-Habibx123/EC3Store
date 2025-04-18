import React from "react";
import imageShipping from "../../assets/images/shipping.jpeg";

const ShippingPolicy = () => {
    return (
        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden p-4 sm:p-6 lg:p-12 gap-6">
            {/* Top - Image */}
            <div className="w-full flex justify-center">
                <img
                    src={imageShipping}
                    alt="Shipping Policy"
                    className="w-full max-w-xl md:max-w-2xl h-auto rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
                />
            </div>

            {/* Bottom - Text */}
            <div className="w-full max-w-xl md:max-w-2xl text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-snug">
                    Shipping Policy
                </h2>
                <p className="text-gray-700 text-base sm:text-lg mb-3 sm:mb-4">
                    Upon placing an order, you will receive a verification call or SMS
                    from our Customer Service Associate to ensure order accuracy. Once
                    your order has been confirmed, it will be sent to our warehouse for
                    shipment.
                </p>
                <p className="text-gray-700 text-base sm:text-lg mb-3 sm:mb-4">
                    If the item(s) are out of stock in our warehouse, we will only ship
                    the available article(s). For unavailable items, we will seek your
                    advice regarding replacement product(s).
                </p>
                <p className="text-gray-700 text-base sm:text-lg mb-3 sm:mb-4">
                    You will be informed via phone or email if a shipment is delayed due
                    to any reason. Your order should be delivered within{" "}
                    <strong className="text-gray-900">2-4 business days</strong> via TCS
                    and M&P.
                </p>
                <p className="text-gray-700 text-base sm:text-lg">
                    Please do not accept shipments in any flyer other than{" "}
                    <strong className="text-gray-900">TCS & M&P</strong>. For more
                    information, visit our website:{" "}
                    <a
                        href="https://ec3store.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-semibold"
                    >
                        EC3 Store
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default ShippingPolicy;
