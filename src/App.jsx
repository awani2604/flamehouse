import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Plus, Minus, Flame, Star, Award, Clock, CheckCircle, Instagram, Twitter, Facebook } from 'lucide-react';

export default function FoodEcommerce() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [scrolled, setScrolled] = useState(false);

  const handleCheckout = () => {
    alert(`Order placed successfully!\nTotal Amount: Rs.${finalTotal.toFixed(2)}`);
    setCart([]);
    setCartOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 1, name: 'Signature Flame Burger', price: 249, category: 'Burgers', rating: 4.9, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop', popular: true },
    { id: 2, name: 'Double Cheese Deluxe', price: 299, category: 'Burgers', rating: 4.8, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=600&fit=crop', popular: true },
    { id: 3, name: 'Crispy Chicken Supreme', price: 199, category: 'Burgers', rating: 4.7, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&h=600&fit=crop', popular: false },
    { id: 4, name: 'Plant Power Burger', price: 179, category: 'Burgers', rating: 4.6, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&h=600&fit=crop', popular: false },
    { id: 5, name: 'Loaded Truffle Fries', price: 149, category: 'Sides', rating: 4.9, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=600&fit=crop', popular: true },
    { id: 6, name: 'Golden Onion Rings', price: 129, category: 'Sides', rating: 4.7, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=600&h=600&fit=crop', popular: false },
    { id: 7, name: 'Ice Cold Soda', price: 49, category: 'Drinks', rating: 4.5, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&h=600&fit=crop', popular: false },
    { id: 8, name: 'Premium Milkshake', price: 99, category: 'Drinks', rating: 4.8, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&h=600&fit=crop', popular: true },
  ];

  const categories = ['All', 'Burgers', 'Sides', 'Drinks'];

  const updateQuantity = (item, delta) => {
    setCart(prevCart => {
      const existing = prevCart.find(c => c.id === item.id);
      if (existing) {
        return prevCart
          .map(c => c.id === item.id ? { ...c, quantity: Math.max(0, c.quantity + delta) } : c)
          .filter(c => c.quantity > 0);
      }
      if (delta > 0) return [...prevCart, { ...item, quantity: 1 }];
      return prevCart;
    });
  };

  const getItemQuantity = (id) => {
    const item = cart.find(c => c.id === id);
    return item ? item.quantity : 0;
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal >= 199 ? 50 : 0;
  const finalTotal = subtotal - discount;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-orange-500/30">
      
      {/* Header */}
      <header className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={(e) => scrollToSection(e, 'home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Flame className="text-white" size={24} />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">FLAMEHOUSE</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {['Home', 'Menu', 'Offers', 'About'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={(e) => scrollToSection(e, link.toLowerCase())} 
                 className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-colors">
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={() => setCartOpen(true)} className="relative p-3 bg-slate-900 border border-slate-800 rounded-2xl hover:border-orange-500/50 transition-all active:scale-95">
              <ShoppingCart size={22} className="text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-3 bg-slate-900 border border-slate-800 rounded-2xl">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="pt-52 pb-20 container mx-auto px-4 text-center">
        <h1 className="text-7xl md:text-9xl font-black text-white leading-none tracking-tighter mb-8">
          CRAVE THE <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">FLAME.</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
          Premium ingredients, wood-fired grilling, and lightning-fast delivery to your doorstep.
        </p>
        <button onClick={(e) => scrollToSection(e, 'menu')} className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-500 hover:text-white transition-all shadow-2xl">
          Order Now
        </button>
      </section>

      {/* Offers Section */}
      <section id="offers" className="py-24 bg-slate-900/40 border-y border-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-16 uppercase tracking-tighter">Deals of the Day</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "₹50 Instant OFF", desc: "On orders above ₹199", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=600&fit=crop" },
              { title: "Free Delivery", desc: "No minimum order today", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&h=600&fit=crop" },
              { title: "Combo Special", desc: "Save 20% on Family Packs", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop" }
            ].map((off, i) => (
              <div key={i} className="group bg-slate-900 rounded-[32px] overflow-hidden border border-slate-800 hover:border-orange-500/30 transition-all duration-500">
                <div className="h-48 overflow-hidden">
                  <img src={off.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-black text-white mb-2">{off.title}</h3>
                  <p className="text-slate-500 text-sm mb-6">{off.desc}</p>
                  <button onClick={(e) => scrollToSection(e, 'menu')} className="w-full py-4 rounded-2xl border border-slate-700 font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-slate-950 transition-all">Claim Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">The Menu</h2>
          <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-slate-500 hover:text-white'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.filter(i => activeCategory === 'All' || i.category === activeCategory).map(item => {
            const qty = getItemQuantity(item.id);
            return (
              <div key={item.id} className="group bg-slate-900/50 border border-slate-900 rounded-[40px] p-5 hover:border-slate-700 transition-all duration-300 flex flex-col">
                <div className="relative h-52 mb-6 overflow-hidden rounded-[32px]">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-slate-950/60 backdrop-blur-md text-orange-500 text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1 border border-white/10">
                    <Star size={12} className="fill-orange-500" /> {item.rating}
                  </div>
                </div>
                <div className="flex-1 px-2">
                  <h3 className="font-bold text-white mb-1 group-hover:text-orange-500 transition-colors">{item.name}</h3>
                  <p className="text-slate-500 text-[10px] mb-6 uppercase tracking-widest font-black">{item.category}</p>
                </div>
                <div className="flex justify-between items-center px-2 mt-auto">
                  <span className="text-xl font-black text-white leading-none">Rs.{item.price}</span>
                  <div className="flex items-center">
                    {qty === 0 ? (
                      <button onClick={() => updateQuantity(item, 1)} className="bg-white text-slate-950 p-3.5 rounded-2xl hover:bg-orange-500 hover:text-white transition-all shadow-xl active:scale-90">
                        <Plus size={18} />
                      </button>
                    ) : (
                      <div className="flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700 shadow-inner">
                        <button onClick={() => updateQuantity(item, -1)} className="p-1.5 text-slate-400 hover:text-white transition-colors"><Minus size={14} /></button>
                        <span className="w-6 text-center font-black text-white text-xs">{qty}</span>
                        <button onClick={() => updateQuantity(item, 1)} className="p-1.5 text-orange-500 hover:scale-110 transition-transform"><Plus size={14} /></button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 border-t border-slate-900 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-left">
              <div>
                <h4 className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs mb-4">Our Heritage</h4>
                <h2 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                  WE DON'T JUST COOK. <br/> WE <span className="text-orange-500">IGNITE.</span>
                </h2>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed">
                Founded in 2018, Flamehouse was born out of a simple obsession: the perfect char. 
                We believe that real flavor comes from the interaction of fire, wood, and premium 
                hand-selected ingredients. 
              </p>
              <div className="grid grid-cols-2 gap-8 py-4">
                <div>
                  <h5 className="text-3xl font-black text-white">100%</h5>
                  <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Grass-Fed Beef</p>
                </div>
                <div>
                  <h5 className="text-3xl font-black text-white">30 Min</h5>
                  <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Delivery Promise</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { icon: <CheckCircle size={18}/>, text: "Sourced from local organic farms" },
                  { icon: <CheckCircle size={18}/>, text: "Signature secret spice wood-blend" },
                  { icon: <CheckCircle size={18}/>, text: "Never frozen, always handcrafted" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                    <span className="text-orange-500">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-[48px] overflow-hidden border border-slate-800 rotate-2 hover:rotate-0 transition-transform duration-700">
                <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=1000&fit=crop" alt="Chef grilling" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -inset-4 bg-orange-600/20 blur-3xl rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-16">
        <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-8">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center"><Flame className="text-white" size={20} /></div>
                <span className="text-xl font-black text-white tracking-tighter">FLAMEHOUSE</span>
            </div>
            <p className="text-slate-600 text-xs font-bold uppercase tracking-[0.3em]">© 2026 Flamehouse. Built for Flavour.</p>
        </div>
      </footer>

      {/* Cart Sidebar */}
      {cartOpen && (
        <>
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-50" onClick={() => setCartOpen(false)}></div>
          <div className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-slate-900 z-[60] flex flex-col shadow-2xl border-l border-slate-800 animate-slide-in">
            <div className="p-8 flex justify-between items-center border-b border-slate-800">
              <h2 className="text-xl font-black text-white uppercase tracking-tighter">Your Bag</h2>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-slate-800 rounded-xl transition text-slate-500 hover:text-white"><X /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-700 space-y-4">
                  <ShoppingCart size={64} strokeWidth={1} />
                  <p className="text-xs font-black uppercase tracking-widest">Bag is empty</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center bg-slate-950/40 p-4 rounded-[24px] border border-slate-800/50">
                    <img src={item.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-xs">{item.name}</h4>
                      <p className="text-orange-500 font-black text-sm mt-1">Rs.{item.price}</p>
                    </div>
                    <div className="flex items-center bg-slate-900 rounded-xl border border-slate-800">
                      <button onClick={() => updateQuantity(item, -1)} className="p-2 text-slate-500 hover:text-white"><Minus size={12}/></button>
                      <span className="w-6 text-center font-black text-white text-xs">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item, 1)} className="p-2 text-orange-500"><Plus size={12}/></button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-8 bg-slate-950/50 border-t border-slate-800 space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-slate-400 font-semibold">
                    <span>Subtotal</span>
                    <span>Rs.{subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400 font-bold">
                      <span>Applied Offer</span>
                      <span>- Rs.50</span>
                    </div>
                  )}
                  <div className="border-t border-slate-800 my-2"></div>
                  <div className="flex justify-between text-2xl font-black text-white">
                    <span>Total</span>
                    <span className="text-orange-500">Rs.{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
                {/* Fixed Checkout Button */}
                <button 
                  onClick={handleCheckout} 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 shadow-xl shadow-orange-600/20"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </>
      )}

      <style>{`
        @keyframes slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-slide-in { animation: slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
}