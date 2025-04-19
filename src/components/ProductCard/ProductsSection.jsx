// src/components/ProductsSection.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import LoadingSpinner from "../../utils/LoadingSpinner";

const ProductsSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const productsSnapshot = await getDocs(collection(db, "products"));
        const productsList = productsSnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((product) => product.isDeleted !== true); // filter out deleted


        // Sort products descending based on the document ID in descending order (e.g., product10, product9, ..., product1)
        const sortedProducts = productsList.sort((a, b) => {
          const idA = a.id.replace(/[^0-9]/g, '');
          const idB = b.id.replace(/[^0-9]/g, '');
          return parseInt(idB) - parseInt(idA);
        });

        setProducts(sortedProducts);
      }

      catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  // Slice to only show the first 10 products
  const firstFiveProducts = products.slice(0, 10);

  if (!products) {
    <LoadingSpinner size="xl" />
  }

  return (
    <section className="py-12 px-6 bg-gray-100 w-full">
      <div className="container mx-auto max-w-screen-xl">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 tracking-wide">
          Our Products
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate__animated animate__fadeInUp">
          {firstFiveProducts.map((product) => (
            <div
              key={product.id}
              className="group relative transition-transform transform hover:scale-105 duration-300"
            >
              {/* <div className="w-full h-64 sm:h-64 lg:h-auto aspect-w-1 aspect-h-1"> */}
              <ProductCard product={product} />
              {/* </div> */}
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/all-products">
            <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300">
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
