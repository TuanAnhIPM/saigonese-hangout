import React, { useState, useEffect, useRef } from 'react';

const CoffeeTour = () => {
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
    alert('Booking submitted for Coffee & Market Tour! We\'ll contact you soon.');
    window.location.href = '/booking/success';
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
                value: '45.00',
                currency_code: 'USD'
              },
              description: 'Coffee & Market Tour - $45 per person'
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Transaction completed by ${details.payer.name.given_name}!`);
            window.location.href = 'https://saigonesehangout.com/booking/success';
          });
        },
        onCancel: (data) => {
          window.location.href = 'https://saigonesehangout.com/booking/coffee';
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
            Coffee & Market Tour
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-600">
            Discover Saigon's vibrant coffee culture and hidden markets. Taste authentic Vietnamese coffee 
            and explore local markets filled with tropical fruits and traditional goods.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Tour Details */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-amber-600">$45</span>
                <span className="text-lg text-gray-600">per person • 2.5 hours</span>
              </div>
              
              <h2 className="text-2xl font-bold mb-6 text-gray-800">What's Included:</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-600">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Traditional Vietnamese coffee tasting - 3 different styles</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Visit local coffee shops and street vendors</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Explore Bến Thành Market - Saigon's most famous market</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Taste tropical fruits - dragon fruit, rambutan, mangosteen</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Learn about Vietnamese coffee culture and brewing methods</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Professional English-speaking guide</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Small group experience (max 6 people)</span>
                </li>
              </ul>
            </div>

            {/* Coffee Culture Section */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Vietnamese Coffee Culture</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Cà Phê Sữa Đá</h3>
                  <p className="text-gray-600">
                    The iconic Vietnamese iced coffee with sweetened condensed milk, served over ice
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Cà Phê Đen</h3>
                  <p className="text-gray-600">
                    Strong black coffee, often served hot with a traditional Vietnamese coffee filter
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Cà Phê Trứng</h3>
                  <p className="text-gray-600">
                    Unique egg coffee - a creamy, custard-like coffee drink that's a Hanoi specialty
                  </p>
                </div>
              </div>
            </div>

            {/* Market Highlights */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Market Experience</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Bến Thành Market</h3>
                  <p className="text-gray-600">
                    Explore Saigon's most famous market with over 1,500 stalls selling everything from 
                    fresh produce to traditional handicrafts. Perfect for experiencing local daily life.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Tropical Fruits</h3>
                  <p className="text-gray-600">
                    Taste exotic fruits like dragon fruit, rambutan, mangosteen, and durian. 
                    Learn about their health benefits and cultural significance.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Local Interactions</h3>
                  <p className="text-gray-600">
                    Meet local vendors and learn about their daily lives. Practice basic Vietnamese 
                    phrases and discover hidden gems in the market.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Book Your Coffee Tour</h2>
              <form onSubmit={handleBookingSubmit} className="space-y-4" style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={bookingForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                    placeholder="Enter your full name"
                    style={{ pointerEvents: 'auto', color: '#111827' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={bookingForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                    placeholder="Enter your email"
                    style={{ pointerEvents: 'auto', color: '#111827' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingForm.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                    placeholder="Enter your phone number"
                    style={{ pointerEvents: 'auto', color: '#111827' }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Tour Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={bookingForm.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                      style={{ pointerEvents: 'auto', color: '#111827' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Number of Guests *
                    </label>
                    <select
                      name="guests"
                      value={bookingForm.guests}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                      style={{ color: '#111827' }}
                    >
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Coffee Preferences
                  </label>
                  <select
                    name="coffeePreference"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                    style={{ color: '#111827' }}
                  >
                    <option value="">Select your preference</option>
                    <option value="sweet">Sweet coffee (Cà Phê Sữa Đá)</option>
                    <option value="strong">Strong black coffee</option>
                    <option value="unique">Unique flavors (Egg coffee)</option>
                    <option value="all">Try everything!</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Special Requests
                  </label>
                  <textarea
                    name="message"
                    value={bookingForm.message}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                    placeholder="Any dietary restrictions or special requests?"
                    style={{ pointerEvents: 'auto', color: '#111827' }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold text-lg transition-all mb-4"
                >
                  Book Coffee Tour - $45
                </button>

                {/* PayPal Payment */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-3 text-center">Or pay directly with PayPal:</p>
                  <div className="flex justify-center" ref={paypalButtonRef} style={{ pointerEvents: 'auto', zIndex: 1 }}></div>
                </div>
              </form>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> You will receive a confirmation email within 24 hours. 
                  Please arrive 10 minutes before your scheduled tour time at the meeting point.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeTour;
