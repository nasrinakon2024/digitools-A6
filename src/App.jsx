import { useState, useEffect } from 'react' // useEffect যোগ করা হয়েছে

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // cart স্টেট যোগ করা হয়েছে
  const [activeTab, setActiveTab] = useState('products'); // activeTab স্টেট যোগ করা হয়েছে

  // ১. JSON ডাটা লোড করার লজিক
  useEffect(() => {
    fetch('/products.json')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  // ২. কার্টে অ্যাড করার ফাংশন
  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  // ৩. কার্ট থেকে আইটেম রিমুভ করার ফাংশন (চ্যালেঞ্জ পার্ট)
  const handleRemoveFromCart = (index) => {
    const itemToRemove = cart[index];
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    
    // রিমুভ অ্যালার্ট
    toast.error(`${itemToRemove.name} removed from cart! 🗑️`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  // ৪. চেকআউট প্রসেড করার ফাংশন (চ্যালেঞ্জ পার্ট)
  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      toast.warning("Your cart is empty! 🛒");
    } else {
      toast.info("Proceeding to checkout... 💳", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    
    <div className="min-h-screen bg-white font-sans">
      
      
      {/* 🧭 Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-3xl font-bold text-[#6F00FF]">DigiTools</div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-[#6F00FF]">Products</a>
            <a href="#" className="hover:text-[#6F00FF]">Features</a>
            <a href="#" className="hover:text-[#6F00FF]">Pricing</a>
            <a href="#" className="hover:text-[#6F00FF]">Testimonials</a>
            <a href="#" className="hover:text-[#6F00FF]">FAQ</a>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer p-2">
               <img src="/assets/products/shopping-cart.png" alt="Cart" className="w-6 h-6" />
               <span className="absolute top-0 right-0 bg-[#6F00FF] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                 {cart.length} {/* cartCount এর বদলে cart.length ব্যবহার করা হয়েছে */}
               </span>
            </div>
            <button className="text-sm font-semibold text-gray-700">Login</button>
            <button className="btn bg-[#6F00FF] hover:bg-black text-white rounded-full px-6 border-none normal-case">Get Started</button>
          </div>
        </div>
      </nav>

      {/* 🎯 Banner Section */}
      <main className="pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-[#F3EEFE] text-[#6F00FF] text-xs px-4 py-2 rounded-full font-400">
              <span className="w-2 h-2 bg-[#6F00FF] rounded-full"></span>
              New: AI-Powered Tools Available
            </div>
            <h1 className="text-5xl md:text-5xl font-extrabold bg-gradient-to-r from-[#6F00FF] via-[#9D44FF] to-[#101727] bg-clip-text text-transparent leading-tight">
  Supercharge Your <br /> Digital Workflow
</h1>
            <p className="text-gray-600 text-lg leading-relaxed mt-4">
              Access premium AI tools, design assets, templates, and productivity
software—all in one place. Start creating faster today. <br />

Explore Products

            </p>
            <div className="flex items-center gap-4 mt-8">
              <button className="btn bg-[#6F00FF] hover:bg-black text-white rounded-full px-8 border-none normal-case">Explore Products</button>
              <button className="flex items-center gap-2 text-[#6F00FF] font-bold hover:underline">
                <img src="/assets/Play.png" alt="Play" className="w-4 h-5" />
                Watch Demo
              </button>
            </div>
          </div>
          <div className="bg-[#F3EEFE] rounded-3xl p-6 flex justify-center items-center">
            <img src="/assets/banner.png" alt="Banner Graphics" className="w-full h-auto max-w-md drop-shadow-2xl" />
          </div>
        </div>
      </main>

   {/* 🛠 Premium Digital Tools Section */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#101727] mb-4">Premium Digital Tools</h2>
          <p className="text-gray-500 mb-8 max-w-2xl mx-auto text-lg">
            Choose from our curated collection of premium digital products designed to boost your productivity and creativity.
          </p>
          
          {/* Tabs */}
          <div className="inline-flex bg-gray-100 p-1.5 rounded-full mb-10 border border-gray-200">
            <button 
              onClick={() => setActiveTab('products')} 
              className={`px-10 py-2.5 rounded-full font-bold transition-all duration-300 ${activeTab === 'products' ? 'bg-[#6F00FF] text-white shadow-md' : 'text-gray-500'}`}
            >
              Products
            </button>
            <button 
              onClick={() => setActiveTab('cart')} 
              className={`px-10 py-2.5 rounded-full font-bold transition-all duration-300 ${activeTab === 'cart' ? 'bg-[#6F00FF] text-white shadow-md' : 'text-gray-500'}`}
            >
              Cart ({cart.length})
            </button>
          </div>
        </div>

        {/* ১. Product Grid */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group bg-white border border-gray-100 p-8 rounded-[32px] shadow-sm hover:shadow-xl transition-all flex flex-col h-full items-start text-left relative">
                <div className="absolute top-6 right-6">
                  <span className="bg-[#F3EEFE] text-[#6F00FF] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{product.tag}</span>
                </div>
                <div className="w-14 h-14 bg-[#F3EEFE] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <img src={product.icon} alt={product.name} className="w-8 h-8 object-contain" />
                </div>
                <div className="flex-grow w-full">
                  <h3 className="text-xl font-bold text-[#101727] mb-2">{product.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{product.description}</p>
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#101727]">${product.price}</span>
                    <span className="text-sm font-medium text-gray-400">/{product.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {product.features?.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => handleAddToCart(product)} 
                  className="w-full py-4 bg-[#6F00FF] hover:bg-[#101727] text-white font-bold rounded-2xl transition-all shadow-md active:scale-95"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ২. Cart List (Screenshot 41 অনুযায়ী) */}
        {activeTab === 'cart' && (
          <div className="max-w-4xl mx-auto mb-20">
            <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-[#101727] mb-8">Your Cart</h3>
              {cart.length === 0 ? (
                <div className="text-center py-10"><p className="text-gray-400 font-medium">Your cart is empty! 🛒</p></div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-5 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          <img src={item.icon} alt={item.name} className="w-8 h-8 object-contain" />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#101727]">{item.name}</h4>
                          <p className="text-[#6F00FF] font-bold text-sm">${item.price}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleRemoveFromCart(index)} 
                        className="text-pink-500 font-bold text-xs hover:underline uppercase tracking-widest"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="pt-8 mt-8 border-t border-gray-100 flex justify-between items-center px-2">
                    <span className="text-gray-400 font-medium">Total:</span>
                    <span className="text-3xl font-bold text-[#101727]">
                      ${cart.reduce((total, item) => total + item.price, 0)}
                    </span>
                  </div>
                  <button 
  onClick={handleProceedToCheckout} // এই লাইনটি ঠিকভাবে আছে কি না দেখো
  className="w-full py-5 bg-[#6F00FF] hover:bg-black text-white font-bold rounded-2xl mt-8 transition-all uppercase tracking-widest text-sm"
>
  Proceed To Checkout
</button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
      
      {/* 📊 Stats Section */}
      <section className="bg-[#6F00FF] py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-around items-center text-center gap-8">
          <div><h2 className="text-4xl font-bold text-white">50K+</h2><p className="text-purple-100 text-sm opacity-80">Active Users</p></div>
          <div className="h-12 w-[1px] bg-white opacity-20 hidden md:block"></div>
          <div><h2 className="text-4xl font-bold text-white">200+</h2><p className="text-purple-100 text-sm opacity-80">Premium Tools</p></div>
          <div className="h-12 w-[1px] bg-white opacity-20 hidden md:block"></div>
          <div><h2 className="text-4xl font-bold text-white">4.9</h2><p className="text-purple-100 text-sm opacity-80">Rating</p></div>
        </div>
      </section>

      {/* 🚀 Get Started In 3 Steps Section (এই অংশটি ঠিক এখানে বসাও) */}
      <section className="py-24 bg-white px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#101727] mb-4">Get Started In 3 Steps</h2>
          <p className="text-gray-400 mb-16">Start using premium digital tools in minutes, not hours.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bg-white border border-gray-100 p-10 rounded-[32px] shadow-sm hover:shadow-md transition-all relative group">
              <span className="absolute top-6 right-8 bg-[#6F00FF] text-white text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full shadow-lg">01</span>
              <div className="w-24 h-24 bg-[#F3EEFE] rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                <img src="/assets/user.png" alt="Create Account" className="w-12 h-12 object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-[#101727] mb-4">Create Account</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Sign up for free in seconds. No credit card required to get started.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-gray-100 p-10 rounded-[32px] shadow-sm hover:shadow-md transition-all relative group">
              <span className="absolute top-6 right-8 bg-[#6F00FF] text-white text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full shadow-lg">02</span>
              <div className="w-24 h-24 bg-[#F3EEFE] rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                <img src="/assets/package.png" alt="Choose Products" className="w-12 h-12 object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-[#101727] mb-4">Choose Products</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Browse our catalog and select the tools that fit your needs.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-gray-100 p-10 rounded-[32px] shadow-sm hover:shadow-md transition-all relative group">
              <span className="absolute top-6 right-8 bg-[#6F00FF] text-white text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full shadow-lg">03</span>
              <div className="w-24 h-24 bg-[#F3EEFE] rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                <img src="/assets/rocket.png" alt="Start Creating" className="w-12 h-12 object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-[#101727] mb-4">Start Creating</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Download and start using your premium tools immediately.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 💰 Simple, Transparent Pricing Section */}
<section className="py-24 bg-gray-50 px-4">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-4xl md:text-5xl font-bold text-[#101727] mb-4">Simple, Transparent Pricing</h2>
    <p className="text-gray-500 mb-16">Choose the plan that fits your needs. Upgrade or downgrade anytime.</p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
      
      {/* Starter Plan */}
      <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm text-left flex flex-col h-full">
        <h3 className="text-2xl font-bold text-[#101727] mb-2">Starter</h3>
        <p className="text-gray-400 text-sm mb-6">Perfect for getting started</p>
        <div className="mb-8">
          <span className="text-5xl font-bold text-[#101727]">$0</span>
          <span className="text-gray-400">/Month</span>
        </div>
        <ul className="space-y-4 mb-10 flex-grow">
          {['Access to 10 free tools', 'Basic templates', 'Community support', '1 project per month'].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              {item}
            </li>
          ))}
        </ul>
        <button className="w-full py-4 bg-[#6F00FF] hover:bg-black text-white font-bold rounded-2xl transition-all">Get Started Free</button>
      </div>

      {/* Pro Plan (Most Popular) */}
      <div className="bg-[#6F00FF] p-10 rounded-[32px] shadow-xl text-left flex flex-col h-full relative transform scale-105 z-10">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFD700] text-[#101727] text-[10px] font-bold px-4 py-1 rounded-full uppercase">Most Popular</div>
        <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
        <p className="text-purple-100 text-sm mb-6 opacity-80">Best for professionals</p>
        <div className="mb-8">
          <span className="text-5xl font-bold text-white">$29</span>
          <span className="text-purple-100">/Month</span>
        </div>
        <ul className="space-y-4 mb-10 flex-grow">
          {['Access to all premium tools', 'Unlimited templates', 'Priority support', 'Unlimited projects', 'Cloud sync', 'Advanced analytics'].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-white">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              {item}
            </li>
          ))}
        </ul>
        <button className="w-full py-4 bg-white hover:bg-gray-100 text-[#6F00FF] font-bold rounded-2xl transition-all">Start Pro Trial</button>
      </div>

      {/* Enterprise Plan */}
      <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm text-left flex flex-col h-full">
        <h3 className="text-2xl font-bold text-[#101727] mb-2">Enterprise</h3>
        <p className="text-gray-400 text-sm mb-6">For teams and businesses</p>
        <div className="mb-8">
          <span className="text-5xl font-bold text-[#101727]">$99</span>
          <span className="text-gray-400">/Month</span>
        </div>
        <ul className="space-y-4 mb-10 flex-grow">
          {['Everything in Pro', 'Team collaboration', 'Custom integrations', 'Dedicated support', 'SLA guarantee', 'Custom branding'].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              {item}
            </li>
          ))}
        </ul>
        <button className="w-full py-4 bg-[#6F00FF] hover:bg-black text-white font-bold rounded-2xl transition-all">Contact Sales</button>
      </div>

    </div>
  </div>
</section>

{/* 💜 Ready To Transform Section (CTA) */}
<section className="py-24 bg-[#6F00FF] px-4 overflow-hidden relative">
  {/* Background Decorative Circles */}
  <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>

  <div className="max-w-4xl mx-auto text-center relative z-10">
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
      Ready To Transform Your Workflow?
    </h2>
    <p className="text-purple-100 text-lg mb-10 opacity-90 max-w-2xl mx-auto">
      Join thousands of professionals who are already using Digitools to work smarter. Start your free trial today.
    </p>

    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
      <button 
        onClick={() => setActiveTab('products')} 
        className="px-10 py-4 bg-white text-[#6F00FF] font-bold rounded-full hover:bg-gray-100 transition-all shadow-xl active:scale-95"
      >
        Explore Products
      </button>
      <button className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#6F00FF] transition-all active:scale-95">
        View Pricing
      </button>
    </div>

    <div className="flex flex-wrap justify-center gap-6 text-purple-200 text-sm opacity-80">
      <span className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
        14-day free trial
      </span>
      <span className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
        No credit card required
      </span>
      <span className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
        Cancel anytime
      </span>
    </div>
  </div>
</section>

{/* 🌑 Footer Section */}
<footer className="bg-[#0B0F19] text-white pt-20 pb-10 px-4">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
      
      {/* Brand & Description */}
      <div className="lg:col-span-1">
        <h2 className="text-3xl font-bold mb-6">DigiTools</h2>
        <p className="text-gray-400 leading-relaxed max-w-xs">
          Premium digital tools for creators, professionals, and businesses. Work smarter with our suite of powerful tools.
        </p>
      </div>

      {/* Product Links */}
      <div>
        <h4 className="text-lg font-bold mb-6">Product</h4>
        <ul className="space-y-4 text-gray-400">
          <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
        </ul>
      </div>

      {/* Company Links */}
      <div>
        <h4 className="text-lg font-bold mb-6">Company</h4>
        <ul className="space-y-4 text-gray-400">
          <li><a href="#" className="hover:text-white transition-colors">About</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
        </ul>
      </div>

      {/* Resources & Social Links */}
      <div>
        <h4 className="text-lg font-bold mb-6">Resources</h4>
        <ul className="space-y-4 text-gray-400 mb-8">
          <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
        </ul>
        
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#6F00FF] transition-all">
            <img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" className="w-5 h-5 invert" alt="Insta" />
          </a>
          <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#6F00FF] transition-all">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" className="w-5 h-5 invert" alt="FB" />
          </a>
          <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#6F00FF] transition-all">
            <img src="https://cdn-icons-png.flaticon.com/512/3256/3256013.png" className="w-5 h-5 invert" alt="X" />
          </a>
        </div>
      </div>
    </div>

    {/* Bottom Footer */}
    <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
      <p>© 2026 Digitools. All rights reserved.</p>
      <div className="flex gap-8">
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-white transition-colors">Cookies</a>
      </div>
    </div>
  </div>
</footer>

    </div>
  )

  
}

export default App;