import React, { useState } from 'react';

export default function SettingsForm() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validate = (name, value) => {
    let error = '';
    if (name === 'username') {
      if (value.length < 3) error = 'Username must be at least 3 characters long.';
    }
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) error = 'Please enter a valid email address.';
    }
    if (name === 'password') {
      const hasNumber = /\d/;
      if (value.length < 6 || !hasNumber.test(value)) {
        error = 'Password must be at least 6 characters and contain at least one number.';
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final check before submitting
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage('');

    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSuccessMessage('Settings updated successfully!');
    setFormData({ username: '', email: '', password: '' });
    setErrors({});
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>
      
      {successMessage && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm" role="alert">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Username Field */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="username" className="text-sm font-semibold text-gray-700">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className={`border p-2.5 w-full rounded-lg transition-colors focus:outline-none focus:ring-2 ${
              errors.username ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
            }`}
            aria-describedby={errors.username ? "username-error" : undefined}
          />
          {errors.username && (
            <p id="username-error" className="text-red-500 text-xs font-medium" role="alert">{errors.username}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`border p-2.5 w-full rounded-lg transition-colors focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
            }`}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 text-xs font-medium" role="alert">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-semibold text-gray-700">New Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={`border p-2.5 w-full rounded-lg transition-colors focus:outline-none focus:ring-2 ${
              errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
            }`}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          {errors.password && (
            <p id="password-error" className="text-red-500 text-xs font-medium" role="alert">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-3 text-white font-semibold rounded-lg transition-all ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
          }`}
        >
          {isSubmitting ? 'Saving Settings...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}