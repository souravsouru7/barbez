import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addShop } from '../../redux/slices/shopSlice';
import { Store, Image, Phone, FileText, Upload, AlertCircle } from 'lucide-react';

const AddShop = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.shop);

  const [shopData, setShopData] = useState({
    shopName: '',
    address: '',
    contactNumber: '',
    description: '',
    shopImage: null,
    licenseImage: null,
  });

  const [formErrors, setFormErrors] = useState({});

  const validate = () => {
    let errors = {};
    if (!shopData.shopName) errors.shopName = 'Shop name is required';
    if (!shopData.address) errors.address = 'Address is required';
    if (!shopData.contactNumber || !/^\d{10}$/.test(shopData.contactNumber)) {
      errors.contactNumber = 'Valid contact number is required (10 digits)';
    }
    if (!shopData.description) errors.description = 'Description is required';
    if (!shopData.shopImage) errors.shopImage = 'Shop image is required';
    if (!shopData.licenseImage) errors.licenseImage = 'License image is required';
    return errors;
  };

  const handleChange = (e) => {
    setShopData({ ...shopData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setShopData({ ...shopData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }
    setFormErrors({});
    dispatch(addShop(shopData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-8 animate-gradient-x">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400 animate-pulse">Add New Shop</h2>

        {error && (
          <div className="mb-6 p-4 bg-red-900 border-l-4 border-red-500 text-red-100 rounded animate-shake">
            <div className="flex items-center">
              <AlertCircle size={20} className="mr-2" />
              <p>{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            icon={<Store size={20} className="mr-2 text-indigo-400" />}
            label="Shop Name"
            name="shopName"
            value={shopData.shopName}
            onChange={handleChange}
            error={formErrors.shopName}
          />

          <InputField
            icon={<FileText size={20} className="mr-2 text-indigo-400" />}
            label="Address"
            name="address"
            value={shopData.address}
            onChange={handleChange}
            error={formErrors.address}
          />

          <InputField
            icon={<Phone size={20} className="mr-2 text-indigo-400" />}
            label="Contact Number"
            name="contactNumber"
            value={shopData.contactNumber}
            onChange={handleChange}
            error={formErrors.contactNumber}
          />

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center">
              <FileText size={20} className="mr-2 text-indigo-400" />
              Description
            </label>
            <textarea
              name="description"
              value={shopData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32 resize-none transition-all duration-300 focus:shadow-lg"
            ></textarea>
            {formErrors.description && (
              <p className="text-red-500 text-sm mt-1 animate-bounce">{formErrors.description}</p>
            )}
          </div>

          <FileUpload
            icon={<Image size={20} className="mr-2 text-indigo-400" />}
            label="Shop Image"
            name="shopImage"
            onChange={handleFileChange}
            error={formErrors.shopImage}
          />

          <FileUpload
            icon={<FileText size={20} className="mr-2 text-indigo-400" />}
            label="License Image"
            name="licenseImage"
            onChange={handleFileChange}
            error={formErrors.licenseImage}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            {loading ? 'Submitting...' : 'Add Shop'}
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ icon, label, name, value, onChange, error }) => (
  <div>
    <label className="block text-sm font-medium mb-2 flex items-center">
      {icon}
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 focus:shadow-lg"
    />
    {error && <p className="text-red-500 text-sm mt-1 animate-bounce">{error}</p>}
  </div>
);

const FileUpload = ({ icon, label, name, onChange, error }) => (
  <div>
    <label className="block text-sm font-medium mb-2 flex items-center">
      {icon}
      {label}
    </label>
    <div className="flex items-center justify-center w-full">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-all duration-300 hover:border-indigo-500">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload size={24} className="text-indigo-400 mb-2 animate-bounce" />
          <p className="mb-2 text-sm text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
        </div>
        <input
          type="file"
          name={name}
          onChange={onChange}
          className="hidden"
        />
      </label>
    </div>
    {error && <p className="text-red-500 text-sm mt-1 animate-bounce">{error}</p>}
  </div>
);

export default AddShop;