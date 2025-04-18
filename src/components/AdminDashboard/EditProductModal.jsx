import React, { useState, useRef } from "react";
import { X, Plus, Trash2, ChevronDown, Image as ImageIcon, Tag, Layers, Package, Info, DollarSign, FileText, List, Upload } from "lucide-react";
import { uploadImageToCloudinary } from "../../utils/imageUpload";

const EditProductModal = ({
  formData,
  categories,
  handleInputChange,
  handleAttributeChange,
  handleAddAttribute,
  handleRemoveAttribute,
  handleUpdate,
  setEditingProduct,
  error,
}) => {
  const [uploadProgress, setUploadProgress] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [localImages, setLocalImages] = useState({
    mainImage: formData.image || null,
    additionalImages: formData.additionalImages || []
  });

  const mainImageInputRef = useRef(null);
  const additionalImagesInputRef = useRef(null);

  const handleImageUpload = async (file, isMainImage) => {
    if (!file) return;
  
    setIsUploading(true);
    setUploadError(null);
    setUploadProgress(0);
  
    try {
      const { url } = await uploadImageToCloudinary(
        file,
        (progress) => setUploadProgress(progress),
        'product'
      );
  
      if (isMainImage) {
        setLocalImages(prev => ({ ...prev, mainImage: url }));
        handleInputChange({ target: { name: 'image', value: url } });
      } else {
        setLocalImages(prev => ({
          ...prev,
          additionalImages: [...prev.additionalImages, url]
        }));
        // Pass the new array directly
        handleInputChange({
          target: {
            name: 'additionalImages',
            value: [...formData.additionalImages, url]
          }
        });
      }
    } catch (err) {
      console.error('Image upload failed:', err);
      setUploadError(err.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) handleImageUpload(file, true);
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => handleImageUpload(file, false));
  };

  const removeAdditionalImage = (index) => {
    const newImages = [...localImages.additionalImages];
    newImages.splice(index, 1);
    setLocalImages(prev => ({ ...prev, additionalImages: newImages }));
    handleInputChange({
      target: {
        name: 'additionalImages',
        value: newImages
      }
    });
  };

  const triggerMainImageInput = () => mainImageInputRef.current?.click();
  const triggerAdditionalImagesInput = () => additionalImagesInputRef.current?.click();

  return (
    <div className="p-6 max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            Edit Product
          </h2>
          <p className="text-sm text-gray-500 mt-1">Update product details and inventory</p>
        </div>
        <button
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
          onClick={() => setEditingProduct(null)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {(error || uploadError) && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 flex items-start gap-3">
          <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Error</p>
            <p className="text-sm">{error || uploadError}</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Product Information Section */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-medium text-lg text-gray-800 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            Product Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Tag className="w-4 h-4" />
                Product Title *
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Premium Leather Wallet"
                value={formData.title || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <List className="w-4 h-4" />
                Category *
              </label>
              <div className="relative">
                <select
                  name="categoryId"
                  value={formData.categoryId || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg appearance-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition pr-10 bg-white"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <FileText className="w-4 h-4" />
                Description
              </label>
              <textarea
                name="description"
                placeholder="Detailed product description..."
                value={formData.description || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition h-32 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-medium text-lg text-gray-800 mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-blue-600" />
            Product Images
          </h3>
          <div className="space-y-4">
            {/* Main Image Upload */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <ImageIcon className="w-4 h-4" />
                Main Image *
              </label>

              <input
                type="file"
                ref={mainImageInputRef}
                onChange={handleMainImageChange}
                accept="image/*"
                className="hidden"
              />

              <div className="flex items-center gap-4">
                <div
                  onClick={triggerMainImageInput}
                  className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors bg-gray-50"
                >
                  {localImages.mainImage ? (
                    <img
                      src={localImages.mainImage}
                      alt="Main product"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500 text-center px-2">Upload Main Image</span>
                    </>
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-2">
                    Recommended: Square image, 800x800px or larger, JPG/PNG format
                  </p>
                  {isUploading && uploadProgress !== null && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Images Upload */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Layers className="w-4 h-4" />
                Additional Images
              </label>

              <input
                type="file"
                ref={additionalImagesInputRef}
                onChange={handleAdditionalImagesChange}
                accept="image/*"
                multiple
                className="hidden"
              />

              <button
                type="button"
                onClick={triggerAdditionalImagesInput}
                className="mb-3 flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50"
                disabled={isUploading}
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Add Images
              </button>

              <div className="flex flex-wrap gap-3">
                {localImages.additionalImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Additional product view ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeAdditionalImage(index)}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {localImages.additionalImages.length === 0 && (
                  <div className="text-sm text-gray-400 italic">
                    No additional images added yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-medium text-lg text-gray-800 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            Pricing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1">
                Original Price (Rs.) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">Rs.</span>
                </div>
                <input
                  type="number"
                  name="originalPrice"
                  placeholder="0.00"
                  value={formData.originalPrice || ""}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1">
                Discounted Price (Rs.) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">Rs.</span>
                </div>
                <input
                  type="number"
                  name="discountedPrice"
                  placeholder="0.00"
                  value={formData.discountedPrice || ""}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Attributes Section */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-lg text-gray-800 flex items-center gap-2">
            <List className="w-5 h-5 text-blue-600" />
            Attributes
          </h3>
          <button
            type="button"
            onClick={handleAddAttribute}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Attribute
          </button>
        </div>

        <div className="space-y-3">
          {formData.attributes?.map((attr, index) => (
            <div key={attr.id || index} className="flex gap-3 items-center">
              <input
                type="text"
                name="name"
                value={attr.name || ""}
                onChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
                placeholder="Attribute name"
                className="px-4 py-2.5 border border-gray-200 rounded-lg flex-1 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
              />
              <span className="text-gray-400">:</span>
              <input
                type="text"
                name="value"
                value={attr.value || ""}
                onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                placeholder="Attribute value"
                className="px-4 py-2.5 border border-gray-200 rounded-lg flex-1 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
              />
              <button
                type="button"
                onClick={() => handleRemoveAttribute(index)}
                className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove attribute"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {(!formData.attributes || formData.attributes.length === 0) && (
            <div className="text-center py-4 text-gray-400 text-sm">
              No attributes added yet
            </div>
          )}
        </div>
      </div>

        {/* Inventory Section */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-medium text-lg text-gray-800 mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            Inventory
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="inStock"
                id="inStock"
                checked={formData.inStock || false}
                onChange={handleInputChange}
                className="h-5 w-5 text-blue-600 focus:ring-blue-200 border-gray-300 rounded"
              />
              <label htmlFor="inStock" className="ml-3 text-sm text-gray-700">
                In Stock
              </label>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1">
                Total Stock
              </label>
              <input
                type="number"
                name="totalStock"
                placeholder="Available quantity"
                value={formData.stock || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-2">
          <button
            className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            onClick={() => setEditingProduct(null)}
            disabled={isUploading}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-colors font-medium flex items-center gap-1.5 disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handleUpdate}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;