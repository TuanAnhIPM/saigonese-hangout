import React, { useState, useEffect, useRef } from 'react';

const HistoryTour = () => {
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
    alert('Booking submitted for History Tour! We\'ll contact you soon.');
    window.location.href = '/';
  };

  useEffect(() => {
    const renderPayPalButtons = () => {
      if (!paypalButtonRef.current || !window.PayPal) {
        console.log('PayPal not ready or ref not available');
        return;
      }
      
      // Clear any existing buttons
      paypalButtonRef.current.innerHTML = '';
      
      window.PayPal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '40.00',
                currency_code: 'USD'
              },
              description: 'History Tour - 1,000,000 VND per person'
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Transaction completed by ${details.payer.name.given_name}!`);
            window.location.href = 'https://saigonesehangout.com/';
          });
        },
        onCancel: (data) => {
          window.location.href = 'https://saigonesehangout.com/booking/history';
        },
        onError: (err) => {
          console.error('PayPal error:', err);
        }
      }).render(paypalButtonRef.current).catch((err) => {
        console.error('Error rendering PayPal buttons:', err);
      });
    };

    // Check if script already exists
    const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
    if (existingScript && window.PayPal) {
      // Script already loaded, render buttons immediately
      setTimeout(renderPayPalButtons, 100);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=BAAbjwCQd2Vdd59eqsfoRs9fxVGOQC85iqHq-L66VtN_2jSFu0aEpDz7QS1jHgEOT_2NOjKNxiZkmKIq64&disable-funding=venmo&currency=USD';
    script.async = true;
    
    script.onload = () => {
      if (window.PayPal && paypalButtonRef.current) {
        renderPayPalButtons();
      }
    };

    script.onerror = () => {
      console.error('Failed to load PayPal SDK');
    };

    document.body.appendChild(script);

    return () => {
      // Don't remove script on unmount as it might be used by other components
    };
  }, []);

  return (
    <div className="min-h-screen pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 text-[#0f3e2c]">
            History Tour
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-600">
            Discover Saigon's rich history through 10 fascinating locations. From colonial architecture 
            to hidden war bunkers, experience the city's past and present in this comprehensive 3-hour tour.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Tour Details */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-blue-600">$40</span>
                <span className="text-lg text-gray-600">per person • ~1,000,000₫ • 4 hours</span>
              </div>
              
              <h2 className="text-2xl font-bold mb-6 text-gray-800">What's Included:</h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Bưu Điện</strong> (Central Post Office)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Nhà Thờ Đức Bà</strong> (Notre-Dame Cathedral Basilica)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Fall of Saigon Helicopter Evacuation Site</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Đường Sách Thành Phố</strong> (City Book Street) - 45 minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Dinh Độc Lập</strong> (Independence Palace) - 25 minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Tượng Thích Quảng Đức</strong> (Thich Quang Duc Memorial) - 25 minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Tropical Fruit Tasting</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Hầm Vũ Khí</strong> (Weapons Bunker) - 15 minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Cà Phê Chung Cư Nguyễn Thiện Thuật</strong> (Cà Phê Đỗ Phủ)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Chợ Hoa</strong> (Flower Market) - 20 minutes (Hu Tieu noodles)</span>
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

            {/* Tour Highlights */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Tour Highlights:</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-xl">🏛️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Colonial Architecture</h3>
                    <p className="text-gray-600">Explore Bưu Điện and Nhà Thờ Đức Bà - iconic French colonial landmarks</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 text-xl">🏛️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Independence Palace</h3>
                    <p className="text-gray-600">Visit the historic palace and Fall of Saigon evacuation site</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-xl">📚</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Book Street & Culture</h3>
                    <p className="text-gray-600">Stroll through City Book Street and explore local culture</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-600 text-xl">☕</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Local Experiences</h3>
                    <p className="text-gray-600">Taste tropical fruits, visit Cà Phê Đỗ Phủ, and enjoy Hu Tieu at Flower Market</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Book Your Tour</h2>
              
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    style={{ color: '#111827' }}
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={5}>5 Guests</option>
                    <option value={6}>6 Guests</option>
                    <option value={7}>7 Guests</option>
                    <option value={8}>8 Guests</option>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="Any special requests or questions?"
                    style={{ pointerEvents: 'auto', color: '#111827' }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                >
                  Book History Tour - $40
                </button>

                {/* PayPal Payment */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-3 text-center">Or pay directly with PayPal:</p>
                  <div className="flex justify-center" ref={paypalButtonRef} style={{ pointerEvents: 'auto', zIndex: 1 }}></div>
                </div>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
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

export default HistoryTour;
