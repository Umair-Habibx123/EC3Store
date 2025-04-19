// components/Forbidden.js
import React from "react";

const Forbidden = () => {
    return (
        <div className="-mt-[70px] h-screen bg-gray-50 text-green-400 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
            {/* Terminal-style Container */}
            <div className="max-w-3xl w-full text-center border border-green-500 p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl bg-gray-900">
                {/* Error Title */}
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-wide mb-4 animate-pulse text-yellow-500">
                    403<span className="text-red-500">_</span>
                </h1>

                {/* Funny Hacker Text */}
                <p className="text-base sm:text-lg md:text-2xl font-mono mb-6 text-white">
                    {"// Access Denied: You don't have enough clearance to hack into this page."}
                </p>

                {/* ASCII Art */}
                <pre className="whitespace-pre-wrap text-sm sm:text-base md:text-lg leading-tight mb-6 text-green-300">
                    {`
   (\\__/)
   (•ㅅ•)     ~ ERROR: YOU SHALL NOT PASS! ~
   /   つ   
`}
                </pre>

                {/* Suggestion */}
                <p className="text-sm sm:text-base md:text-lg font-mono text-yellow-300">
                    {"Hint: Try the right access route or contact your "}
                    <span className="text-red-500">sysadmin</span>
                    {" to break through this wall!"}
                </p>

                {/* Informative Message */}
                <div className="mt-6">
                    <p className="text-sm sm:text-base md:text-lg text-gray-400">
                        {"It seems you've taken the wrong path. Double-check your permissions or try to access "}
                        <span className="text-blue-500">correct route</span>{" "}
                        {"for the right access!"}
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="text-red-600 text-sm sm:text-base mt-6 font-mono bg-red-100 p-3 rounded-lg shadow-md w-full max-w-lg mx-auto">
                <p className="font-semibold">System Log: Unauthorized access attempt detected 🚨</p>
            </div>
        </div>
    );
};

export default Forbidden;
