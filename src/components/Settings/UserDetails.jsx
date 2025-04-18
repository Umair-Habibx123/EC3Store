import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { Edit, Save, X, User, Mail, Shield, MapPin, Calendar } from "lucide-react";

const UserDetails = () => {
    const [userEmail, setUserEmail] = useState(null);
    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    // Get user email from Firebase Authentication
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.uid);
            } else {
                console.error("No user is signed in");
            }
        });

        return () => unsubscribe();
    }, []);

    // Fetch user details from Firestore
    useEffect(() => {
        if (!userEmail) return;

        const fetchUserData = async () => {
            try {
                const docRef = doc(db, "users", userEmail);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUserData(data);
                    setUsername(data.username);
                } else {
                    console.error("No such document!");
                }
            } catch (error) {
                console.error("Error fetching user data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userEmail]);

    // Update username in Firestore
    const handleUsernameUpdate = async () => {
        if (!username.trim()) {
            alert("Username cannot be empty");
            return;
        }

        try {
            const docRef = doc(db, "users", userEmail);
            await updateDoc(docRef, { username });
            alert("Username updated successfully");
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating username: ", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!userData) return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center border border-gray-100">
                <p className="text-gray-700">User not found</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 sm:p-8 text-white relative">
                        <div className="absolute top-4 right-4">
                            {userData.role === "admin" && (
                                <span className="inline-flex items-center gap-1.5 bg-indigo-800/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-indigo-400/30">
                                    <Shield className="h-3.5 w-3.5" />
                                    Admin
                                </span>
                            )}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
                                <img
                                    src={userData.profilePic || "https://avatars.githubusercontent.com/u/88102392?v=4"}
                                    alt="Profile"
                                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white/30 shadow-lg object-cover"
                                />
                            </div>
                            <div className="text-center sm:text-left space-y-2">
                                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{userData.username}</h1>
                                <div className="flex items-center justify-center sm:justify-start gap-2 text-white/90">
                                    <Mail className="h-4 w-4" />
                                    <span className="text-sm sm:text-base">{userData.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* User Details */}
                    <div className="p-6 sm:p-8">
                        <div className="space-y-8">
                            {/* Username Section */}
                            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                                        <div className="bg-indigo-100 p-2 rounded-lg">
                                            <User className="h-5 w-5 text-indigo-600" />
                                        </div>
                                        <span>Profile Information</span>
                                    </h2>
                                    {!isEditing && (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg"
                                        >
                                            <Edit className="h-4 w-4" />
                                            Edit
                                        </button>
                                    )}
                                </div>

                                {isEditing ? (
                                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                            <input
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                placeholder="Enter new username"
                                            />
                                        </div>
                                        <div className="flex items-end gap-2">
                                            <button
                                                onClick={handleUsernameUpdate}
                                                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                                            >
                                                <Save className="h-4 w-4" />
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1"
                                            >
                                                <X className="h-4 w-4" />
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div className="space-y-1">
                                            <span className="text-sm font-medium text-gray-500">Username</span>
                                            <p className="text-gray-800 font-medium">{username}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Account Information Section */}
                            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                                <h2 className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-4">
                                    <div className="bg-purple-100 p-2 rounded-lg">
                                        <Shield className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <span>Account Details</span>
                                </h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                    <div className="space-y-1">
                                        <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
                                            <Shield className="h-4 w-4" />
                                            Role
                                        </span>
                                        <p className="text-gray-800 font-medium capitalize">{userData.role || "user"}</p>
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            Member Since
                                        </span>
                                        <p className="text-gray-800 font-medium">
                                            {userData.createdAt?.toDate().toLocaleDateString() || "N/A"}
                                        </p>
                                    </div>
                                    
                                    {userData.address && (
                                        <div className="space-y-1">
                                            <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />
                                                Address
                                            </span>
                                            <p className="text-gray-800 font-medium">{userData.address}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;