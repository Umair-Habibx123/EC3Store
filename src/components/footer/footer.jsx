import React from "react";
import { Link } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  Clock, 
  ShoppingBag, 
  Star, 
  Users, 
  Info, 
  FileText, 
  Truck,
  Facebook,
  Instagram,
  CreditCard
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-6 md:px-12">
        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Section */}
          <div className="space-y-6">
            <h2 className="font-bold text-xl text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400">Contact Us</span>
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 text-blue-400 flex-shrink-0" />
                <a
                  href="https://wa.me/+923108026280"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  WhatsApp: <span className="text-blue-400 hover:underline">+92-324-0161704</span>
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 text-blue-400 flex-shrink-0" />
                <Link
                  to="/contact-us"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Email: <span className="text-blue-400 hover:underline">umairhabibabc@gmail.com</span>
                </Link>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-0.5 text-blue-400 flex-shrink-0" />
                <span>Business hours: 24/7</span>
              </div>
            </div>
          </div>

          {/* Shop Section */}
          <div className="space-y-6">
            <h2 className="font-bold text-xl text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400">SHOP</span>
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                10.10 SALE
              </li>
              <li className="flex items-center gap-3 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                Bags
              </li>
              <li className="flex items-center gap-3 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                <Link to="/reviews" className="flex items-center gap-2">
                  <Star className="w-4 h-4" /> Customer Reviews
                </Link>
              </li>
              <li className="flex items-center gap-3 hover:text-blue-400 transition-colors duration-300 cursor-pointer">
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                For Bulk Purchase
              </li>
              <li className="flex items-center gap-3 hover:text-blue-400 transition-colors duration-300">
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                <Link to="/contact-us" className="flex items-center gap-2">
                  <Users className="w-4 h-4" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Information Section */}
          <div className="space-y-6">
            <h2 className="font-bold text-xl text-white flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400">INFORMATION</span>
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 hover:text-blue-400 transition-colors duration-300">
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                <Link to="/reviews" className="flex items-center gap-2">
                  <Star className="w-4 h-4" /> Customer Reviews
                </Link>
              </li>
              <li className="flex items-center gap-3 hover:text-blue-400 transition-colors duration-300">
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                <Link to="/contact-us" className="flex items-center gap-2">
                  <Users className="w-4 h-4" /> Contact Us
                </Link>
              </li>
              <li className="flex items-center gap-3 hover:text-blue-400 transition-colors duration-300">
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                <Link to="/return-policy" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Return & Refund Policy
                </Link>
              </li>
              <li className="flex items-center gap-3 hover:text-blue-400 transition-colors duration-300">
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                <Link to="/about-us" className="flex items-center gap-2">
                  <Info className="w-4 h-4" /> About Us
                </Link>
              </li>
              <li className="flex items-center gap-3 hover:text-blue-400 transition-colors duration-300">
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                <Link to="/shipping-policy" className="flex items-center gap-2">
                  <Truck className="w-4 h-4" /> Shipping Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright Text */}
          <p className="text-sm text-gray-500 text-center md:text-left">
            © 2024, EC3-Store® Powered by EC3-Store · <Link to="/refund-policy" className="hover:text-blue-400">Refund Policy</Link> · <Link to="/privacy-policy" className="hover:text-blue-400">Privacy Policy</Link> · <Link to="/terms" className="hover:text-blue-400">Terms of Service</Link> · <Link to="/contact" className="hover:text-blue-400">Contact Information</Link>
          </p>

          {/* Social and Payment */}
          <div className="flex flex-col items-center md:flex-row gap-6">
            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300 p-2 rounded-full hover:bg-gray-800"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com"
                className="text-gray-400 hover:text-pink-500 transition-colors duration-300 p-2 rounded-full hover:bg-gray-800"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            
            {/* Payment Icons */}
            <div className="flex gap-4 items-center">
              <span className="text-xs text-gray-500 hidden md:block">We accept:</span>
              <div className="flex gap-3">
                <CreditCard className="w-6 h-6 text-gray-400 hover:text-blue-500 transition-colors duration-300" />
                <CreditCard className="w-6 h-6 text-gray-400 hover:text-orange-500 transition-colors duration-300" />
                <CreditCard className="w-6 h-6 text-gray-400 hover:text-red-500 transition-colors duration-300" />
                <CreditCard className="w-6 h-6 text-gray-400 hover:text-blue-700 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;