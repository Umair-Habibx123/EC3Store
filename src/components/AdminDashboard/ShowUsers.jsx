import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Search, User, Mail, MapPin, Calendar, Shield, MoreVertical, Ban, CheckCircle, Loader2 } from "lucide-react";

function ShowUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [updatingUser, setUpdatingUser] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: "", type: "" });
    const [openDropdownId, setOpenDropdownId] = useState(null);

    // Fetch users with role = "user"
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("role", "==", "user"));
                const querySnapshot = await getDocs(q);

                const userList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    blocked: doc.data().blocked || false
                }));

                setUsers(userList);
            } catch (error) {
                console.error("Error fetching users: ", error);
                showNotification("Error fetching users", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
    };

    const handleBlockUser = async (userId, blockStatus) => {
        setUpdatingUser(userId);
        try {
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, { blocked: blockStatus });

            setUsers(users.map(user =>
                user.id === userId ? { ...user, blocked: blockStatus } : user
            ));

            showNotification(`User ${blockStatus ? 'blocked' : 'unblocked'} successfully`, "success");
        } catch (error) {
            console.error("Error updating user: ", error);
            showNotification("Error updating user status", "error");
        } finally {
            setUpdatingUser(null);
        }
    };

    const filteredUsers = users.filter(user =>
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="-mt-[70px] min-h-screen bg-gray-50/50">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                                <Shield className="h-5 w-5" />
                            </div>
                            <h1 className="text-xl font-semibold text-gray-900">User Management</h1>
                        </div>

                        <div className="relative w-full md:w-72">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-white/50 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
                        <p className="text-gray-600">Loading users...</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium text-gray-800">
                                {filteredUsers.length} {filteredUsers.length === 1 ? 'User' : 'Users'}
                            </h2>
                        </div>

                        {filteredUsers.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md ${user.blocked ? 'opacity-80' : ''}`}
                                    >
                                        <div className="p-5">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <img
                                                            src={user.profilePic || `https://ui-avatars.com/api/?name=${user.username || "U"}&background=random`}
                                                            alt={user.username || "User"}
                                                            className={`h-12 w-12 rounded-full object-cover ${user.blocked ? 'grayscale' : ''}`}
                                                        />
                                                        {user.blocked && (
                                                            <div className="absolute -bottom-1 -right-1 bg-red-500 text-white p-0.5 rounded-full">
                                                                <Ban className="h-3 w-3" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className={`font-medium ${user.blocked ? 'text-gray-500' : 'text-gray-900'}`}>
                                                            {user.username || "No Username"}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 truncate max-w-[160px]">{user.email}</p>
                                                    </div>
                                                </div>

                                                <div className="relative">
                                                    <button
                                                        className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setOpenDropdownId(openDropdownId === user.id ? null : user.id);
                                                        }}
                                                    >
                                                        <MoreVertical className="h-5 w-5" />
                                                    </button>

                                                    {openDropdownId === user.id && (
                                                        <div className="absolute right-0 z-10 mt-1 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5 overflow-hidden">
                                                            {user.blocked ? (
                                                                <button
                                                                    onClick={() => handleBlockUser(user.id, false)}
                                                                    disabled={updatingUser === user.id}
                                                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 gap-2"
                                                                >
                                                                    {updatingUser === user.id ? (
                                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                                    ) : (
                                                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                                                    )}
                                                                    Unblock User
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleBlockUser(user.id, true);
                                                                        setOpenDropdownId(null);
                                                                    }}
                                                                    disabled={updatingUser === user.id}
                                                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 gap-2"
                                                                >
                                                                    {updatingUser === user.id ? (
                                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                                    ) : (
                                                                        <Ban className="h-4 w-4 text-red-500" />
                                                                    )}
                                                                    Block User
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-5 pt-4 border-t border-gray-100">
                                                <div className="space-y-3">
                                                    <div className="flex items-start gap-3">
                                                        <User className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                                        <div>
                                                            <p className="text-xs text-gray-500">User ID</p>
                                                            <p className={`text-sm font-mono ${user.blocked ? 'text-gray-400' : 'text-gray-700'}`}>
                                                                {user.id}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {user.address && (
                                                        <div className="flex items-start gap-3">
                                                            <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                                            <div>
                                                                <p className="text-xs text-gray-500">Address</p>
                                                                <p className={`text-sm ${user.blocked ? 'text-gray-400' : 'text-gray-700'}`}>
                                                                    {user.address}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {user.createdAt && (
                                                        <div className="flex items-start gap-3">
                                                            <Calendar className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                                            <div>
                                                                <p className="text-xs text-gray-500">Joined</p>
                                                                <p className={`text-sm ${user.blocked ? 'text-gray-400' : 'text-gray-700'}`}>
                                                                    {user.createdAt.toDate().toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-gray-200">
                                <Mail className="h-10 w-10 text-gray-400" />
                                <h3 className="mt-3 text-lg font-medium text-gray-900">
                                    No users found
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {searchTerm ? "Try a different search term" : "No users available"}
                                </p>
                            </div>
                        )}
                    </div>
                )
                }
            </main >

            {/* Notification */}
            {
                notification.show && (
                    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${notification.show ? 'animate-fade-in-up' : 'animate-fade-out-down'}`}>
                        <div className={`px-4 py-3 rounded-lg shadow-lg flex items-start gap-3 ${notification.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                            <div className={`mt-0.5 flex-shrink-0 ${notification.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                {notification.type === 'success' ? (
                                    <CheckCircle className="h-5 w-5" />
                                ) : (
                                    <Ban className="h-5 w-5" />
                                )}
                            </div>
                            <div>
                                <p className={`font-medium ${notification.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                                    {notification.type === 'success' ? 'Success' : 'Error'}
                                </p>
                                <p className={`text-sm ${notification.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                                    {notification.message}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}

export default ShowUsers;