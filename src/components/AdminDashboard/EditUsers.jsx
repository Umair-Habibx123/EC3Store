import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import {
    Loader2,
    User,
    Mail,
    Shield,
    ShieldCheck,
    CheckCircle2,
    AlertCircle,
    ChevronDown,
    Search,
    X
} from "lucide-react";

function EditUsers() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updateMessage, setUpdateMessage] = useState("");
    const [updateError, setUpdateError] = useState("");
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    const auth = getAuth();
    const currentUserEmail = auth.currentUser?.email;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("role", "in", ["user", "admin"]));
                const querySnapshot = await getDocs(q);

                const userList = [];
                querySnapshot.forEach((doc) => {
                    if (doc.id !== currentUserEmail) {
                        userList.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    }
                });

                setUsers(userList);
                setFilteredUsers(userList);
            } catch (error) {
                console.error("Error fetching users: ", error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUserEmail) {
            fetchUsers();
        }
    }, [currentUserEmail]);

    useEffect(() => {
        // Apply filters whenever users, searchTerm, or roleFilter changes
        let result = [...users];
        
        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(user => 
                user.id.toLowerCase().includes(term) || 
                (user.username && user.username.toLowerCase().includes(term))
            )
        }
        
        // Apply role filter
        if (roleFilter !== "all") {
            result = result.filter(user => user.role === roleFilter);
        }
        
        setFilteredUsers(result);
    }, [users, searchTerm, roleFilter]);

    const handleRoleChange = async (email, newRole) => {
        setLoadingUpdate(true);

        try {
            const userDocRef = doc(db, "users", email);
            await updateDoc(userDocRef, { role: newRole });

            console.log(`User role updated: ${email} -> ${newRole}`);

            setUpdateMessage(`User role updated successfully.`);
            setUpdateError("");

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === email ? { ...user, role: newRole } : user
                )
            );
        } catch (error) {
            console.error("Error updating user role:", error);
            setUpdateError("Failed to update user role. Please try again.");
            setUpdateMessage("");
        } finally {
            setLoadingUpdate(false);
        }
    };

    const clearFilters = () => {
        setSearchTerm("");
        setRoleFilter("all");
    };

    return (
        <div className="-mt-[70px] min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 shadow-sm">
                                <Shield className="h-5 w-5" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                                    User Management
                                </h1>
                                <p className="mt-2 text-gray-600">Manage user roles and permissions</p>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filter Controls */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-white text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                placeholder="Search by email or username..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                </button>
                            )}
                        </div>

                        {/* Role Filter */}
                        <div className="relative">
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="appearance-none block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                            >
                                <option value="all">All Roles</option>
                                <option value="admin">Administrators</option>
                                <option value="user">Standard Users</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>

                        {/* Clear Filters Button */}
                        {(searchTerm || roleFilter !== "all") && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <X className="w-4 h-4 mr-2" />
                                Clear Filters
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                    <p className="mt-4 text-gray-600 text-lg">Loading users...</p>
                </div>
            ) : (
                // User List
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-6 flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {filteredUsers.length} {filteredUsers.length === 1 ? 'User' : 'Users'} Found
                        </h2>
                        {(searchTerm || roleFilter !== "all") && (
                            <p className="text-sm text-gray-500">
                                Filtered from {users.length} total users
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
                                >
                                    <div className="p-6">
                                        <div className="flex flex-col items-center">
                                            <div className="relative mb-4">
                                                <img
                                                    src={user.profilePic || "https://avatar.vercel.sh/" + user.id}
                                                    alt={user.username || "User"}
                                                    className="w-20 h-20 rounded-full object-cover border-4 border-indigo-100"
                                                    onError={(e) => {
                                                        e.target.src = "https://avatar.vercel.sh/" + user.id;
                                                    }}
                                                />
                                                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${user.role === 'admin' ? 'bg-purple-500' : 'bg-indigo-500'
                                                    }`}>
                                                    {user.role === 'admin' ? (
                                                        <Shield className="w-3 h-3 text-white" />
                                                    ) : (
                                                        <User className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                            </div>

                                            <h3 className="text-lg font-semibold text-gray-900 text-center">
                                                {user.username || "No Username"}
                                            </h3>

                                            <div className="flex items-center mt-1 text-gray-500 text-sm">
                                                <Mail className="w-4 h-4 mr-1" />
                                                <span className="truncate max-w-[180px]">{user.id}</span>
                                            </div>
                                        </div>

                                        {/* Role Dropdown */}
                                        <div className="mt-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                User Role
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={user.role}
                                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                    className="appearance-none block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                                                >
                                                    <option value="user">Standard User</option>
                                                    <option value="admin">Administrator</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-12 flex flex-col items-center justify-center bg-white rounded-xl shadow-sm">
                                <User className="w-12 h-12 text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">No users found</h3>
                                <p className="mt-1 text-gray-500">
                                    {searchTerm || roleFilter !== "all" 
                                        ? "Try adjusting your search or filters"
                                        : "All users are currently administrators"}
                                </p>
                                {(searchTerm || roleFilter !== "all") && (
                                    <button
                                        onClick={clearFilters}
                                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </main>
            )}

            {/* Loading Indicator for Role Update */}
            {loadingUpdate && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl flex items-center">
                        <Loader2 className="w-6 h-6 text-indigo-600 animate-spin mr-3" />
                        <span className="text-gray-800">Updating user role...</span>
                    </div>
                </div>
            )}

            {/* Display Messages */}
            {updateMessage && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-50 border border-green-200 text-green-800 px-6 py-3 rounded-xl shadow-lg flex items-center animate-fade-in-up">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    {updateMessage}
                </div>
            )}

            {updateError && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-red-50 border border-red-200 text-red-800 px-6 py-3 rounded-xl shadow-lg flex items-center animate-fade-in-up">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    {updateError}
                </div>
            )}
        </div>
    );
}

export default EditUsers;