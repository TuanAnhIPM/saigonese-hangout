import React, { useState } from 'react';

const PremiumNightLife = ({ theme }) => {
  const isMorning = theme === "morning";
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: 1,
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert('Booking submitted for Night-Life Tour! We\'ll contact you soon.');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-bold mb-6 ${isMorning ? 'text-[#0f3e2c]' : 'text-white'}`}>
            Night-Life Tour
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${isMorning ? 'text-gray-600' : 'text-gray-300'}`}>
            Experience Saigon's vibrant nightlife! Visit rooftop bars, clubs, and entertainment venues 
            in this premium nightlife tour through the city's electric night scene.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Tour Details */}
          <div>
            <div className={`${isMorning ? 'bg-white' : 'bg-gray-800'} rounded-2xl shadow-lg p-8 mb-8`}>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-purple-600">$59</span>
                <span className={`text-lg ${isMorning ? 'text-gray-600' : 'text-gray-300'}`}>per person • 4-5 hours</span>
              </div>
              
              <h2 className={`text-2xl font-bold mb-6 ${isMorning ? 'text-gray-800' : 'text-white'}`}>What's Included:</h2>
              <ul className={`space-y-4 ${isMorning ? 'text-gray-700' : 'text-gray-300'}`}>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Rooftop Bar Sunset</strong> (Chạng Vạng) - 4PM-5PM early evening drinks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Bar Experience</strong> - Visit a popular bar</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Restaurant with Vietnamese EDM Music</strong> - Dining with live music</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span><strong>Club Experience</strong> - Last round at a premier club</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Professional English-speaking guide</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Small group experience (max 6 people)</span>
                </li>
              </ul>
            </div>

            <div className={`${isMorning ? 'bg-white' : 'bg-gray-800'} rounded-2xl shadow-lg p-8`}>
              <h2 className={`text-2xl font-bold mb-6 ${isMorning ? 'text-gray-800' : 'text-white'}`}>Tour Highlights:</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className={`w-12 h-12 ${isMorning ? 'bg-orange-100' : 'bg-orange-900/30'} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-orange-600 text-xl">🌇</span>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isMorning ? 'text-gray-800' : 'text-white'}`}>Rooftop Bar Sunset</h3>
                    <p className={isMorning ? 'text-gray-600' : 'text-gray-300'}>Start your night with sunset drinks at a rooftop bar (4PM-5PM)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className={`w-12 h-12 ${isMorning ? 'bg-purple-100' : 'bg-purple-900/30'} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-purple-600 text-xl">🍻</span>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isMorning ? 'text-gray-800' : 'text-white'}`}>Bar Experience</h3>
                    <p className={isMorning ? 'text-gray-600' : 'text-gray-300'}>Visit a popular bar in Saigon</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className={`w-12 h-12 ${isMorning ? 'bg-red-100' : 'bg-red-900/30'} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-red-600 text-xl">🎵</span>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isMorning ? 'text-gray-800' : 'text-white'}`}>Vietnamese EDM Music</h3>
                    <p className={isMorning ? 'text-gray-600' : 'text-gray-300'}>Dine at a restaurant featuring live Vietnamese EDM music</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className={`w-12 h-12 ${isMorning ? 'bg-blue-100' : 'bg-blue-900/30'} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-blue-600 text-xl">🎉</span>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isMorning ? 'text-gray-800' : 'text-white'}`}>Club Experience</h3>
                    <p className={isMorning ? 'text-gray-600' : 'text-gray-300'}>End your night at a premier club (Last round)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div>
            <div className={`${isMorning ? 'bg-white' : 'bg-gray-800'} rounded-2xl shadow-lg p-8 sticky top-8`}>
              <h2 className={`text-2xl font-bold mb-6 ${isMorning ? 'text-gray-800' : 'text-white'}`}>Book Your Night-Life Tour</h2>
              
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isMorning ? 'text-gray-700' : 'text-gray-300'}`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={bookingForm.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isMorning ? 'border-gray-300 bg-white text-gray-900' : 'border-gray-600 bg-gray-700 text-white'}`}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isMorning ? 'text-gray-700' : 'text-gray-300'}`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={bookingForm.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isMorning ? 'border-gray-300 bg-white text-gray-900' : 'border-gray-600 bg-gray-700 text-white'}`}
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isMorning ? 'text-gray-700' : 'text-gray-300'}`}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingForm.phone}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isMorning ? 'border-gray-300 bg-white text-gray-900' : 'border-gray-600 bg-gray-700 text-white'}`}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isMorning ? 'text-gray-700' : 'text-gray-300'}`}>
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={bookingForm.date}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isMorning ? 'border-gray-300 bg-white text-gray-900' : 'border-gray-600 bg-gray-700 text-white'}`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isMorning ? 'text-gray-700' : 'text-gray-300'}`}>
                    Number of Guests *
                  </label>
                  <select
                    name="guests"
                    value={bookingForm.guests}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isMorning ? 'border-gray-300 bg-white text-gray-900' : 'border-gray-600 bg-gray-700 text-white'}`}
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
                  <label className={`block text-sm font-medium mb-2 ${isMorning ? 'text-gray-700' : 'text-gray-300'}`}>
                    Special Requests
                  </label>
                  <textarea
                    name="message"
                    value={bookingForm.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${isMorning ? 'border-gray-300 bg-white text-gray-900' : 'border-gray-600 bg-gray-700 text-white'}`}
                    placeholder="Any preferences for venues or special requests?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors"
                >
                  Book Night-Life Tour - $59
                </button>

                {/* PayPal Payment */}
                <div className={`border-t pt-4 ${isMorning ? 'border-gray-300' : 'border-gray-600'}`}>
                  <p className={`text-sm mb-3 text-center ${isMorning ? 'text-gray-600' : 'text-gray-300'}`}>Or pay directly with PayPal:</p>
                  <div className="flex justify-center">
                    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                      <input type="hidden" name="cmd" value="_xclick" />
                      <input type="hidden" name="business" value="thestoriesguys@gmail.com" />
                      <input type="hidden" name="item_name" value="Night-Life Tour - $59 per person" />
                      <input type="hidden" name="currency_code" value="USD" />
                      <input type="hidden" name="amount" value="59.00" />
                      <input type="hidden" name="return" value="https://saigonesehangout.com/" />
                      <input type="hidden" name="cancel_return" value="https://saigonese-hangout.com/booking/nightlife/premium" />
                      <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynow_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Buy Now" />
                      <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                    </form>
                  </div>
                </div>
              </form>

              <div className={`mt-6 p-4 rounded-lg ${isMorning ? 'bg-purple-50' : 'bg-purple-900/20'}`}>
                <p className={`text-sm ${isMorning ? 'text-purple-800' : 'text-purple-300'}`}>
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

export default PremiumNightLife;