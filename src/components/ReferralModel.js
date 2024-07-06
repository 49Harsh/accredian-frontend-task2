import React, { useState } from 'react';
import axios from 'axios';

function ReferralModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    referrerName: '',
    referrerEmail: '',
    refereeName: '',
    refereeEmail: '',
    course: ''
  });

  const [onclose, setOnClose] = useState("false")

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.referrerName) newErrors.referrerName = 'Referrer name is required';
    if (!formData.referrerEmail) newErrors.referrerEmail = 'Referrer email is required';
    if (!formData.refereeName) newErrors.refereeName = 'Referee name is required';
    if (!formData.refereeEmail) newErrors.refereeEmail = 'Referee email is required';
    if (!formData.course) newErrors.course = 'Course is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('http://localhost:3001/api/referrals', formData);
        onClose();
        alert('Referral submitted successfully!');
      } catch (error) {
        console.error('Error submitting referral:', error);
        alert('Error submitting referral. Please try again.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Referral Form</h3>
          <form onSubmit={handleSubmit} className="mt-2">
            <input
              type="text"
              name="referrerName"
              placeholder="Your Name"
              onChange={handleChange}
              className="mt-2 p-2 w-full border rounded"
            />
            {errors.referrerName && <p className="text-red-500 text-xs">{errors.referrerName}</p>}
            <input
              type="email"
              name="referrerEmail"
              placeholder="Your Email"
              onChange={handleChange}
              className="mt-2 p-2 w-full border rounded"
            />
            {errors.referrerEmail && <p className="text-red-500 text-xs">{errors.referrerEmail}</p>}
            <input
              type="text"
              name="refereeName"
              placeholder="Friend's Name"
              onChange={handleChange}
              className="mt-2 p-2 w-full border rounded"
            />
            {errors.refereeName && <p className="text-red-500 text-xs">{errors.refereeName}</p>}
            <input
              type="email"
              name="refereeEmail"
              placeholder="Friend's Email"
              onChange={handleChange}
              className="mt-2 p-2 w-full border rounded"
            />
            {errors.refereeEmail && <p className="text-red-500 text-xs">{errors.refereeEmail}</p>}
            <input
              type="text"
              name="course"
              placeholder="Course Name"
              onChange={handleChange}
              className="mt-2 p-2 w-full border rounded"
            />
            {errors.course && <p className="text-red-500 text-xs">{errors.course}</p>}
            <div className="items-center px-4 py-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Submit Referral
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReferralModal;