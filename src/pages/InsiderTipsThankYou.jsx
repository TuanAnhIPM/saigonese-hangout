import React, { useRef, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const InsiderTipsThankYou = ({ theme }) => {
  const isMorning = theme === "morning";
  const tipsRef = useRef(null);
  const [searchParams] = useSearchParams();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFoodCategory, setActiveFoodCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Generate secure access token
  const generateAccessToken = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return btoa(`${timestamp}-${random}-${Math.random().toString(36).substring(2, 15)}`)
      .replace(/[+/=]/g, (char) => {
        const replacements = { '+': '-', '/': '_', '=': '' };
        return replacements[char];
      });
  };

  // Validate PayPal return parameters
  const isValidPayPalReturn = (params) => {
    const hasPaymentId = params.get("paymentId");
    const hasToken = params.get("token");
    const hasPayerId = params.get("PayerID");
    const hasInvoiceId = params.get("invoiceId");
    return !!(hasPaymentId || hasToken || hasPayerId || hasInvoiceId);
  };

  // Verify access token and payment
  useEffect(() => {
    const verifyAccess = () => {
      try {
        // Localhost bypass for development
        const host = window.location.hostname || '';
        const port = window.location.port || '';
        const isLan = /^192\.168\./.test(host) || /^10\./.test(host) || /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host);
        const isLocal = (
          host === 'localhost' ||
          host === '127.0.0.1' ||
          host === '0.0.0.0' ||
          host === '::1' ||
          host.endsWith('.local') ||
          port === '5173' ||
          isLan
        );
        
        // Handle PayPal return
        if (isValidPayPalReturn(searchParams)) {
          const accessToken = generateAccessToken();
          const item = searchParams.get("item") || localStorage.getItem("insider_item") || "insider";
          
          const paymentData = {
            token: accessToken,
            item: item,
            timestamp: Date.now(),
            verified: true,
            expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000)
          };
          
          localStorage.setItem("insider_access_token", accessToken);
          localStorage.setItem("insider_payment_data", JSON.stringify(paymentData));
          localStorage.setItem("insider_item", item);
          localStorage.removeItem("paypal_payment_started");
          
          setIsAuthorized(true);
          setIsChecking(false);
          // Clean URL
          window.history.replaceState({}, '', '/insider/thank-you');
          return;
        }

        // Explicit developer override via query param
        const devOverride = searchParams.get("dev") === "1";
        if (devOverride) {
          const token = btoa('dev-' + Date.now()).replace(/=+$/, '');
          const paymentData = {
            token,
            item: 'insider',
            timestamp: Date.now(),
            verified: true,
            expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000)
          };
          localStorage.setItem('insider_access_token', token);
          localStorage.setItem('insider_payment_data', JSON.stringify(paymentData));
          localStorage.setItem('insider_item', 'insider');
        }
        if (isLocal || devOverride) {
          setIsAuthorized(true);
          setIsChecking(false);
          return;
        }

        // Get token from URL or localStorage
        const urlToken = searchParams.get("token");
        const storedToken = localStorage.getItem("insider_access_token");
        const paymentData = localStorage.getItem("insider_payment_data");
        
        // Validate token
        const token = urlToken || storedToken;
        if (!token) {
          console.warn("No access token found");
          setIsAuthorized(false);
          setIsChecking(false);
          return;
        }

        // Verify payment data
        if (paymentData) {
          const payment = JSON.parse(paymentData);
          
          // Check expiration (30 days)
          if (payment.expiresAt && Date.now() > payment.expiresAt) {
            console.warn("Access token expired");
            localStorage.removeItem("insider_access_token");
            localStorage.removeItem("insider_payment_data");
            setIsAuthorized(false);
            setIsChecking(false);
            return;
          }

          // Verify token matches
          if (payment.token === token && payment.verified) {
            setIsAuthorized(true);
            setIsChecking(false);
            return;
          }
        }

        // Fallback: Check if payment was started (less secure but allows access)
        const paymentStarted = localStorage.getItem("paypal_payment_started");
        const hasPayPalReturn = searchParams.get("paymentId") || 
                                searchParams.get("token") || 
                                searchParams.get("PayerID");
        
        if (paymentStarted || hasPayPalReturn) {
          // Allow access but show warning
          console.warn("Access granted via fallback verification");
          setIsAuthorized(true);
          setIsChecking(false);
          return;
        }

        // No valid access
        setIsAuthorized(false);
        setIsChecking(false);
      } catch (error) {
        console.error("Access verification error:", error);
        setIsAuthorized(false);
        setIsChecking(false);
      }
    };

    verifyAccess();
  }, [searchParams]);

  // Food stops data - from Excel (all sheets)
  const foodStops = [
    {
      id: 1,
      name: "Cơm tấm Nguyễn Văn Cừ",
      category: "restaurant",
      description: "Broken Rice  - Open: 07:00 – 15:00",
      price: "120,000 VND/dish",
      location: "District 1, Saigon",
      mapLink: "https://maps.google.com/?q=C%C6%A1m%20t%E1%BA%A5m%20Nguy%E1%BB%85n%20V%C4%83n%20C%E1%BB%AB+Qu%E1%BA%ADn%201+Saigon",
      rating: 4.5,
      tags: ["broken","budget"]
    },
    {
      id: 2,
      name: "A Tùng Bánh mì bò nướng bơ Campuchia",
      category: "street-food",
      description: "Special Version of Banh Mi - Open: 12PM–10:30 PM",
      price: "30,000 VND",
      location: "District 1, Saigon",
      mapLink: "https://maps.google.com/?q=A%20T%C3%B9ng%20B%C3%A1nh%20m%C3%AC%20b%C3%B2%20n%C6%B0%E1%BB%9Bng%20b%C6%A1%20Campuchia+Qu%E1%BA%ADn%201+Saigon",
      rating: 4.9,
      tags: ["special","budget"]
    },
    {
      id: 3,
      name: "Bún thịt nướng Kiều Bảo",
      category: "restaurant",
      description: "Grilled Pork and Rice Vermicelli  - Open: 11 AM–9 PM",
      price: "35,000 VND",
      location: "District 1, Saigon",
      mapLink: "https://maps.google.com/?q=B%C3%BAn%20th%E1%BB%8Bt%20n%C6%B0%E1%BB%9Bng%20Ki%E1%BB%81u%20B%E1%BA%A3o+Qu%E1%BA%ADn%201+Saigon",
      rating: 4.8,
      tags: ["grilled","budget"]
    },
    {
      id: 4,
      name: "Bánh Xèo 46A",
      category: "restaurant",
      description: "Sizzling Cake - Open: 10AM–1:30PM\n4PM–8:50 PM",
      price: "100,000 VND",
      location: "District 1, Saigon",
      mapLink: "https://maps.google.com/?q=B%C3%A1nh%20X%C3%A8o%2046A+Qu%E1%BA%ADn%201+Saigon",
      rating: 4.5,
      tags: ["sizzling","budget"]
    },
    {
      id: 5,
      name: "Bánh Mì Huynh Hoa",
      category: "street-food",
      description: "Banh Mi Vietnamese Baguette - Open: 6 AM–10 PM",
      price: "60,000 VND",
      location: "District 1, Saigon",
      mapLink: "https://maps.google.com/?q=B%C3%A1nh%20M%C3%AC%20Huynh%20Hoa+Qu%E1%BA%ADn%201+Saigon",
      rating: 4.7,
      tags: ["banh","budget"]
    },
    {
      id: 6,
      name: "Phở",
      category: "restaurant",
      description: "Pho - Open: 6 AM–12 PM",
      price: "70 - 90,000 VND",
      location: "District 1, Saigon",
      mapLink: "https://maps.google.com/?q=Ph%E1%BB%9F+Qu%E1%BA%ADn%201+Saigon",
      rating: 4.5,
      tags: ["pho","budget"]
    },
    {
      id: 7,
      name: "Bun Bo Hue Huong Giang",
      category: "restaurant",
      description: "Spicy Beef Noodle Soup - Open: 7AM–12:30PM\n 4PM–8:30PM",
      price: "70 - 90,000 VND",
      location: "District 3, Saigon",
      mapLink: "https://maps.google.com/?q=Bun%20Bo%20Hue%20Huong%20Giang+Qu%E1%BA%ADn%203+Saigon",
      rating: 4.9,
      tags: ["spicy","budget"]
    },
    {
      id: 8,
      name: "Chuối Nếp Nướng Võ Văn Tần",
      category: "restaurant",
      description: "Grilled Banana Wrapped in \nSticky Rice - Open: 7 AM–9:30 PM",
      price: "25,000 VND/dish",
      location: "District 3, Saigon",
      mapLink: "https://maps.google.com/?q=Chu%E1%BB%91i%20N%E1%BA%BFp%20N%C6%B0%E1%BB%9Bng%20V%C3%B5%20V%C4%83n%20T%E1%BA%A7n+Qu%E1%BA%ADn%203+Saigon",
      rating: 4.5,
      tags: ["grilled","budget"]
    },
    {
      id: 9,
      name: "Bánh Mì Chảo Calmette",
      category: "street-food",
      description: "Another Special Version of Banh Mi - Open: 9 AM–5 PM",
      price: "50,000 VND",
      location: "District 4, Saigon",
      mapLink: "https://maps.google.com/?q=B%C3%A1nh%20M%C3%AC%20Ch%E1%BA%A3o%20Calmette+Qu%E1%BA%ADn%204+Saigon",
      rating: 4.5,
      tags: ["another","budget"]
    },
    {
      id: 10,
      name: "Phố Ẩm Thực - Vĩnh Khánh\n\"Vinh Khanh Food Street\"",
      category: "restaurant",
      description: "Drinking and eating ! - Open: 6 AM–9 PM",
      price: "Varies",
      location: "District 4, Saigon",
      mapLink: "https://maps.google.com/?q=Ph%E1%BB%91%20%E1%BA%A8m%20Th%E1%BB%B1c%20-%20V%C4%A9nh%20Kh%C3%A1nh%0A%22Vinh%20Khanh%20Food%20Street%22+Qu%E1%BA%ADn%204+Saigon",
      rating: 4.7,
      tags: ["drinking","budget"]
    },
    {
      id: 11,
      name: "Bò Nướng Lụi Sả",
      category: "restaurant",
      description: "Grilled Lemongrass Beef Skewers - Open: 5PM-11PM",
      price: "10,000 VND/piece",
      location: "District 10, Saigon",
      mapLink: "https://maps.google.com/?q=B%C3%B2%20N%C6%B0%E1%BB%9Bng%20L%E1%BB%A5i%20S%E1%BA%A3+Qu%E1%BA%ADn%2010+Saigon",
      rating: 4.5,
      tags: ["grilled","budget"]
    },
    {
      id: 12,
      name: "Chè",
      category: "restaurant",
      description: "Hot Sweet Soup - Open: 3PM–11 PM",
      price: "10,000 VND/portion",
      location: "District 10, Saigon",
      mapLink: "https://maps.google.com/?q=Ch%C3%A8+Qu%E1%BA%ADn%2010+Saigon",
      rating: 4.9,
      tags: ["hot","budget"]
    },
    {
      id: 13,
      name: "Hồ Thị Kỷ \n\"Ho Thi Ky Street Food Market\"",
      category: "restaurant",
      description: "If you're a foodie, this is a heaven for u! - Open: 5–10 PM",
      price: "Varies",
      location: "District 10, Saigon",
      mapLink: "https://maps.google.com/?q=H%E1%BB%93%20Th%E1%BB%8B%20K%E1%BB%B7%20%0A%22Ho%20Thi%20Ky%20Street%20Food%20Market%22+Qu%E1%BA%ADn%2010+Saigon",
      rating: 4.9,
      tags: ["if","budget"]
    },
    {
      id: 14,
      name: "Kem Dừa",
      category: "restaurant",
      description: "Coconut Ice Cream - Open: 5PM-11PM",
      price: "25,000 VND",
      location: "District 10, Saigon",
      mapLink: "https://maps.google.com/?q=Kem%20D%E1%BB%ABa%20+Qu%E1%BA%ADn%2010+Saigon",
      rating: 4.9,
      tags: ["coconut","budget"]
    },
    {
      id: 15,
      name: "Bò Lá Lốt, Mỡ Chài",
      category: "restaurant",
      description: " Grilled Beef wrapped in leaves  - Open: 7 AM–9 PM",
      price: "50,000 VND",
      location: "Bình Thạnh, Saigon",
      mapLink: "https://maps.google.com/?q=B%C3%B2%20L%C3%A1%20L%E1%BB%91t%2C%20M%E1%BB%A1%20Ch%C3%A0i+B%C3%ACnh%20Th%E1%BA%A1nh+Saigon",
      rating: 4.8,
      tags: ["","budget"]
    },
    {
      id: 16,
      name: "Bánh Canh Cua",
      category: "restaurant",
      description: "Crab Noodle Soup - Open: 6 AM–10 PM",
      price: "40,000 VND",
      location: "Bình Thạnh, Saigon",
      mapLink: "https://maps.google.com/?q=B%C3%A1nh%20Canh%20Cua+B%C3%ACnh%20Th%E1%BA%A1nh+Saigon",
      rating: 4.8,
      tags: ["crab","budget"]
    },
    {
      id: 17,
      name: "Ram Quảng Ngon",
      category: "restaurant",
      description: "Vietnamese food - Check hours",
      price: "Varies",
      location: "Bình Thạnh, Saigon",
      mapLink: "https://maps.google.com/?q=Ram%20Qu%E1%BA%A3ng%20Ngon+B%C3%ACnh%20Th%E1%BA%A1nh+Saigon",
      rating: 4.9,
      tags: ["budget"]
    },
    {
      id: 18,
      name: "Bánh Ướt Ban Mê",
      category: "restaurant",
      description: "Vietnamese food - Check hours",
      price: "Varies",
      location: "Bình Thạnh, Saigon",
      mapLink: "https://maps.google.com/?q=B%C3%A1nh%20%C6%AF%E1%BB%9Bt%20Ban%20M%C3%AA+B%C3%ACnh%20Th%E1%BA%A1nh+Saigon",
      rating: 4.7,
      tags: ["budget"]
    },
    {
      id: 19,
      name: "Bánh Mỳ Xíu Mại Chén",
      category: "restaurant",
      description: "Vietnamese food - Check hours",
      price: "Varies",
      location: "Bình Thạnh, Saigon",
      mapLink: "https://maps.google.com/?q=B%C3%A1nh%20M%E1%BB%B3%20X%C3%ADu%20M%E1%BA%A1i%20Ch%C3%A9n+B%C3%ACnh%20Th%E1%BA%A1nh+Saigon",
      rating: 4.8,
      tags: ["budget"]
    },
    {
      id: 20,
      name: "Gà Nướng + Thịt Nướng Cơm Lam",
      category: "restaurant",
      description: "Vietnamese food - Check hours",
      price: "Varies",
      location: "Bình Thạnh, Saigon",
      mapLink: "https://maps.google.com/?q=G%C3%A0%20N%C6%B0%E1%BB%9Bng%20%2B%20Th%E1%BB%8Bt%20N%C6%B0%E1%BB%9Bng%20C%C6%A1m%20Lam+B%C3%ACnh%20Th%E1%BA%A1nh+Saigon",
      rating: 4.9,
      tags: ["budget"]
    },
    {
      id: 21,
      name: "Quán Thuỳ Linh",
      category: "restaurant",
      description: "Vietnamese food - Check hours",
      price: "Varies",
      location: "Bình Thạnh, Saigon",
      mapLink: "https://maps.google.com/?q=Qu%C3%A1n%20Thu%E1%BB%B3%20Linh+B%C3%ACnh%20Th%E1%BA%A1nh+Saigon",
      rating: 4.8,
      tags: ["budget"]
    },
    {
      id: 22,
      name: "Bánh Flan Bình Thuận",
      category: "restaurant",
      description: "Vietnamese food - Check hours",
      price: "Varies",
      location: "Bình Thạnh, Saigon",
      mapLink: "https://maps.google.com/?q=B%C3%A1nh%20Flan%20B%C3%ACnh%20Thu%E1%BA%ADn+B%C3%ACnh%20Th%E1%BA%A1nh+Saigon",
      rating: 4.6,
      tags: ["budget"]
    },
    {
      id: 23,
      name: "Cơm Tấm Ba Ghiền",
      category: "restaurant",
      description: "Broken Rice  - Open: 07:30 – 20:30",
      price: "70 - 80,000 VND/dish",
      location: "Tân Bình, Saigon",
      mapLink: "https://maps.google.com/?q=C%C6%A1m%20T%E1%BA%A5m%20Ba%20Ghi%E1%BB%81n%20+T%C3%A2n%20B%C3%ACnh+Saigon",
      rating: 4.8,
      tags: ["broken","budget"]
    },
    {
      id: 24,
      name: "Quán Chay 1 Nụ Cười",
      category: "vegetarian",
      description: "Everything ! - Open: 7 AM–9 PM",
      price: "20 - 35,000 VND/dish",
      location: "Vegetarian Food, Saigon",
      mapLink: "https://maps.google.com/?q=Quán+Chay+1+Nụ+Cười+Saigon",
      rating: 4.8,
      tags: ["everything","vegetarian","budget"]
    },
    {
      id: 25,
      name: "Quán chay Sala",
      category: "vegetarian",
      description: "Everything hahaa - Open: 6 AM–9:30 PM",
      price: "35 - 50,000 VND/dish",
      location: "Vegetarian Food, Saigon",
      mapLink: "https://maps.google.com/?q=Quán+chay+Sala+Saigon",
      rating: 4.8,
      tags: ["everything","vegetarian","budget"]
    },
    {
      id: 26,
      name: "Chay Garden - Vegetarian Restaurant & Coffee",
      category: "vegetarian",
      description: "Still everything ! - Open: 10 AM–10 PM",
      price: "80,000 VND  -  100,000 VND/dish",
      location: "Vegetarian Food, Saigon",
      mapLink: "https://maps.google.com/?q=Chay+Garden+Vegetarian+Restaurant+Coffee+Saigon",
      rating: 4.5,
      tags: ["still","vegetarian","budget"]
    },
    {
      id: 27,
      name: "Quán Chay Nhà",
      category: "vegetarian",
      description: "Family meal - Open: 11 AM–2:30 PM\n5–9 PM",
      price: "50 - 70,000 VND/dish",
      location: "Vegetarian Food, Saigon",
      mapLink: "https://maps.google.com/?q=Quán+Chay+Nhà+Saigon",
      rating: 4.6,
      tags: ["family","vegetarian","budget"]
    },
    {
      id: 28,
      name: "Lẩu Chay & Coffee Nhà Hát",
      category: "vegetarian",
      description: "Vegan Hot Pot  - Open: 10 AM–10 PM",
      price: "100,000 VND/person",
      location: "Vegetarian Food, Saigon",
      mapLink: "https://maps.google.com/?q=Lẩu+Chay+Coffee+Nhà+Hát+Saigon",
      rating: 4.8,
      tags: ["vegan","vegetarian","budget"]
    },
    {
      id: 29,
      name: "Kem Dừa Bơ",
      category: "vegetarian",
      description: "Avocado & Coconut Ice Cream - Open: 5PM-11PM",
      price: "30,000 VND",
      location: "Vegetarian Food, Saigon",
      mapLink: "https://maps.google.com/?q=Kem+Dừa+Bơ+Saigon",
      rating: 4.7,
      tags: ["avocado","vegetarian","budget"]
    },
    {
      id: 30,
      name: "Chuối Nếp Nướng Võ Văn Tần",
      category: "vegetarian",
      description: "Grilled Banana Wrapped in \nSticky Rice - Open: 7 AM–9:30 PM",
      price: "25,000 VND/dish",
      location: "Vegetarian Food, Saigon",
      mapLink: "https://maps.google.com/?q=Chuối+Nếp+Nướng+Võ+Văn+Tần+Saigon",
      rating: 4.6,
      tags: ["grilled","vegetarian","budget"]
    },
    {
      id: 31,
      name: "Chè",
      category: "vegetarian",
      description: "Hot Sweet Soup - Open: 3PM–11 PM",
      price: "10,000 VND/portion",
      location: "Vegetarian Food, Saigon",
      mapLink: "https://maps.google.com/?q=Chè+Saigon",
      rating: 4.7,
      tags: ["hot","vegetarian","budget"]
    }
  ];


  // Accommodation data - TODO: Fill in with actual recommendations
  const accommodations = [
    // TODO: Add hostel recommendations
    // TODO: Add hotel recommendations (budget, mid-range)
    // TODO: Add Airbnb tips
    {
      id: 1,
      name: "Best Areas to Stay",
      category: "accommodation",
      description: "District 1 for convenience, District 3 for local vibe, District 7 for expat area.",
      price: "Varies",
      location: "Multiple districts",
      mapLink: "https://maps.google.com/?q=District+1+Saigon",
      rating: null,
      tags: ["location", "guide"]
    }
    // TODO: Add more accommodation options
  ];

  // Nightlife data - from Excel
  const nightlife = [
    {
      id: 1,
      name: "Chợ Bình Tây",
      category: "nightlife",
      description: "WholeSale Market - Best for local shopping, avoid tourist prices.",
      price: "Free entry",
      location: "District 6, Saigon",
      mapLink: "https://maps.google.com/?q=Chợ+Bình+Tây+District+6",
      rating: 4.3,
      tags: ["market", "shopping", "local"]
    },
    {
      id: 2,
      name: "Chạng Vạng Rooftop",
      category: "nightlife",
      description: "Riverside view, landmark 81, District 1. Beautiful views of Saigon.",
      price: "150,000 - 300,000 VND",
      location: "District 2, Saigon",
      mapLink: "https://maps.google.com/?q=Chạng+Vạng+Rooftop+District+2",
      rating: 4.6,
      tags: ["rooftop", "drinks", "views"]
    },
    {
      id: 3,
      name: "Acoustic Bar - Ngô Thời Nhiệm",
      category: "nightlife",
      description: "Bar with karaoke - Great for singing and drinks with friends.",
      price: "100,000 - 200,000 VND",
      location: "District 3, Saigon",
      mapLink: "https://maps.google.com/?q=Acoustic+Bar+Ngô+Thời+Nhiệm+District+3",
      rating: 4.4,
      tags: ["bar", "karaoke", "music"]
    },
    {
      id: 4,
      name: "ATMOS CLUB",
      category: "nightlife",
      description: "CLUB - High-energy dance club, popular with locals and tourists.",
      price: "200,000 - 500,000 VND",
      location: "District 1, Saigon",
      mapLink: "https://maps.google.com/?q=ATMOS+CLUB+District+1",
      rating: 4.5,
      tags: ["club", "dancing", "nightlife"]
    },
    {
      id: 5,
      name: "EMPIRE CLUB",
      category: "nightlife",
      description: "CLUB - Late night party spot, open until 4 AM.",
      price: "200,000 - 500,000 VND",
      location: "District 1, Saigon",
      mapLink: "https://maps.google.com/?q=EMPIRE+CLUB+District+1",
      rating: 4.4,
      tags: ["club", "dancing", "late-night"]
    },
    {
      id: 6,
      name: "Chill Skybar",
      category: "nightlife",
      description: "Rooftop Bar - The bustling of Saigon from above. Great for sunset drinks.",
      price: "150,000 - 300,000 VND",
      location: "District 1, Saigon",
      mapLink: "https://maps.google.com/?q=Chill+Skybar+District+1",
      rating: 4.5,
      tags: ["rooftop", "drinks", "views"]
    },
    {
      id: 7,
      name: "Saigon Japan Town",
      category: "nightlife",
      description: "Red light Area lol! - Open 24 hours, unique area with Japanese restaurants and bars.",
      price: "Varies",
      location: "District 1, Saigon",
      mapLink: "https://maps.google.com/?q=Saigon+Japan+Town+District+1",
      rating: 4.2,
      tags: ["bar", "restaurant", "24/7"]
    },
    {
      id: 8,
      name: "Phố đi bộ Bùi Viện (Bui Vien Walking Street)",
      category: "nightlife",
      description: "Loud music, boy&girl dancing, suitable for youngsters :D. Busy after 7PM.",
      price: "50,000 - 200,000 VND",
      location: "District 1, Saigon",
      mapLink: "https://maps.google.com/?q=Bui+Vien+Walking+Street+District+1",
      rating: 4.2,
      tags: ["bar", "touristy", "lively"]
    },
    {
      id: 9,
      name: "Diamond Plaza",
      category: "nightlife",
      description: "Shopping Mall - Air-conditioned shopping center, great escape from heat.",
      price: "Free entry",
      location: "District 1, Saigon",
      mapLink: "https://maps.google.com/?q=Diamond+Plaza+District+1",
      rating: 4.3,
      tags: ["mall", "shopping", "air-conditioned"]
    }
  ];

  // Historical Places data - from Excel
  const historicalPlaces = [
    {
      id: 1,
      name: "Bảo Tàng Chứng Tích Chiến Tranh (War Remnants Museum)",
      category: "historical",
      description: "Museum showcasing the Vietnam War from Vietnamese perspective. Powerful and moving exhibits.",
      price: "40,000 VND (1.57$)",
      location: "District 3, Saigon",
      mapLink: "https://maps.google.com/?q=War+Remnants+Museum+District+3",
      rating: 4.7,
      tags: ["museum", "history", "war"]
    },
    {
      id: 2,
      name: "Dinh Độc Lập (Independence Palace)",
      category: "historical",
      description: "Historic presidential palace where the Vietnam War ended. Beautiful architecture and gardens.",
      price: "65,000 VND (2.7$)",
      location: "District 1, Saigon",
      mapLink: "https://maps.google.com/?q=Independence+Palace+District+1",
      rating: 4.6,
      tags: ["palace", "history", "architecture"]
    },
    {
      id: 3,
      name: "Bảo tàng Mỹ thuật Hồ Chí Minh (Ho Chi Minh City Museum of Fine Arts)",
      category: "historical",
      description: "Art museum featuring Vietnamese art from ancient to contemporary. Beautiful colonial building.",
      price: "30,000 VND (1.2$)",
      location: "District 1, Saigon",
      mapLink: "https://maps.google.com/?q=Ho+Chi+Minh+City+Museum+of+Fine+Arts+District+1",
      rating: 4.5,
      tags: ["museum", "art", "culture"]
    },
    {
      id: 4,
      name: "Bảo tàng Lịch sử TP.Hồ Chí Minh (History Museum of Ho Chi Minh City)",
      category: "historical",
      description: "Museum showcasing Vietnamese history and culture. Great for understanding the country's past.",
      price: "30,000 VND (1.2$)",
      location: "District 1, Saigon",
      mapLink: "https://maps.google.com/?q=History+Museum+Ho+Chi+Minh+City+District+1",
      rating: 4.4,
      tags: ["museum", "history", "culture"]
    },
    {
      id: 5,
      name: "Bến Nhà Rồng (Dragon Wharf - Ho Chi Minh Museum)",
      category: "historical",
      description: "Museum dedicated to Ho Chi Minh. Historic site where he left Vietnam in 1911.",
      price: "5,000 VND (2 cents)",
      location: "District 4, Saigon",
      mapLink: "https://maps.google.com/?q=Dragon+Wharf+Ho+Chi+Minh+Museum+District+4",
      rating: 4.5,
      tags: ["museum", "history", "ho-chi-minh"]
    },
    {
      id: 6,
      name: "Hầm giấu vũ khí biệt động sài gòn 1968 (Secret Bunker for the 1968 - Fight)",
      category: "historical",
      description: "Underground secret bunker used during the war. Unique historical site, less touristy.",
      price: "25,000 VND (1$)",
      location: "District 3, Saigon",
      mapLink: "https://maps.google.com/?q=Secret+Bunker+1968+District+3",
      rating: 4.6,
      tags: ["bunker", "history", "war", "hidden"]
    },
    {
      id: 7,
      name: "Bưu Điện và Nhà Thờ Đức Bà (Post Office and Notre Dame Cathedral)",
      category: "historical",
      description: "Beautiful colonial architecture. Post office and cathedral side by side. Free entry.",
      price: "Free",
      location: "District 1, Saigon",
      mapLink: "https://maps.google.com/?q=Post+Office+Notre+Dame+Cathedral+District+1",
      rating: 4.8,
      tags: ["architecture", "free", "cathedral", "post-office"]
    }
  ];

  // Hidden Gems data - TODO: Fill in with actual spots
  const hiddenGems = [
    {
      id: 1,
      name: "Hidden Alley Cafes",
      category: "hidden-gems",
      description: "Look for cafes in small alleys (hẻm). Often cheaper and more authentic.",
      price: "25,000 - 60,000 VND",
      location: "Various alleys in District 1 & 3",
      mapLink: "https://maps.google.com/?q=District+1+Saigon",
      rating: null,
      tags: ["cafe", "hidden", "local"]
    }
    // TODO: Add more hidden gems
  ];

  // Language phrases data
  const languagePhrases = [
    {
      id: 1,
      title: "Hello / Thank You",
      description: "Xin chào (Hello) / Cảm ơn (Thank you) / Cảm ơn nhiều (Thank you very much)",
      category: "language",
      icon: "👋"
    },
    {
      id: 2,
      title: "How Much?",
      description: "Bao nhiêu tiền? (How much?) - Essential for shopping and food",
      category: "language",
      icon: "💬"
    },
    {
      id: 3,
      title: "No Thank You",
      description: "Không, cảm ơn (No thank you) - Polite way to decline vendors",
      category: "language",
      icon: "🙅"
    },
    {
      id: 4,
      title: "Too Expensive",
      description: "Đắt quá (Too expensive) / Giảm giá được không? (Can you reduce the price?)",
      category: "language",
      icon: "💰"
    },
    {
      id: 5,
      title: "Where is...?",
      description: "Ở đâu là...? (Where is...?) - For asking directions",
      category: "language",
      icon: "🗺️"
    }
    // TODO: Add more phrases
  ];

  // Practical Info data
  const practicalInfo = [
    {
      id: 1,
      title: "Emergency Numbers",
      description: "Police: 113 | Ambulance: 115 | Fire: 114 | Tourist Hotline: 1080",
      category: "safety",
      icon: "🚨"
    },
    {
      id: 2,
      title: "Best Time to Visit",
      description: "Dry season: Dec-Apr (best weather). Avoid: May-Nov (rainy season, floods possible).",
      category: "practical",
      icon: "🌤️"
    },
    {
      id: 3,
      title: "Essential Apps",
      description: "Grab (transport), Google Maps, Google Translate, Zalo (local WhatsApp), ViettelPay.",
      category: "tech",
      icon: "📱"
    },
    {
      id: 4,
      title: "Power Adapters",
      description: "Type A (2 flat pins) or Type C (2 round pins). Voltage: 220V. Most hotels have adapters.",
      category: "practical",
      icon: "🔌"
    },
    {
      id: 5,
      title: "Tipping Culture",
      description: "Not mandatory but appreciated. 10-15% in restaurants. 10,000-20,000 VND for Grab drivers.",
      category: "money",
      icon: "💵"
    }
    // TODO: Add more practical info
  ];

  // Tips data
  const tips = [
    {
      id: 1,
      title: "Grab App is Your Best Friend",
      description: "Download Grab for rides and food delivery. Much cheaper than taxis and safer than motorbike taxis if you're not comfortable.",
      category: "transportation",
      icon: "🚗"
    },
    {
      id: 2,
      title: "Avoid Tourist Restaurants",
      description: "If you see English menus with photos, prices are usually 2-3x higher. Walk 2-3 blocks away for local prices.",
      category: "food",
      icon: "🍜"
    },
    {
      id: 3,
      title: "Cash is King",
      description: "Most places don't accept cards. Carry cash, especially small bills (10,000-50,000 VND) for street food.",
      category: "money",
      icon: "💰"
    },
    {
      id: 4,
      title: "Learn Basic Vietnamese Numbers",
      description: "Knowing numbers 1-10 helps negotiate prices. Sellers appreciate it and may give better deals.",
      category: "language",
      icon: "🔢"
    },
    {
      id: 5,
      title: "Water Bottle Trick",
      description: "Never pay more than 10,000 VND for a 500ml water bottle. Convenience stores charge 15,000-20,000 VND - find local shops.",
      category: "money",
      icon: "💧"
    },
    {
      id: 6,
      title: "Cross Streets Safely",
      description: "Walk slowly and steadily across busy streets. Traffic will flow around you. Don't stop or run - that's dangerous.",
      category: "safety",
      icon: "🚶"
    },
    {
      id: 7,
      title: "Bargain at Markets",
      description: "Always negotiate at markets. Start at 70% of asking price. Be friendly, smile, and walk away if needed.",
      category: "shopping",
      icon: "🛍️"
    },
    {
      id: 8,
      title: "Avoid Rush Hours",
      description: "7-9 AM and 5-7 PM are chaos. Plan accordingly. Traffic jams can add 30-60 minutes to your travel time.",
      category: "transportation",
      icon: "⏰"
    },
    {
      id: 9,
      title: "Grab Routes Optimization",
      description: "Use Grab Express (motorbike) for short distances. Set pickup point 50m away from main road to avoid traffic.",
      category: "transportation",
      icon: "🗺️"
    },
    {
      id: 10,
      title: "ATM Locations",
      description: "Avoid ATMs in tourist areas (higher fees). Use ATMs inside malls or banks. TP Bank and VP Bank have lowest fees.",
      category: "money",
      icon: "🏧"
    },
    {
      id: 11,
      title: "SIM Card Best Deal",
      description: "Avoid airport SIM sellers - they push TV360 packages you don't need. Buy SIM cards from official stores (Viettel, Vinaphone) in city. Data-only SIM: 100,000-150,000 VND for 30 days unlimited.",
      category: "tech",
      icon: "📱"
    },
    {
      id: 12,
      title: "Hotel Booking Trick",
      description: "Book same day for better rates. Many hotels drop prices in afternoon. Use Agoda or Booking.com - compare both.",
      category: "accommodation",
      icon: "🏨"
    },
    {
      id: 13,
      title: "Nightlife Safety",
      description: "Keep phone in front pocket. You can walk alone at midnight on main roads, but avoid dark alleys. Use Grab, not random motorbike taxis.",
      category: "safety",
      icon: "🌙"
    },
    {
      id: 14,
      title: "Market Shopping",
      description: "Ben Thanh Market = tourist prices. Go to Binh Tay Market (District 5) for real local prices. Start at 70% of asking price.",
      category: "shopping",
      icon: "🛒"
    },
    {
      id: 15,
      title: "Street Food Timing",
      description: "Best street food: 7-9am (breakfast), 11am-1pm (lunch), 5-7pm (dinner). Avoid empty stalls - low turnover = less fresh.",
      category: "food",
      icon: "🍜"
    },
    {
      id: 16,
      title: "Coffee Culture",
      description: "Vietnamese coffee is strong! Order 'cà phê sữa đá' (iced milk coffee) or 'cà phê đen' (black). Average price: 15,000-30,000 VND.",
      category: "food",
      icon: "☕"
    }
  ];

  // Tricks data
  const tricks = [
    {
      id: 1,
      title: "Taxi Meter Scam Prevention",
      description: "Before getting in, confirm the meter is on. If driver refuses, get out immediately. Use Grab instead.",
      category: "transportation",
      icon: "🚕"
    },
    {
      id: 2,
      title: "Currency Exchange Trick",
      description: "Never exchange at airports or hotels. Find jewelry shops or banks for better rates. Compare rates online first.",
      category: "money",
      icon: "💱"
    },
    {
      id: 3,
      title: "Street Food Hygiene",
      description: "Look for places with high turnover. Busy stalls = fresh food. Avoid empty stalls, especially seafood.",
      category: "food",
      icon: "🍽️"
    },
    {
      id: 4,
      title: "SIM Card Hack",
      description: "Don't buy at airport - they scam you with TV360 packages. Buy from official Viettel/Vinaphone stores in city (District 1). Ask for 'data-only' SIM, no TV. ~100,000-150,000 VND for 30 days unlimited.",
      category: "tech",
      icon: "📱"
    },
    {
      id: 5,
      title: "Avoid Overpriced Tours",
      description: "Book tours directly with operators or via WhatsApp. Hotels/travel agencies mark up 30-50%.",
      category: "tours",
      icon: "🎯"
    },
    {
      id: 6,
      title: "Restaurant Menu Trick",
      description: "If menu has no prices, ask first. If prices seem high, thank them and leave. There's always another place nearby.",
      category: "food",
      icon: "📋"
    },
    {
      id: 7,
      title: "Motorbike Taxi Negotiation",
      description: "Agree on price BEFORE getting on. No meter = negotiate. Short rides should be 20,000-40,000 VND max.",
      category: "transportation",
      icon: "🏍️"
    },
    {
      id: 8,
      title: "Free WiFi Everywhere",
      description: "Most cafes, restaurants, and hotels have free WiFi. No purchase required. Just ask for password politely.",
      category: "tech",
      icon: "📶"
    },
    {
      id: 9,
      title: "Airport Taxi Scam",
      description: "Official airport taxi: 200,000-250,000 VND to D1. If driver asks for 500,000+, walk away. Use Grab instead (150,000-180,000 VND).",
      category: "transportation",
      icon: "✈️"
    },
    {
      id: 10,
      title: "Menu Price Check",
      description: "If no prices on menu, ask 'Bao nhiêu tiền?' before ordering. If too expensive, say 'Cảm ơn' and leave.",
      category: "food",
      icon: "📋"
    },
    {
      id: 11,
      title: "Grab Food Hack",
      description: "Order Grab Food during lunch (11am-1pm) for discounts. Many restaurants have 20-30% off promotions.",
      category: "food",
      icon: "🍔"
    },
    {
      id: 12,
      title: "Hostel Booking",
      description: "Book hostels directly via WhatsApp or phone - often 10-20% cheaper than Booking.com. Many offer free cancellation.",
      category: "accommodation",
      icon: "🛏️"
    },
    {
      id: 13,
      title: "Rooftop Bar Entry",
      description: "Some rooftop bars have dress codes (no flip-flops). Check before going. Happy hour usually 5-7pm.",
      category: "nightlife",
      icon: "🍹"
    },
    {
      id: 14,
      title: "Market Bargaining Script",
      description: "Seller: '200,000' → You: '140,000 được không?' (Can 140,000? - that's 70%). They'll counter → Meet in middle. Smile, be friendly.",
      category: "shopping",
      icon: "💬"
    },
    {
      id: 15,
      title: "Money Exchange Best Rate",
      description: "Jewelry shops on Nguyen An Ninh Street (D1) have best rates. Avoid airport (worst rate) and hotels. Check rate online first.",
      category: "money",
      icon: "💱"
    },
    {
      id: 16,
      title: "Walking Routes",
      description: "D1 is walkable. Use Google Maps walking mode. Cross streets slowly - traffic will flow around you. Don't stop mid-crossing.",
      category: "transportation",
      icon: "🚶"
    }
  ];

  const categories = [
    { id: "all", label: "All", icon: "📍" },
    { id: "food", label: "Food", icon: "🍜" },
    { id: "transportation", label: "Transport", icon: "🚗" },
    { id: "money", label: "Money", icon: "💰" },
    { id: "safety", label: "Safety", icon: "🛡️" },
    { id: "shopping", label: "Shopping", icon: "🛍️" },
    { id: "accommodation", label: "Stay", icon: "🏨" },
    { id: "nightlife", label: "Nightlife", icon: "🍻" },
    { id: "historical", label: "Historical", icon: "🏛️" },
    { id: "language", label: "Language", icon: "🗣️" },
    { id: "tech", label: "Tech", icon: "📱" },
    { id: "tours", label: "Tours", icon: "🎯" }
  ];

  const foodCategories = [
    { id: "all", label: "All Places" },
    { id: "street-food", label: "Street Food" },
    { id: "restaurant", label: "Restaurants" },
    { id: "cafe", label: "Cafes" },
    { id: "vegetarian", label: "Vegetarian" },
    { id: "late-night", label: "Late Night" },
    { id: "breakfast", label: "Breakfast" },
    { id: "rooftop", label: "Rooftop" }
  ];

  const bgStyle = isMorning
    ? "bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3]"
    : "bg-gradient-to-b from-[#0b0b14] via-[#1a052e] to-[#3d0f55]";
  const textColor = isMorning ? "text-[#2d5016]" : "text-white";
  const mutedColor = isMorning ? "text-gray-600" : "text-gray-300";
  const cardBg = isMorning ? "bg-white/90" : "bg-[#0f1218]/80 border border-white/20";
  const cardBgSecondary = isMorning ? "bg-gray-50" : "bg-[#12141b] border border-white/20";
  const inputBg = isMorning ? "bg-white border-gray-300 text-gray-900" : "bg-[#0f1218] border-white/20 text-white";
  const brandColor = isMorning ? "from-[#2d5016] to-[#3a7d2f]" : "from-[#4f46e5] to-[#06b6d4]";

  // Filter food stops
  const filteredFoodStops = foodStops.filter(stop => {
    const matchesSearch = stop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stop.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFoodCategory === "all" || stop.category === activeFoodCategory;
    return matchesSearch && matchesCategory;
  });

  // Filter tips/tricks
  const filteredTips = tips.filter(tip => 
    activeCategory === "all" || tip.category === activeCategory
  );
  const filteredTricks = tricks.filter(trick => 
    activeCategory === "all" || trick.category === activeCategory
  );
  const filteredAccommodations = accommodations.filter(item => 
    activeCategory === "all" || activeCategory === "accommodation"
  );
  const filteredNightlife = nightlife.filter(item => {
    const matchesCategory = activeCategory === "all" || activeCategory === "nightlife";
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const filteredHiddenGems = hiddenGems.filter(item => 
    activeCategory === "all" || searchQuery.toLowerCase().includes("hidden") || searchQuery.toLowerCase().includes("gem")
  );
  const filteredLanguagePhrases = languagePhrases.filter(item => 
    activeCategory === "all" || activeCategory === "language"
  );
  const filteredPracticalInfo = practicalInfo.filter(item => 
    activeCategory === "all" || item.category === activeCategory
  );
  const filteredHistoricalPlaces = historicalPlaces.filter(item => {
    const matchesCategory = activeCategory === "all" || activeCategory === "historical";
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyAll = async () => {
    if (tipsRef.current) {
      const text = tipsRef.current.innerText.trim();
      try {
        await navigator.clipboard.writeText(text);
        const btn = document.getElementById("copyAll");
        if (btn) {
          const originalText = btn.textContent;
          btn.textContent = "Copied ✓";
          btn.className = btn.className.replace(
            /bg-gradient-to-r.*/,
            "bg-gradient-to-r from-green-500 to-green-400 text-white"
          );
          setTimeout(() => {
            btn.textContent = originalText;
            btn.className = btn.className.replace(
              /bg-gradient-to-r from-green-500 to-green-400 text-white/,
              `bg-gradient-to-r ${brandColor} text-white`
            );
          }, 1600);
        }
      } catch (e) {
        alert("Copy failed. Select all (Cmd/Ctrl+A) and copy manually.");
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Show loading state while checking access
  if (isChecking) {
    return (
      <section className={`min-h-screen py-8 sm:py-12 px-4 sm:px-6 md:px-16 transition-all duration-700 ${bgStyle}`}>
        <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[60vh]">
          <div className={`text-center ${textColor}`}>
            <div className="text-lg mb-2">Verifying access...</div>
            <div className={`text-sm ${mutedColor}`}>Please wait</div>
          </div>
        </div>
      </section>
    );
  }

  // Show unauthorized access message
  if (!isAuthorized) {
    return (
      <section className={`min-h-screen py-8 sm:py-12 px-4 sm:px-6 md:px-16 transition-all duration-700 ${bgStyle}`}>
        <div className="max-w-4xl mx-auto">
          <div className={`${cardBg} rounded-2xl p-8 backdrop-blur-sm text-center`}>
            <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${textColor}`}>
              Access Restricted
            </h2>
            <p className={`text-base mb-6 ${mutedColor}`}>
              This page is only accessible after completing your purchase. 
              If you've already paid, please return from PayPal or check your email for the access link.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/insider"
                className={`px-6 py-3 rounded-xl font-semibold bg-gradient-to-r ${brandColor} text-white hover:opacity-90 transition-all`}
              >
                Return to Insider Tips
              </Link>
              <Link
                to="/"
                className={`px-6 py-3 rounded-xl font-semibold ${cardBgSecondary} ${textColor} border border-white/10 hover:opacity-80 transition-all`}
              >
                Go to Home
              </Link>
            </div>
            <p className={`text-xs mt-6 ${mutedColor}`}>
              If you believe this is an error, please contact support with your PayPal transaction ID.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`min-h-screen py-8 sm:py-12 px-4 sm:px-6 md:px-16 transition-all duration-700 ${bgStyle}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${textColor}`}>
              Saigon Insider Guide
            </h1>
            <div className={`text-xs px-3 py-1 rounded-full ${cardBgSecondary} ${mutedColor}`}>
              Private link — save this URL
            </div>
          </div>
          <p className={`text-base sm:text-lg ${mutedColor} max-w-3xl`}>
            Your complete cheat sheet to navigating Saigon like a local. Tips, tricks, and must-visit food stops with prices and directions.
          </p>
        </header>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            id="copyAll"
            onClick={handleCopyAll}
            className={`px-4 py-2 rounded-xl font-semibold bg-gradient-to-r ${brandColor} text-white hover:opacity-90 transition-all`}
          >
            Copy all
          </button>
          <button
            id="downloadPdf"
            onClick={handlePrint}
            className={`px-4 py-2 rounded-xl font-semibold ${cardBgSecondary} ${textColor} border border-white/10 hover:opacity-80 transition-all`}
          >
            Print / Save as PDF
          </button>
          <Link
            to="/insider"
            className={`px-4 py-2 rounded-xl font-semibold ${cardBgSecondary} ${textColor} border border-white/10 hover:opacity-80 transition-all`}
          >
            Back
          </Link>
        </div>

        {/* Search Bar */}
        <div className={`${cardBg} rounded-xl p-4 mb-6 backdrop-blur-sm`}>
          <input
            type="text"
            placeholder="Search food stops, tips, or tricks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border ${inputBg} placeholder-gray-400 focus:outline-none focus:ring-2 ${
              isMorning ? "focus:ring-[#2d5016]" : "focus:ring-[#4cc9f0]"
            }`}
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setActiveFoodCategory("all"); // Reset food category when changing main category
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeCategory === cat.id
                  ? isMorning
                    ? "bg-[#2d5016] text-white"
                    : "bg-[#4f46e5] text-white"
                  : `${cardBgSecondary} ${textColor} hover:opacity-80`
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* 1. Insider Tips Section - Show First */}
        {filteredTips.length > 0 && (
          <section className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold mb-6 ${textColor}`}>
              💡 Insider Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredTips.map((tip) => (
                <div
                  key={tip.id}
                  className={`${cardBg} rounded-xl p-5 hover:shadow-xl transition-all backdrop-blur-sm`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{tip.icon}</span>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold ${textColor} mb-2`}>
                        {tip.title}
                      </h3>
                      <p className={`text-sm ${mutedColor}`}>
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2. Cards Section - Food Stops, Accommodation, Nightlife, etc. */}
        {/* Food Stops - Only show when Food category is selected */}
        {(activeCategory === "all" || activeCategory === "food") && filteredFoodStops.length > 0 && (
          <section className="mb-12" ref={tipsRef}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl sm:text-3xl font-bold ${textColor}`}>
                🍜 Food Stops
              </h2>
              <div className="flex flex-wrap gap-2">
                {foodCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFoodCategory(cat.id)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      activeFoodCategory === cat.id
                        ? isMorning
                          ? "bg-[#2d5016] text-white"
                          : "bg-[#4f46e5] text-white"
                        : `${cardBgSecondary} ${textColor}`
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredFoodStops.map((stop) => (
                <div
                  key={stop.id}
                  className={`${cardBg} rounded-xl p-5 hover:shadow-xl transition-all backdrop-blur-sm`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold ${textColor} mb-2`}>
                        {stop.name}
                      </h3>
                      <p className={`text-sm ${mutedColor} mb-3`}>
                        {stop.description}
                      </p>
                    </div>
                    {stop.rating && (
                      <div className={`text-sm font-semibold ${
                        isMorning ? "text-[#2d5016]" : "text-[#4cc9f0]"
                      }`}>
                        ⭐ {stop.rating}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${textColor}`}>💰 Price:</span>
                      <span className={`text-sm ${mutedColor}`}>{stop.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${textColor}`}>📍 Location:</span>
                      <span className={`text-sm ${mutedColor}`}>{stop.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {stop.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-1 rounded-full ${
                            isMorning
                              ? "bg-[#2d5016]/10 text-[#2d5016]"
                              : "bg-[#4f46e5]/20 text-[#4cc9f0]"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={stop.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      isMorning
                        ? "bg-[#2d5016] text-white hover:bg-[#3a7d2f]"
                        : "bg-[#4f46e5] text-white hover:bg-[#6366f1]"
                    }`}
                  >
                    <span>🗺️</span>
                    Open in Maps
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* App Download Cards - Show for Transport, Tech categories */}
        {(activeCategory === "transportation" || activeCategory === "tech" || activeCategory === "all") && (
          <section className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold mb-6 ${textColor}`}>
              📱 Essential Apps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Grab App */}
              {(activeCategory === "all" || activeCategory === "transportation") && (
                <div className={`${cardBg} rounded-xl p-5 hover:shadow-xl transition-all backdrop-blur-sm`}>
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl">🚗</span>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold ${textColor} mb-2`}>
                        Grab
                      </h3>
                      <p className={`text-sm ${mutedColor} mb-3`}>
                        Best app for rides and food delivery. Much cheaper than taxis.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="https://apps.apple.com/app/grab/id647268330"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        isMorning
                          ? "bg-[#2d5016] text-white hover:bg-[#3a7d2f]"
                          : "bg-[#4f46e5] text-white hover:bg-[#6366f1]"
                      }`}
                    >
                      <span>📱</span>
                      iOS
                    </a>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.grabtaxi.passenger"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        isMorning
                          ? "bg-[#2d5016] text-white hover:bg-[#3a7d2f]"
                          : "bg-[#4f46e5] text-white hover:bg-[#6366f1]"
                      }`}
                    >
                      <span>🤖</span>
                      Android
                    </a>
                  </div>
                </div>
              )}

              {/* Google Maps */}
              {(activeCategory === "all" || activeCategory === "transportation") && (
                <div className={`${cardBg} rounded-xl p-5 hover:shadow-xl transition-all backdrop-blur-sm`}>
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl">🗺️</span>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold ${textColor} mb-2`}>
                        Google Maps
                      </h3>
                      <p className={`text-sm ${mutedColor} mb-3`}>
                        Download offline maps before arriving. Essential for navigation.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="https://apps.apple.com/app/google-maps/id585027354"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        isMorning
                          ? "bg-[#2d5016] text-white hover:bg-[#3a7d2f]"
                          : "bg-[#4f46e5] text-white hover:bg-[#6366f1]"
                      }`}
                    >
                      <span>📱</span>
                      iOS
                    </a>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.google.android.apps.maps"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        isMorning
                          ? "bg-[#2d5016] text-white hover:bg-[#3a7d2f]"
                          : "bg-[#4f46e5] text-white hover:bg-[#6366f1]"
                      }`}
                    >
                      <span>🤖</span>
                      Android
                    </a>
                  </div>
                </div>
              )}

              {/* Google Translate */}
              {(activeCategory === "all" || activeCategory === "language" || activeCategory === "tech") && (
                <div className={`${cardBg} rounded-xl p-5 hover:shadow-xl transition-all backdrop-blur-sm`}>
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl">🔤</span>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold ${textColor} mb-2`}>
                        Google Translate
                      </h3>
                      <p className={`text-sm ${mutedColor} mb-3`}>
                        Download Vietnamese language pack for offline translation.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="https://apps.apple.com/app/google-translate/id414706506"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        isMorning
                          ? "bg-[#2d5016] text-white hover:bg-[#3a7d2f]"
                          : "bg-[#4f46e5] text-white hover:bg-[#6366f1]"
                      }`}
                    >
                      <span>📱</span>
                      iOS
                    </a>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.google.android.apps.translate"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        isMorning
                          ? "bg-[#2d5016] text-white hover:bg-[#3a7d2f]"
                          : "bg-[#4f46e5] text-white hover:bg-[#6366f1]"
                      }`}
                    >
                      <span>🤖</span>
                      Android
                    </a>
                  </div>
                </div>
              )}

              {/* Zalo - Local WhatsApp */}
              {(activeCategory === "all" || activeCategory === "tech") && (
                <div className={`${cardBg} rounded-xl p-5 hover:shadow-xl transition-all backdrop-blur-sm`}>
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl">💬</span>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold ${textColor} mb-2`}>
                        Zalo
                      </h3>
                      <p className={`text-sm ${mutedColor} mb-3`}>
                        Local messaging app. Many businesses use this instead of WhatsApp.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="https://apps.apple.com/app/zalo/id579523206"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        isMorning
                          ? "bg-[#2d5016] text-white hover:bg-[#3a7d2f]"
                          : "bg-[#4f46e5] text-white hover:bg-[#6366f1]"
                      }`}
                    >
                      <span>📱</span>
                      iOS
                    </a>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.zing.zalo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        isMorning
                          ? "bg-[#2d5016] text-white hover:bg-[#3a7d2f]"
                          : "bg-[#4f46e5] text-white hover:bg-[#6366f1]"
                      }`}
                    >
                      <span>🤖</span>
                      Android
                    </a>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Historical Places Section */}
        {(activeCategory === "all" || activeCategory === "historical") && filteredHistoricalPlaces.length > 0 && (
          <section className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold mb-6 ${textColor}`}>
              🏛️ Historical Places
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredHistoricalPlaces.map((item) => (
                <div
                  key={item.id}
                  className={`${cardBg} rounded-xl p-5 hover:shadow-xl transition-all backdrop-blur-sm`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold ${textColor} mb-2`}>
                        {item.name}
                      </h3>
                      <p className={`text-sm ${mutedColor} mb-3`}>
                        {item.description}
                      </p>
                    </div>
                    {item.rating && (
                      <div className={`text-sm font-semibold ${
                        isMorning ? "text-[#2d5016]" : "text-[#4cc9f0]"
                      }`}>
                        ⭐ {item.rating}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${textColor}`}>💰 Entry Fee:</span>
                      <span className={`text-sm ${mutedColor}`}>{item.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${textColor}`}>📍 Location:</span>
                      <span className={`text-sm ${mutedColor}`}>{item.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-1 rounded-full ${
                            isMorning
                              ? "bg-[#2d5016]/10 text-[#2d5016]"
                              : "bg-[#4f46e5]/20 text-[#4cc9f0]"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {item.mapLink && (
                    <a
                      href={item.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        isMorning
                          ? "bg-[#2d5016] text-white hover:bg-[#3a7d2f]"
                          : "bg-[#4f46e5] text-white hover:bg-[#6366f1]"
                      }`}
                    >
                      <span>🗺️</span>
                      Open in Maps
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Accommodation Section */}
        {(activeCategory === "all" || activeCategory === "accommodation") && filteredAccommodations.length > 0 && (
          <section className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold mb-6 ${textColor}`}>
              🏨 Accommodation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredAccommodations.map((item) => (
                <div
                  key={item.id}
                  className={`${cardBg} rounded-xl p-5 hover:shadow-xl transition-all backdrop-blur-sm`}
                >
                  <h3 className={`text-lg font-bold ${textColor} mb-2`}>
                    {item.name}
                  </h3>
                  <p className={`text-sm ${mutedColor} mb-3`}>
                    {item.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${textColor}`}>💰 Price:</span>
                      <span className={`text-sm ${mutedColor}`}>{item.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${textColor}`}>📍 Location:</span>
                      <span className={`text-sm ${mutedColor}`}>{item.location}</span>
                    </div>
                  </div>
                  {item.mapLink && (
                    <a
                      href={item.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all mt-4 ${
                        isMorning
                          ? "bg-[#2d5016] text-white hover:bg-[#3a7d2f]"
                          : "bg-[#4f46e5] text-white hover:bg-[#6366f1]"
                      }`}
                    >
                      <span>🗺️</span>
                      Open in Maps
                    </a>
                  )}
                </div>
              ))}
            </div>
            {filteredAccommodations.length === 1 && filteredAccommodations[0].name === "Best Areas to Stay" && (
              <p className={`text-sm ${mutedColor} mt-4 italic`}>
                💡 TODO: Add specific hostel and hotel recommendations with prices and links
              </p>
            )}
          </section>
        )}

        {/* Nightlife Section */}
        {(activeCategory === "all" || activeCategory === "nightlife") && filteredNightlife.length > 0 && (
          <section className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold mb-6 ${textColor}`}>
              🍻 Nightlife
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredNightlife.map((item) => (
                <div
                  key={item.id}
                  className={`${cardBg} rounded-xl p-5 hover:shadow-xl transition-all backdrop-blur-sm`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold ${textColor} mb-2`}>
                        {item.name}
                      </h3>
                      <p className={`text-sm ${mutedColor} mb-3`}>
                        {item.description}
                      </p>
                    </div>
                    {item.rating && (
                      <div className={`text-sm font-semibold ${
                        isMorning ? "text-[#2d5016]" : "text-[#4cc9f0]"
                      }`}>
                        ⭐ {item.rating}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${textColor}`}>💰 Price:</span>
                      <span className={`text-sm ${mutedColor}`}>{item.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${textColor}`}>📍 Location:</span>
                      <span className={`text-sm ${mutedColor}`}>{item.location}</span>
                    </div>
                  </div>
                  {item.mapLink && (
                    <a
                      href={item.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                        isMorning
                          ? "bg-[#2d5016] text-white hover:bg-[#3a7d2f]"
                          : "bg-[#4f46e5] text-white hover:bg-[#6366f1]"
                      }`}
                    >
                      <span>🗺️</span>
                      Open in Maps
                    </a>
                  )}
                </div>
              ))}
            </div>
            <p className={`text-sm ${mutedColor} mt-4 italic`}>
              💡 TODO: Add rooftop bars, live music venues, karaoke spots with details
            </p>
          </section>
        )}

        {/* Hidden Gems Section */}
        {filteredHiddenGems.length > 0 && (
          <section className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold mb-6 ${textColor}`}>
              💎 Hidden Gems
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredHiddenGems.map((item) => (
                <div
                  key={item.id}
                  className={`${cardBgSecondary} rounded-xl p-5 hover:shadow-xl transition-all backdrop-blur-sm`}
                >
                  <h3 className={`text-lg font-bold ${textColor} mb-2`}>
                    {item.name}
                  </h3>
                  <p className={`text-sm ${mutedColor} mb-3`}>
                    {item.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${textColor}`}>💰 Price:</span>
                      <span className={`text-sm ${mutedColor}`}>{item.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${textColor}`}>📍 Location:</span>
                      <span className={`text-sm ${mutedColor}`}>{item.location}</span>
                    </div>
                  </div>
                  {item.mapLink && (
                    <a
                      href={item.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all mt-4 ${
                        isMorning
                          ? "bg-[#2d5016] text-white hover:bg-[#3a7d2f]"
                          : "bg-[#4f46e5] text-white hover:bg-[#6366f1]"
                      }`}
                    >
                      <span>🗺️</span>
                      Open in Maps
                    </a>
                  )}
                </div>
              ))}
            </div>
            <p className={`text-sm ${mutedColor} mt-4 italic`}>
              💡 TODO: Add more hidden gems and secret spots
            </p>
          </section>
        )}

        {/* Language Phrases Section */}
        {(activeCategory === "all" || activeCategory === "language") && filteredLanguagePhrases.length > 0 && (
          <section className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold mb-6 ${textColor}`}>
              🗣️ Essential Vietnamese Phrases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredLanguagePhrases.map((phrase) => (
                <div
                  key={phrase.id}
                  className={`${cardBg} rounded-xl p-5 hover:shadow-xl transition-all backdrop-blur-sm`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{phrase.icon}</span>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold ${textColor} mb-2`}>
                        {phrase.title}
                      </h3>
                      <p className={`text-sm ${mutedColor}`}>
                        {phrase.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className={`text-sm ${mutedColor} mt-4 italic`}>
              💡 TODO: Add more phrases for ordering food, bargaining, directions
            </p>
          </section>
        )}

        {/* Practical Info Section */}
        {filteredPracticalInfo.length > 0 && (
          <section className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold mb-6 ${textColor}`}>
              📋 Practical Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredPracticalInfo.map((info) => (
                <div
                  key={info.id}
                  className={`${cardBgSecondary} rounded-xl p-5 hover:shadow-xl transition-all backdrop-blur-sm`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{info.icon}</span>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold ${textColor} mb-2`}>
                        {info.title}
                      </h3>
                      <p className={`text-sm ${mutedColor}`}>
                        {info.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className={`text-sm ${mutedColor} mt-4 italic`}>
              💡 TODO: Add packing list, weather tips, best time to visit details
            </p>
          </section>
        )}

        {/* 3. Pro Tricks Section - Show Last */}
        {filteredTricks.length > 0 && (
          <section className="mb-12">
            <h2 className={`text-2xl sm:text-3xl font-bold mb-6 ${textColor}`}>
              🎯 Pro Tricks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredTricks.map((trick) => (
                <div
                  key={trick.id}
                  className={`${cardBgSecondary} rounded-xl p-5 hover:shadow-xl transition-all border-l-4 ${
                    isMorning
                      ? "border-[#2d5016]"
                      : "border-[#4cc9f0]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{trick.icon}</span>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold ${textColor} mb-2`}>
                        {trick.title}
                      </h3>
                      <p className={`text-sm ${mutedColor}`}>
                        {trick.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className={`text-center py-6 border-t ${isMorning ? "border-gray-300" : "border-white/10"}`}>
          <p className={`text-sm ${mutedColor}`}>
            Last updated: {new Date().toLocaleDateString()} • Enjoy Saigon! 🇻🇳
          </p>
          <p className={`text-xs mt-2 ${mutedColor}`}>
            Have feedback or want a refund? Reply to your receipt email.
          </p>
        </footer>
      </div>

      <style>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
        }
      `}</style>
    </section>
  );
};

export default InsiderTipsThankYou;
