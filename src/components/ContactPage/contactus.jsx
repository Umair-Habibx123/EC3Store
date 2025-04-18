import React, { useState } from 'react';
import { Mail, MessageSquare, AlertCircle, ChevronDown, CheckCircle, X } from 'lucide-react';

const ContactUsForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        problem: '',
        message: ''
    });

    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formAction = 'https://formspree.io/f/xbljkbnn';

        fetch(formAction, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then((response) => {
                if (response.ok) {
                    setShowModal(true);
                } else {
                    alert('There was an error sending your message.');
                }
            })
            .catch((error) => {
                alert(`There was an error sending your message: ${error}`);
            });
            
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                {/* Header with gradient background */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-center">
                    <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
                        <MessageSquare className="w-8 h-8" />
                        Contact Us
                    </h2>
                    <p className="mt-2 text-blue-100">We'd love to hear from you!</p>
                </div>

                {/* Form Start */}
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            Your Email
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="mt-1 p-3 w-full border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 pl-10"
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    {/* Problem Field */}
                    <div className="space-y-2">
                        <label htmlFor="problem" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            What can we help you with?
                        </label>
                        <div className="relative">
                            <select
                                id="problem"
                                name="problem"
                                required
                                className="mt-1 p-3 w-full border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none pl-10 pr-8"
                                value={formData.problem}
                                onChange={handleChange}
                            >
                                <option value="" disabled selected>Select an option</option>
                                <option value="Orders Issue">Technical Issue</option>
                                <option value="Account Issue">Account Issue</option>
                                <option value="General Inquiry">General Inquiry</option>
                            </select>
                            <AlertCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                        </div>
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            Your Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows="6"
                            className="resize-none mt-1 p-3 w-full border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="How can we help you?"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                        >
                            Send Message
                            <MessageSquare className="w-5 h-5" />
                        </button>
                    </div>
                </form>

                {/* Success Modal */}
                {showModal && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 backdrop-blur-sm transition-all duration-300">
                        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 relative transform transition-all duration-300 animate-in fade-in-90 zoom-in-90">
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                            >
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                            <div className="text-center">
                                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                                    <CheckCircle className="h-10 w-10 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                <p className="text-gray-600 mb-6">
                                    Thank you for contacting us. We'll get back to you as soon as possible.
                                </p>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ContactUsForm;