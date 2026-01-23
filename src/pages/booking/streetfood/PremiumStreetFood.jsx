import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CountdownTimer from '../../../components/CountdownTimer.jsx';

const PremiumStreetFood = () => {
  const navigate = useNavigate();
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: 1,
    message: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const paypalButtonRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    // Send booking information to WhatsApp
    let message = "🍜 *NEW BOOKING - Street Food Tour on Scooter*\n\n";
    message += `👤 *Customer Information:*\n`;
    message += `Name: ${bookingForm.name}\n`;
    message += `Email: ${bookingForm.email}\n`;
    message += `Phone: ${bookingForm.phone}\n`;
    message += `Preferred Date: ${bookingForm.date}\n`;
    message += `Number of Guests: ${bookingForm.guests}\n`;
    if (bookingForm.message) {
      message += `Special Requests: ${bookingForm.message}\n`;
    }
    
    message += `\n📋 *Tour Details:*\n`;
    message += `Tour: Street Food Tour on Scooter\n`;
    message += `Price: $49 (1,250,000₫) per person\n`;
    message += `Duration: 4 hours\n`;
    message += `Total: $${49 * bookingForm.guests} (${(1250000 * bookingForm.guests).toLocaleString('vi-VN')}₫)\n\n`;
    message += `Thank you for choosing Saigonese Hang-out! 🇻🇳`;

    const whatsappUrl = `https://wa.me/+84978270038?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Show success modal
    setShowSuccessModal(true);
    
    // Reset form after showing success
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      date: '',
      guests: 1,
      message: ''
    });
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  useEffect(() => {
    const renderPayPalButton = () => {
      if (!paypalButtonRef.current || !window.PayPal || !window.PayPal.HostedButtons) {
        return;
      }
      
      // Clear any existing buttons
      paypalButtonRef.current.innerHTML = '';
      
      window.PayPal.HostedButtons.render({
        hostedButtonId: 'W6KYF94SER9ML'
      }, paypalButtonRef.current).catch((err) => {
        console.error('Error rendering PayPal hosted button:', err);
      });
    };

    // Check if script already exists
    const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
    if (existingScript && window.PayPal) {
      setTimeout(renderPayPalButton, 100);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=BAAbjwCQd2Vdd59eqsfoRs9fxVGOQC85iqHq-L66VtN_2jSFu0aEpDz7QS1jHgEOT_2NOjKNxiZkmKIq64&components=hosted-buttons&disable-funding=venmo&currency=USD';
    script.async = true;
    
    script.onload = () => {
      if (window.PayPal && paypalButtonRef.current) {
        renderPayPalButton();
      }
    };

    script.onerror = () => {
      console.error('Failed to load PayPal SDK');
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 text-[#0f3e2c]">
            Street Food Tour on Scooter
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-600">
            Experience Saigon's authentic street food culture from the back of a scooter! Zip through hidden alleys 
            and local neighborhoods to discover secret food stalls, then elevate the experience with rooftop views 
            and Michelin restaurant visits. Ride like a local, eat like a local.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Tour Details */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
                <span className="inline-block px-3 py-1 text-sm font-bold rounded-md bg-red-100 text-red-600">
                  20% OFF
                </span>
                <CountdownTimer 
                  endDate="2025-12-22T23:59:59" 
                  theme="morning"
                />
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-xl font-medium text-gray-400 line-through">$59</span>
                  <span className="text-4xl font-bold text-purple-600">$49</span>
                </div>
                <span className="text-lg text-gray-600">per person • 1,250,000₫ • 4 hours</span>
              </div>
              
              <h2 className="text-2xl font-bold mb-6 text-gray-800">What's Included:</h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Scooter Transportation</strong> - Ride on the back of a scooter with experienced drivers, experience Saigon like a local</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Gỏi Khô Bò + Nước Mía</strong> - Traditional Vietnamese beef salad with sugarcane juice (2 options available)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Bánh Xèo</strong> - Authentic Vietnamese crispy pancake</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Bánh Canh Cua</strong> - Thick noodle soup with crab</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Chợ Hoa Hồ Thị Kỷ</strong> - Flower market experience with beer, grilled squid, grilled rice paper, lemongrass beef skewers, and coconut ice cream</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Rooftop Bar</strong> - End your tour with drinks at a rooftop bar overlooking Saigon</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Michelin Guide Restaurants</strong> - Visit Michelin-selected restaurants featuring exceptional Vietnamese cuisine</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Professional English-speaking guide</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Small group experience (max 8 people)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Tour Highlights:</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 text-xl">🥗</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Gỏi Khô Bò + Nước Mía</h3>
                    <p className="text-gray-600">Taste traditional Vietnamese beef salad with fresh sugarcane juice</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 text-xl">🥘</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Bánh Xèo & Bánh Canh Cua</h3>
                    <p className="text-gray-600">Enjoy crispy Vietnamese pancake and thick noodle soup with fresh crab</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 text-xl">🌺</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Flower Market Nightlife</h3>
                    <p className="text-gray-600">Experience local nightlife at Hồ Thị Kỷ Flower Market with beer, grilled squid, grilled rice paper, and lemongrass beef skewers</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-xl">🌆</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Rooftop Bar Experience</h3>
                    <p className="text-gray-600">End your tour with drinks at a rooftop bar overlooking Saigon</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-600 text-xl">⭐</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Michelin Guide Restaurants</h3>
                    <p className="text-gray-600">Experience Michelin-selected restaurants featuring exceptional Vietnamese cuisine</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Book Your Premium Tour</h2>
              
              <form onSubmit={handleBookingSubmit} className="space-y-6" style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={bookingForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                    placeholder="Enter your full name"
                    style={{ pointerEvents: 'auto', color: '#111827' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={bookingForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                    placeholder="Enter your email"
                    style={{ pointerEvents: 'auto', color: '#111827' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingForm.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                    placeholder="Enter your phone number"
                    style={{ pointerEvents: 'auto', color: '#111827' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={bookingForm.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                    style={{ pointerEvents: 'auto', color: '#111827' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests *
                  </label>
                  <select
                    name="guests"
                    value={bookingForm.guests}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                    style={{ color: '#111827' }}
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={5}>5 Guests</option>
                    <option value={6}>6 Guests</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    name="message"
                    value={bookingForm.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                    placeholder="Any dietary restrictions or special requests?"
                    style={{ pointerEvents: 'auto', color: '#111827' }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors"
                >
                  Book Street Food Tour - $49 (1,250,000₫)
                </button>

                {/* PayPal Payment */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-3 text-center">Or pay directly with PayPal:</p>
                  <div className="flex justify-center" ref={paypalButtonRef} style={{ pointerEvents: 'auto', zIndex: 1 }}></div>
                </div>
              </form>

              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-800">
                  <strong>Free Cancellation:</strong> Cancel up to 24 hours before your tour for a full refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closeSuccessModal}
          style={{ animation: 'fadeIn 0.3s ease-in-out' }}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'slideUp 0.3s ease-out' }}
          >
            {/* Close Button */}
            <button
              onClick={closeSuccessModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
              Booking Successful!
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Your Street Food Tour has been booked successfully. We'll contact you soon to confirm the details.
            </p>

            {/* Booking Details */}
            <div className="bg-purple-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Tour:</strong> Street Food Tour on Scooter
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Price:</strong> $49 (1,250,000₫) per person
              </p>
              <p className="text-sm text-gray-700">
                <strong>Duration:</strong> 4 hours
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={closeSuccessModal}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumStreetFood;
