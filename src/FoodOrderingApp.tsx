import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Star, Clock, MapPin, Phone, CreditCard, Truck } from 'lucide-react';

const FoodOrderingApp = () => {
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  const categories = [
    { id: 'all', name: 'All Items', icon: '🍽️' },
    { id: 'street', name: 'Street Food', icon: '🌮' },
    { id: 'north', name: 'North Indian', icon: '🍛' },
    { id: 'south', name: 'South Indian', icon: '🥞' },
    { id: 'chinese', name: 'Chinese', icon: '🍜' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
    { id: 'beverages', name: 'Beverages', icon: '🥤' }
  ];

  const foodItems = [
    // Street Food
    { id: 1, name: 'Pav Bhaji', price: 120, category: 'street', rating: 4.5, time: '15-20 min', image: '🍞', description: 'Spicy vegetable curry with buttered bread rolls' },
    { id: 2, name: 'Vada Pav', price: 40, category: 'street', rating: 4.2, time: '10-15 min', image: '🥪', description: 'Mumbai\'s favorite potato fritter sandwich' },
    { id: 3, name: 'Bhel Puri', price: 60, category: 'street', rating: 4.3, time: '5-10 min', image: '🥗', description: 'Crispy puffed rice with chutneys and vegetables' },
    { id: 4, name: 'Panipuri', price: 50, category: 'street', rating: 4.6, time: '5-10 min', image: '🫖', description: 'Crispy shells filled with spicy tangy water' },
    { id: 5, name: 'Dosa', price: 80, category: 'street', rating: 4.4, time: '15-20 min', image: '🥞', description: 'Crispy crepe with potato filling' },
    { id: 6, name: 'Samosa', price: 30, category: 'street', rating: 4.1, time: '10-15 min', image: '🥟', description: 'Crispy pastry with spiced potato filling' },
    { id: 7, name: 'Chole Bhature', price: 150, category: 'street', rating: 4.5, time: '20-25 min', image: '🍞', description: 'Spicy chickpea curry with fried bread' },
    { id: 8, name: 'Aloo Tikki', price: 70, category: 'street', rating: 4.2, time: '15-20 min', image: '🥔', description: 'Crispy potato patties with chutneys' },
    
    // North Indian
    { id: 9, name: 'Butter Chicken', price: 320, category: 'north', rating: 4.7, time: '25-30 min', image: '🍗', description: 'Creamy tomato-based chicken curry' },
    { id: 10, name: 'Dal Makhani', price: 280, category: 'north', rating: 4.5, time: '20-25 min', image: '🍲', description: 'Rich black lentil curry with cream' },
    { id: 11, name: 'Paneer Tikka', price: 300, category: 'north', rating: 4.4, time: '20-25 min', image: '🧀', description: 'Grilled cottage cheese with spices' },
    { id: 12, name: 'Biryani', price: 350, category: 'north', rating: 4.8, time: '30-35 min', image: '🍚', description: 'Aromatic rice with meat and spices' },
    { id: 13, name: 'Rogan Josh', price: 380, category: 'north', rating: 4.6, time: '35-40 min', image: '🍖', description: 'Kashmiri lamb curry with yogurt' },
    { id: 14, name: 'Naan', price: 60, category: 'north', rating: 4.3, time: '10-15 min', image: '🫓', description: 'Soft leavened bread from tandoor' },
    { id: 15, name: 'Tandoori Chicken', price: 400, category: 'north', rating: 4.7, time: '25-30 min', image: '🍗', description: 'Marinated chicken cooked in tandoor' },
    { id: 16, name: 'Palak Paneer', price: 260, category: 'north', rating: 4.4, time: '20-25 min', image: '🥬', description: 'Spinach curry with cottage cheese' },
    
    // South Indian
    { id: 17, name: 'Idli Sambar', price: 90, category: 'south', rating: 4.5, time: '15-20 min', image: '⭕', description: 'Steamed rice cakes with lentil curry' },
    { id: 18, name: 'Masala Dosa', price: 120, category: 'south', rating: 4.6, time: '20-25 min', image: '🥞', description: 'Crispy crepe with spiced potato filling' },
    { id: 19, name: 'Uttapam', price: 100, category: 'south', rating: 4.3, time: '15-20 min', image: '🥞', description: 'Thick pancake with vegetables' },
    { id: 20, name: 'Rasam', price: 80, category: 'south', rating: 4.2, time: '10-15 min', image: '🍲', description: 'Tangy tomato and tamarind soup' },
    { id: 21, name: 'Medu Vada', price: 70, category: 'south', rating: 4.4, time: '15-20 min', image: '🍩', description: 'Crispy lentil donuts' },
    { id: 22, name: 'Coconut Rice', price: 110, category: 'south', rating: 4.3, time: '15-20 min', image: '🥥', description: 'Fragrant rice with coconut and spices' },
    { id: 23, name: 'Filter Coffee', price: 40, category: 'south', rating: 4.5, time: '5-10 min', image: '☕', description: 'Traditional South Indian coffee' },
    { id: 24, name: 'Hyderabadi Biryani', price: 420, category: 'south', rating: 4.8, time: '35-40 min', image: '🍚', description: 'Aromatic Hyderabadi style biryani' },
    
    // Chinese
    { id: 25, name: 'Hakka Noodles', price: 180, category: 'chinese', rating: 4.4, time: '20-25 min', image: '🍜', description: 'Stir-fried noodles with vegetables' },
    { id: 26, name: 'Manchurian', price: 200, category: 'chinese', rating: 4.3, time: '20-25 min', image: '🥟', description: 'Fried balls in spicy sauce' },
    { id: 27, name: 'Fried Rice', price: 160, category: 'chinese', rating: 4.2, time: '15-20 min', image: '🍚', description: 'Wok-tossed rice with vegetables' },
    { id: 28, name: 'Chilli Chicken', price: 280, category: 'chinese', rating: 4.5, time: '25-30 min', image: '🌶️', description: 'Spicy chicken with bell peppers' },
    { id: 29, name: 'Spring Rolls', price: 140, category: 'chinese', rating: 4.1, time: '15-20 min', image: '🌯', description: 'Crispy rolls with vegetable filling' },
    { id: 30, name: 'Hot & Sour Soup', price: 120, category: 'chinese', rating: 4.3, time: '10-15 min', image: '🍲', description: 'Tangy soup with mushrooms and tofu' },
    
    // Desserts
    { id: 31, name: 'Gulab Jamun', price: 80, category: 'desserts', rating: 4.6, time: '10-15 min', image: '🍮', description: 'Sweet milk dumplings in syrup' },
    { id: 32, name: 'Rasgulla', price: 70, category: 'desserts', rating: 4.4, time: '10-15 min', image: '⚪', description: 'Spongy cheese balls in sugar syrup' },
    { id: 33, name: 'Kulfi', price: 60, category: 'desserts', rating: 4.5, time: '5-10 min', image: '🍦', description: 'Traditional Indian ice cream' },
    { id: 34, name: 'Jalebi', price: 90, category: 'desserts', rating: 4.3, time: '10-15 min', image: '🌀', description: 'Crispy spiral sweet in syrup' },
    { id: 35, name: 'Kheer', price: 100, category: 'desserts', rating: 4.4, time: '15-20 min', image: '🥣', description: 'Rice pudding with nuts and cardamom' },
    { id: 36, name: 'Rabri', price: 120, category: 'desserts', rating: 4.5, time: '15-20 min', image: '🥛', description: 'Thickened milk with nuts' },
    
    // Beverages
    { id: 37, name: 'Masala Chai', price: 25, category: 'beverages', rating: 4.5, time: '5-10 min', image: '☕', description: 'Spiced tea with milk' },
    { id: 38, name: 'Lassi', price: 60, category: 'beverages', rating: 4.4, time: '5-10 min', image: '🥤', description: 'Yogurt-based drink' },
    { id: 39, name: 'Nimbu Paani', price: 40, category: 'beverages', rating: 4.2, time: '5-10 min', image: '🍋', description: 'Fresh lemon water' },
    { id: 40, name: 'Mango Shake', price: 80, category: 'beverages', rating: 4.6, time: '5-10 min', image: '🥭', description: 'Fresh mango milkshake' },
    { id: 41, name: 'Coconut Water', price: 45, category: 'beverages', rating: 4.3, time: '5-10 min', image: '🥥', description: 'Fresh tender coconut water' },
    { id: 42, name: 'Sugarcane Juice', price: 35, category: 'beverages', rating: 4.4, time: '5-10 min', image: '🌾', description: 'Fresh pressed sugarcane juice' }
  ];

  const filteredItems = foodItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    alert(`Order placed successfully! Total: ₹${getCartTotal() + 50 + Math.round(getCartTotal() * 0.05)}`);
    setCart([]);
    setOrderForm({
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      pincode: '',
      paymentMethod: 'cod'
    });
    setCurrentView('home');
  };

  const HomeView = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => setCurrentView('home')}
                className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors"
              >
                🍴 FoodieExpress
              </button>
              <nav className="hidden md:flex space-x-6">
                <button
                  onClick={() => setCurrentView('home')}
                  className="text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => setCurrentView('menu')}
                  className="text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Menu
                </button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('menu')}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Delicious Food
            <span className="text-orange-600"> Delivered</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience the authentic flavors of India with our wide variety of cuisines. From street food to fine dining, we bring restaurant-quality meals right to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentView('menu')}
              className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
            >
              <span>🍽️</span>
              <span>Explore Menu</span>
            </button>
            <button className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-500 hover:text-white transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose FoodieExpress?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Get your favorite meals delivered in 30-45 minutes with our efficient delivery network.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Food</h3>
              <p className="text-gray-600">We partner with the best restaurants to ensure you get fresh, authentic, and delicious meals.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Best Prices</h3>
              <p className="text-gray-600">Enjoy competitive prices with regular discounts and offers on your favorite dishes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cuisine Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Explore Our Cuisines</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.slice(1).map(category => (
              <div key={category.id} className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Popular Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {foodItems.slice(0, 8).map(item => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-5xl mb-3">{item.image}</div>
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="text-orange-600 font-bold text-xl">₹{item.price}</p>
                <div className="flex items-center justify-center space-x-1 text-yellow-500 mt-2">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm text-gray-600">{item.rating}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => setCurrentView('menu')}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              View Full Menu
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">About FoodieExpress</h2>
          <div className="text-lg text-gray-700 space-y-4">
            <p>
              FoodieExpress is your go-to platform for authentic Indian cuisine and international favorites. We've carefully curated a diverse menu featuring everything from beloved street food to elegant fine dining options.
            </p>
            <p>
              Our mission is to bring the rich flavors of India to your doorstep with convenience, quality, and affordability. Whether you're craving spicy Pav Bhaji, creamy Butter Chicken, or crispy Dosa, we've got you covered.
            </p>
            <p>
              With our user-friendly interface, real-time order tracking, and reliable delivery service, enjoying your favorite meals has never been easier. Join thousands of food lovers who trust FoodieExpress for their daily dining needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">🍴 FoodieExpress</h3>
              <p className="text-gray-400">
                Bringing delicious food to your doorstep with love and care.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Menu</a></li>
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Cuisines</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">North Indian</a></li>
                <li><a href="#" className="hover:text-white">South Indian</a></li>
                <li><a href="#" className="hover:text-white">Street Food</a></li>
                <li><a href="#" className="hover:text-white">Chinese</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span>+91 XXX XXX XXXX</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span>📧</span>
                  <span>info@foodieexpress.com</span>
                </p>
                <p className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span>Available across India</span>
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FoodieExpress. All rights reserved. Made with ❤️ for food lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );

  const MenuView = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-orange-600">🍴 FoodieExpress</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search food items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button
                onClick={() => setCurrentView('cart')}
                className="relative bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>Cart</span>
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    {getCartItemCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 flex flex-col items-center space-y-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-orange-100 text-orange-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{item.image}</span>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm text-gray-600">{item.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-orange-600">₹{item.price}</span>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock size={14} />
                    <span className="text-sm">{item.time}</span>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CartView = () => (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => setCurrentView('menu')}
              className="text-orange-600 hover:text-orange-700 flex items-center space-x-2"
            >
              <span>←</span>
              <span>Back to Menu</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Add some delicious items to get started!</p>
            <button
              onClick={() => setCurrentView('menu')}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{item.image}</span>
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price} each</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-orange-600">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{getCartTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹50</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-orange-600">₹{getCartTotal() + 50}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setCurrentView('checkout')}
                className="w-full mt-6 bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
              >
                <CreditCard size={20} />
                <span>Proceed to Checkout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const CheckoutView = () => (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => setCurrentView('cart')}
              className="text-orange-600 hover:text-orange-700 flex items-center space-x-2"
            >
              <span>←</span>
              <span>Back to Cart</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
              <MapPin size={20} />
              <span>Delivery Details</span>
            </h2>
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={orderForm.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={orderForm.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={orderForm.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  name="address"
                  value={orderForm.address}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={orderForm.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pin Code</label>
                  <input
                    type="text"
                    name="pincode"
                    value={orderForm.pincode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={orderForm.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span>Cash on Delivery</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={orderForm.paymentMethod === 'online'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span>Online Payment</span>
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Truck size={20} />
                <span>Place Order</span>
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{item.image}</span>
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">₹{item.price} × {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t mt-6 pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{getCartTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹50</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>₹{Math.round(getCartTotal() * 0.05)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-orange-600">₹{getCartTotal() + 50 + Math.round(getCartTotal() * 0.05)}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-2 text-orange-700">
                <Clock size={16} />
                <span className="text-sm font-medium">Estimated delivery time: 30-45 minutes</span>
              </div>
              <div className="flex items-center space-x-2 text-orange-700 mt-2">
                <Phone size={16} />
                <span className="text-sm">Contact: +91 XXX XXX XXXX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      {currentView === 'home' && <HomeView />}
      {currentView === 'menu' && <MenuView />}
      {currentView === 'cart' && <CartView />}
      {currentView === 'checkout' && <CheckoutView />}
    </div>
  );
};

export default FoodOrderingApp;