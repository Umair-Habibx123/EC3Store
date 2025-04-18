import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { UserProvider } from "./context/UserContext"

import Navbar from './components/Navbar/Navbar'
import Hero from "./components/Hero/Hero"
import AllProductsPage from "./components/AllProductsPage/AllProductsPage"
import ProductDetail from "./components/ProductCard/productDetails"
import ProductsSection from "./components/ProductCard/ProductsSection"
import CartPage from './components/CartPage/cartpage';
import ContactUsForm from './components/ContactPage/contactus';
import CheckoutPage from './components/checkoutPage/checkout_page';
import SettingsPage from './components/Settings/setting';
import UserDetails from './components/Settings/UserDetails';
import AddAddressPage from './components/Settings/AddAddressPage';
import BuyNowPage from './components/BuyNow/BuyNowPage';
import MyOrdersPage from './components/MyOrders/myorders';
import OrderConfirmationPage from './components/OrderConfirmation/OrderConfirmationPage';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import ProtectedRoute from './context/ProtectedRoute';
import ShowUsers from './components/AdminDashboard/ShowUsers';
import Forbidden from './components/AdminDashboard/Forbidden';
import EditUsers from './components/AdminDashboard/EditUsers';
import ShowProducts from './components/AdminDashboard/ShowProducts';
import AddNewProduct from './components/AdminDashboard/AddProduct.jsx';
import ManageOrders from './components/AdminDashboard/ManageOrders';
import OrderDetailPage from './components/AdminDashboard/OrderDetailPage';
import ReturnsPolicy from './components/footer/return-refund-info';
import ShippingPolicy from './components/footer/shipping-info';
import AboutUs from './components/footer/aboutUs';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Footer from "./components/footer/footer"
import { MessageCircle } from 'lucide-react'
import Loading from './components/loadingIndicator/loading.jsx'
import "./App.css"
import OrderDetailsPage from './components/MyOrders/orderdetails.jsx'


function ScrollToTop() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoading(false), 500); 
    return () => clearTimeout(timer);
  }, [location]);

  return isLoading ? <Loading /> : null;
}

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <ScrollToTop />
          <div className="main-content">
            <Routes>
              {/* Home Page */}
              <Route path="/" element={
                <>
                  <Hero />
                  <ProductsSection />
                </>
              } />

              {/* All Products Page */}
              <Route path="/all-products" element={<AllProductsPage />} />

              {/* Product Detail Page */}
              <Route path="/product/:id" element={<ProductDetail />} />

              {/* Cart Page */}
              <Route path="/my-cart" element={<CartPage />} />

              {/* Contact Us Page */}
              <Route path="/contact-us" element={<ContactUsForm />} />

              {/* Checkout Page */}
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* Settings Page */}
              <Route path="/setting" element={<SettingsPage />} />

              <Route path="/return-policy" element={<ReturnsPolicy />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />

              <Route path="/about-us" element={<AboutUs />} />

              {/* User Profile Page */}
              <Route path="/viewProfile" element={<UserDetails />} />

              {/* Add Address Page */}
              <Route path="/add-address" element={<AddAddressPage />} />

              {/* Buy Now Page */}
              <Route path="/BuyNow" element={<BuyNowPage />} />

              {/* My Orders Page */}
              <Route path="/MyOrders" element={<MyOrdersPage />} />
              <Route path="/OrderDetails/:orderId" element={<OrderDetailsPage />} />


              {/* Order Confirmation Page */}
              <Route path="/order-confirmation" element={
                <OrderConfirmationPage />
              } />


              {/* Admin Dashboard and Related Routes */}
              <Route path="/admin-dashboard/*" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              <Route path="/admin-dashboard/showUsers" element={
                <ProtectedRoute requiredRole="admin">
                  <ShowUsers />
                </ProtectedRoute>
              } />

              <Route path="/admin-dashboard/showProducts" element={
                <ProtectedRoute requiredRole="admin">
                  <ShowProducts />
                </ProtectedRoute>
              } />

              <Route
                path="/admin-dashboard/manageOrders"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <ManageOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-dashboard/orders/:orderId"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <OrderDetailPage />
                  </ProtectedRoute>
                }
              />

              <Route path="/admin-dashboard/editUsers" element={
                <ProtectedRoute requiredRole="admin">
                  <EditUsers />
                </ProtectedRoute>
              } />

              <Route path="/admin-dashboard/addNewProducts" element={
                <ProtectedRoute requiredRole="admin">
                  <AddNewProduct />
                </ProtectedRoute>
              } />

              {/* Catch-all for Forbidden access */}
              <Route path="/forbidden" element={<Forbidden />} />
              {/* Catch-all for non-matching routes */}
              <Route path="*" element={<PageNotFound />} />

            </Routes>
          </div>
          <Footer />

          {/* WhatsApp Floating Button */}
          <div className="fixed bottom-6 right-6 z-[1000]">
            <a
              href="https://wa.me/+923108026280"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-7 h-7 fill-current" />
            </a>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;