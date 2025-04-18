// components/PageNotFound.js
import React from 'react';

const PageNotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="text-center bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                <h1 className="text-7xl font-bold text-gray-800 mb-4 animate-bounce">🚀 404</h1>
                <p className="text-xl text-gray-600 mb-6">
                    Whoa! Looks like you’re <span className="font-semibold text-blue-600">lost in space</span>!
                </p>
                <p className="text-md text-gray-500 mb-6">
                    We couldn’t find the page you were looking for. Maybe it’s off exploring other galaxies? 🌌
                </p>
                <a
                    href="/"
                    className="inline-block bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition duration-300 ease-in-out shadow-xl"
                >
                    Take me Home 🏠
                </a>
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-700">Still lost?</h2>
                    <p className="text-gray-500 mt-2">
                        Don’t worry, our support team is just a message away! We're happy to help you find your way. 😊
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;
