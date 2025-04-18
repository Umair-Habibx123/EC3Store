import React, { useState, useEffect } from 'react';
import image1 from '../../assets/images/banner1.jpg';
import image2 from '../../assets/images/banner2.jpg';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Circle, ShoppingBag, ArrowRight } from 'lucide-react';

const Hero = () => {
  const images = [image1, image2];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-screen -mt-16 overflow-hidden">
      {/* Background Slider */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 h-screen relative"
          >
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover transition-all duration-1000"
              style={{
                transform: currentIndex === index ? 'scale(1.05)' : 'scale(1)',
                filter: 'brightness(0.8)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition-all duration-300 group shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition-all duration-300 group shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Hero Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[40%] text-center text-white px-6 w-full max-w-6xl">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4">
            <ShoppingBag className="w-5 h-5" />
            <span className="text-sm font-medium">Premium Collection</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight leading-tight">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-500">Exclusive</span> Products
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl mb-6 leading-relaxed max-w-3xl mx-auto opacity-90">
            Explore our premium collection of fashion, electronics, home goods and more. 
            Curated for quality and style to elevate your everyday life.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/all-products">
              <button className="bg-gradient-to-r from-amber-500 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105 hover:brightness-110 flex items-center gap-2 group">
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-4 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all hover:scale-105 hover:bg-white/20 flex items-center gap-2 group">
              Explore More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="p-1.5 focus:outline-none group"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-gradient-to-r from-amber-400 to-pink-500 scale-125 shadow-sm' : 'bg-white/50 group-hover:bg-white/70'}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Hero;