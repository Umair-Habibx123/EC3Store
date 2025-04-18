import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import {
  Menu,
  X,
  ShoppingBag,
  Home,
  ShoppingCart,
  Contact,
  User,
  LogOut,
  Settings,
  Package
} from "lucide-react";
import image1 from '../../assets/images/logo.png';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const hiddenRoutes = [
    '/forbidden',
    '/admin-dashboard',
    '/admin-dashboard/*'
  ];
  const shouldHideNavbar = hiddenRoutes.some(route => {
    if (route === location.pathname) return true;
    if (route.endsWith('/*') && location.pathname.startsWith(route.slice(0, -2))) return true;
    return false;
  });


  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState("/default-profile.png");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [isHidden, setIsHidden] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [showBlockedModal, setShowBlockedModal] = useState(false);


  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const dropdownRef = useRef(null);

  const isActive = (path) => {
    return location.pathname === path;
  };



  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsOpen(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !navRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      setIsHidden(!isScrollingUp && currentScrollPos > 50);
      setPrevScrollPos(currentScrollPos);
      setIsDropdownOpen(false);
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDropdownOpen, prevScrollPos]);

  const closeMenu = () => setIsOpen(false);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        if (userData.blocked) {
          setShowBlockedModal(true);
          await auth.signOut();
          return;
        }

        setUserRole(userData.role || "user");
        setProfilePic(userData.profilePic || "/default-profile.png");
        window.location.reload();
      } else {
        await setDoc(userDocRef, {
          email: user.email,
          username: user.displayName,
          profilePic: user.photoURL || "/default-profile.png",
          role: "user",
          address: "",
          createdAt: serverTimestamp(),
          blocked: false
        });
        setProfilePic(user.photoURL || "/default-profile.png");
        setUserRole("user");
        window.location.reload();
      }

      setUser(user);
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();

          // Check if user is blocked
          if (userData.blocked) {
            setShowBlockedModal(true);
            await auth.signOut();
            return;
          }

          setProfilePic(userData.profilePic || "/default-profile.png");
          setUserRole(userData.role || "user");
        }
        setUser(currentUser);
      } else {
        setUser(null);
        setUserRole("user");
      }
    });
    return unsubscribe;
  }, [auth]);

  if (shouldHideNavbar) {
    return null;
  }

  return (
    <nav
      ref={navRef}
      className={`navbar fixed top-0 left-0 w-full bg-white shadow-sm z-50 transition-all duration-300 ease-in-out ${isHidden ? "-translate-y-full" : "translate-y-0"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <img
                src={image1}
                alt="EC3 Store Logo"
                className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-xl font-bold hidden sm:block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                EC3 Store
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive("/")
                ? "text-indigo-600 bg-indigo-50"
                : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                }`}
            >
              <Home className="w-5 h-5 mr-2" />
              Home
            </Link>
            <Link
              to="/all-products"
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive("/all-products")
                ? "text-indigo-600 bg-indigo-50"
                : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                }`} >
              <Package className="w-5 h-5 mr-2" />
              Products
            </Link>
            <Link
              to="/my-cart"
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive("/my-cart")
                ? "text-indigo-600 bg-indigo-50"
                : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                }`}  >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Cart
            </Link>
            <Link
              to="/contact-us"
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive("/contact-us")
                ? "text-indigo-600 bg-indigo-50"
                : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                }`} >
              <Contact className="w-5 h-5 mr-2" />
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="focus:outline-none"
                >
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-8 h-8 rounded-full cursor-pointer ring-2 ring-indigo-100 hover:ring-indigo-400 transition-all"
                  />
                </button>
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Profile */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="relative ml-2" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none group"
                >
                  <div className="relative">
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="w-9 h-9 rounded-full ring-2 ring-indigo-100 group-hover:ring-indigo-400 transition-all"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
                  </div>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-1 z-50 border border-gray-100 overflow-hidden">
                    <Link
                      to="/setting"
                      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive("/settings")
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                        }`} onClick={() => setIsDropdownOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      View Profile
                    </Link>
                    <Link
                      to="/MyOrders"
                      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive("/MyOrders")
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                        }`} onClick={() => setIsDropdownOpen(false)}
                    >
                      <ShoppingBag className="w-4 h-4 mr-3" />
                      My Orders
                    </Link>
                    {userRole === "admin" && (
                      <Link
                        to="/admin-dashboard"
                        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive("/admin-dashboard")
                          ? "text-indigo-600 bg-indigo-50"
                          : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                          }`} onClick={() => setIsDropdownOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Admin Dashboard
                      </Link>
                    )}
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={() => {
                        auth.signOut();
                        setUser(null);
                        setIsDropdownOpen(false);
                        navigate("/");
                      }}
                      className="w-full text-left flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="ml-4 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md flex items-center"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden bg-white shadow-lg`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 border-t border-gray-100">
          <Link
            to="/"
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive("/")
              ? "text-indigo-600 bg-indigo-50"
              : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
              }`} onClick={closeMenu}
          >
            <Home className="w-5 h-5 mr-3" />
            Home
          </Link>
          <Link
            to="/all-products"
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive("/all-products")
              ? "text-indigo-600 bg-indigo-50"
              : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
              }`} onClick={closeMenu}
          >
            <Package className="w-5 h-5 mr-3" />
            Products
          </Link>
          <Link
            to="/my-cart"
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive("/my-cart")
              ? "text-indigo-600 bg-indigo-50"
              : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
              }`} onClick={closeMenu}
          >
            <ShoppingCart className="w-5 h-5 mr-3" />
            Cart
          </Link>
          <Link
            to="/contact-us"
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive("/contact-us")
              ? "text-indigo-600 bg-indigo-50"
              : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
              }`} onClick={closeMenu}
          >
            <Contact className="w-5 h-5 mr-3" />
            Contact
          </Link>

          {!user && (
            <button
              onClick={() => {
                handleSignIn();
                closeMenu();
              }}
              className="flex items-center justify-center w-full px-4 py-3 rounded-lg text-base font-medium text-white bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 transition-all mt-2"
            >
              <User className="w-5 h-5 mr-2" />
              Sign In
            </button>
          )}
        </div>

        {user && isDropdownOpen && (
          <div className="px-4 pt-2 pb-4 space-y-2 bg-gray-50 border-t border-gray-100">
            <Link
              to="/setting"
              className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              onClick={() => {
                closeMenu();
                setIsDropdownOpen(false);
              }}
            >
              <Settings className="w-5 h-5 mr-3" />
              View Profile
            </Link>
            <Link
              to="/MyOrders"
              className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              onClick={() => {
                closeMenu();
                setIsDropdownOpen(false);
              }}
            >
              <ShoppingBag className="w-5 h-5 mr-3" />
              My Orders
            </Link>
            {userRole === "admin" && (
              <Link
                to="/admin-dashboard"
                className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                onClick={() => {
                  closeMenu();
                  setIsDropdownOpen(false);
                }}
              >
                <Settings className="w-5 h-5 mr-3" />
                Admin Dashboard
              </Link>
            )}
            <button
              onClick={() => {
                auth.signOut();
                setUser(null);
                setIsDropdownOpen(false);
                navigate("/");
                closeMenu();
              }}
              className="flex items-center w-full px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        )}
      </div>
      {/* Blocked User Modal */}
      {showBlockedModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto overflow-hidden">
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Account Blocked
              </h3>
              <p className="text-gray-600 mb-6">
                Your account has been blocked by the administrator. Please contact support for assistance.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowBlockedModal(false)}
                  className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;