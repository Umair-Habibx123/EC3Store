import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { MapPin, Edit3, PlusCircle, Save } from "lucide-react";

const AddAddressPage = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState(null);
  const [isAddressLoading, setIsAddressLoading] = useState(true);
  const [isAddressFormVisible, setIsAddressFormVisible] = useState(false);
  const [newAddress, setNewAddress] = useState({
    country: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        (async () => {
          try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const data = docSnap.data();
              setAddress(data.address || null);
            } else {
              setAddress(null);
            }
          } catch (error) {
            console.error("Error fetching address:", error);
            setAddress(null);
          } finally {
            setIsAddressLoading(false);
          }
        })();
      } else {
        console.error("No user logged in");
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleChangeAddress = () => {
    setIsAddressFormVisible(true);
    setNewAddress({
      country: address?.country || '',
      firstName: address?.firstName || '',
      lastName: address?.lastName || '',
      address: address?.address || '',
      apartment: address?.apartment || '',
      city: address?.city || '',
      postalCode: address?.postalCode || '',
      phone: address?.phone || ''
    });
  };

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveAddress = async () => {
    const {
      country,
      firstName,
      lastName,
      address,
      apartment,
      city,
      postalCode,
      phone,
    } = newAddress;

    if (
      !country ||
      !firstName.trim() ||
      !lastName.trim() ||
      !address.trim() ||
      !apartment.trim() ||
      !city.trim() ||
      !postalCode.trim() ||
      !phone.trim()
    ) {
      alert("Please fill out all fields, including the country dropdown.");
      return;
    }

    try {
      const auth = getAuth();
      const userEmail = auth.currentUser.email;
      const userRef = doc(db, "users", userEmail);

      const formattedAddress = `${firstName} ${lastName}, ${address}, ${apartment}, ${city}, ${country}, ${postalCode}, Phone: ${phone}`;
      await setDoc(userRef, { address: formattedAddress }, { merge: true });

      setAddress(formattedAddress);
      setIsAddressFormVisible(false);
      alert("Address saved successfully!");
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address.");
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10 space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="text-blue-600" size={28} />
          <h2 className="text-3xl font-bold text-gray-800">Manage Shipping Address</h2>
        </div>

        {/* Shipping Address Display */}
        <div className="border border-gray-200 rounded-xl bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Shipping Address</h3>
          {isAddressLoading ? (
            <p className="text-sm text-gray-600">Loading address...</p>
          ) : address ? (
            <div>
              <p className="text-gray-800 text-sm whitespace-pre-line">{address}</p>
              <button
                onClick={handleChangeAddress}
                className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                <Edit3 size={16} /> Change Address
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAddressFormVisible(true)}
              className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
            >
              <PlusCircle size={16} /> Add New Address
            </button>
          )}
        </div>

        {/* Address Form */}
        {isAddressFormVisible && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Enter New Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Country/Region*</label>
                <select
                  name="country"
                  value={newAddress.country}
                  onChange={handleAddressInputChange}
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Country</option>
                  <option value="PAKISTAN">Pakistan</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  value={newAddress.firstName}
                  onChange={handleAddressInputChange}
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Last Name*</label>
                <input
                  type="text"
                  name="lastName"
                  value={newAddress.lastName}
                  onChange={handleAddressInputChange}
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Address*</label>
                <input
                  type="text"
                  name="address"
                  value={newAddress.address}
                  onChange={handleAddressInputChange}
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Apartment*</label>
                <input
                  type="text"
                  name="apartment"
                  value={newAddress.apartment}
                  onChange={handleAddressInputChange}
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">City*</label>
                <input
                  type="text"
                  name="city"
                  value={newAddress.city}
                  onChange={handleAddressInputChange}
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Postal Code*</label>
                <input
                  type="text"
                  name="postalCode"
                  value={newAddress.postalCode}
                  onChange={handleAddressInputChange}
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Phone Number*</label>
                <input
                  type="text"
                  name="phone"
                  value={newAddress.phone}
                  onChange={handleAddressInputChange}
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              onClick={handleSaveAddress}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl flex items-center justify-center gap-2 text-base font-medium"
            >
              <Save size={18} /> Save Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAddressPage;
