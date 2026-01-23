import React, { useState, useEffect, useRef } from 'react';
import CountdownTimer from '../../../components/CountdownTimer.jsx';

const PremiumStreetFood = () => {
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: 1,
    message: ''
  });
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
    alert('Booking submitted for Premium Street Food Tour! We\'ll contact you soon.');
    window.location.href = '/booking/success';
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    style={{ pointerEvents: 'auto' }}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your email"
                    style={{ pointerEvents: 'auto' }}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                    style={{ pointerEvents: 'auto' }}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    style={{ pointerEvents: 'auto' }}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Any dietary restrictions or special requests?"
                    style={{ pointerEvents: 'auto' }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Book Street Food Tour - $49 (1,250,000₫)
                </button>

                {/* PayPal Payment */}
                <div className="mt-6 pt-6 border-t-2 border-gray-200">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Or</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.076 18.382c.155 1.093.908 1.864 2.05 1.864h1.438l.772-4.9h-1.439c-1.142 0-1.895.771-2.05 1.864l-.771 4.172zm12.847-8.182c-.155-1.093-.908-1.864-2.05-1.864h-1.439l-.772 4.9h1.439c1.142 0 1.895-.771 2.05-1.864l.772-4.172z" fill="#003087"/>
                        <path d="M20.61 6.375c-.155-1.093-.908-1.864-2.05-1.864h-1.439l-.772 4.9h1.439c1.142 0 1.895-.771 2.05-1.864l.772-4.172zM9.126 6.375c-.155-1.093-.908-1.864-2.05-1.864H5.637L4.865 10.411h1.439c1.142 0 1.895-.771 2.05-1.864l.772-4.172z" fill="#009CDE"/>
                        <path d="M12.5 2C8.91 2 6 4.91 6 8.5s2.91 6.5 6.5 6.5 6.5-2.91 6.5-6.5S16.09 2 12.5 2zm0 11c-2.485 0-4.5-2.015-4.5-4.5S10.015 4 12.5 4 17 6.015 17 8.5 14.985 13 12.5 13z" fill="#012169"/>
                      </svg>
                      <span className="text-base font-semibold text-gray-800">Pay with PayPal</span>
                    </div>
                    <p className="text-xs text-center text-gray-600 mb-4">
                      Secure payment • Instant confirmation
                    </p>
                    <div 
                      className="flex justify-center min-h-[50px] items-center" 
                      ref={paypalButtonRef} 
                      style={{ pointerEvents: 'auto', zIndex: 1 }}
                    >
                      <div className="text-sm text-gray-400">Loading PayPal...</div>
                    </div>
                  </div>
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
    </div>
  );
};

export default PremiumStreetFood;
