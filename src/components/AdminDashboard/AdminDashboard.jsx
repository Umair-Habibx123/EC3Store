import React from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  ShoppingBag, 
  PlusCircle, 
  UserCog, 
  PackageCheck,
  LayoutDashboard
} from "lucide-react";

function AdminDashboard() {
  return (
    <div className="-mt-[70px] min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <LayoutDashboard className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Management Tools</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Show Users */}
          <Link to="/admin-dashboard/showUsers">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-indigo-100 overflow-hidden group">
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">User Management</h3>
                    <p className="text-sm text-gray-500">View all registered users</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Show/Edit Products */}
          <Link to="/admin-dashboard/showProducts">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-indigo-100 overflow-hidden group">
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">Product Catalog</h3>
                    <p className="text-sm text-gray-500">View/Update products</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Add New Products */}
          <Link to="/admin-dashboard/addNewProducts">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-indigo-100 overflow-hidden group">
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                    <PlusCircle className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">Add Products</h3>
                    <p className="text-sm text-gray-500">Add new items to shop</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Edit Users */}
          <Link to="/admin-dashboard/editUsers">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-indigo-100 overflow-hidden group">
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-100 transition-colors">
                    <UserCog className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">Role Management</h3>
                    <p className="text-sm text-gray-500">Modify user roles</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Manage Orders */}
          <Link to="/admin-dashboard/manageOrders">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-indigo-100 overflow-hidden group">
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-100 transition-colors">
                    <PackageCheck className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">Order Management</h3>
                    <p className="text-sm text-gray-500">Track order status</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;