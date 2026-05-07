import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  Star, 
  ArrowRight,
  Leaf,
  Truck,
  ShieldCheck,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';

// Product Data with design-matching emojis
const PRODUCTS = [
  {
    id: 1,
    name: "Tomates Orgánicos",
    price: 3.50,
    category: "Verduras",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600",
    rating: 4.8,
    description: "Tomates rojos y jugosos cultivados localmente sin pesticidas.",
    emoji: "🍅"
  },
  {
    id: 2,
    name: "Leche Entera Premium",
    price: 1.90,
    category: "Lácteos",
    image: "https://images.unsplash.com/photo-1550583724-125581cc255b?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    description: "Leche fresca del día, pasteurizada y lista para disfrutar.",
    emoji: "🥛"
  },
  {
    id: 3,
    name: "Pan Artesanal",
    price: 4.20,
    category: "Panadería",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600",
    rating: 4.7,
    description: "Horneado cada mañana con masa madre y granos seleccionados.",
    emoji: "🍞"
  },
  {
    id: 4,
    name: "Huevos de Granja",
    price: 5.50,
    category: "Lácteos",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=600",
    rating: 5.0,
    description: "Media docena de huevos de gallinas libres de pastoreo.",
    emoji: "🥚"
  },
  {
    id: 5,
    name: "Aguacates Hass",
    price: 6.80,
    category: "Frutas",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7bc57?auto=format&fit=crop&q=80&w=600",
    rating: 4.6,
    description: "Aguacates en su punto justo de madurez, cremosos y deliciosos.",
    emoji: "🥑"
  },
  {
    id: 6,
    name: "Miel Silvestre",
    price: 8.50,
    category: "Abarrotes",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    description: "Miel 100% pura recolectada de flores silvestres de la región.",
    emoji: "🍯"
  },
];

const CATEGORIES = ["Todos", "Verduras", "Lácteos", "Panadería", "Frutas", "Abarrotes"];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [cart, setCart] = useState<{ id: number, quantity: number }[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = PRODUCTS.filter(p => 
    (selectedCategory === "Todos" || p.category === selectedCategory) &&
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const addToCart = (id: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartItems = cart.map(item => ({
    ...PRODUCTS.find(p => p.id === item.id)!,
    quantity: item.quantity
  }));

  const totalAmount = cartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsOrderComplete(true);
    
    // Simular envío a AppSheet
    console.log("Enviando pedido a AppSheet...", {
      items: cartItems,
      total: totalAmount,
      date: new Date().toISOString()
    });

    // Pequeño retardo antes de redirigir si el usuario lo desea
    setTimeout(() => {
      // Nota: Aquí podrías redirigir automáticamente si fuera necesario
      // window.location.href = "https://www.appsheet.com/newshortcut/453018ef-4506-4e47-ab4c-d444e2525928";
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-art-bg text-art-primary font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60 mb-0.5">Desde 1994</span>
            <h1 className="text-3xl font-serif italic text-art-heading leading-none">La Cosecha Fresca</h1>
          </div>

          <nav className="hidden lg:flex gap-8 text-xs uppercase tracking-widest font-semibold">
            <a href="#" className="border-b border-art-primary">Inicio</a>
            <a href="#productos" className="opacity-40 hover:opacity-100 transition-opacity">Mercado</a>
            <a href="#nosotros" className="opacity-40 hover:opacity-100 transition-opacity">Nosotros</a>
            <a href="#contacto" className="opacity-40 hover:opacity-100 transition-opacity">Contacto</a>
          </nav>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center bg-white/40 border border-art-primary/10 rounded-full px-4 py-1.5 focus-within:ring-1 ring-art-primary transition-all">
              <Search className="w-4 h-4 opacity-40 mr-2" />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="bg-transparent border-none outline-none text-xs w-32 uppercase tracking-wider"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button className="relative px-6 py-2 bg-art-primary text-art-bg rounded-full text-[11px] font-bold uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-art-primary/10">
              Carrito ({cartCount})
            </button>

            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Success Modal Overlay */}
      <AnimatePresence>
        {isOrderComplete && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-art-primary/60 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative bg-art-bg rounded-[40px] p-12 max-w-lg w-full text-center border border-[#E5E2D9] shadow-2xl"
            >
              <div className="w-20 h-20 bg-art-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <ShieldCheck className="text-white w-10 h-10" />
              </div>
              <h2 className="text-4xl font-serif italic text-art-heading mb-4">¡Pedido Enviado!</h2>
              <p className="text-sm text-art-primary/60 uppercase tracking-widest font-bold mb-8">
                Estamos procesando tu orden artesanal
              </p>
              <div className="bg-white rounded-3xl p-6 mb-8 border border-art-primary/5 text-left">
                <div className="flex justify-between text-xs mb-2 opacity-40 font-bold uppercase tracking-widest">
                  <span>Resumen</span>
                  <span>Total: ${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cartItems.map(item => (
                    <span key={item.id} className="text-2xl" title={item.name}>{item.emoji}</span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <a 
                  href="https://www.appsheet.com/newshortcut/453018ef-4506-4e47-ab4c-d444e2525928"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 bg-art-primary text-art-bg rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  Ver en AppSheet <ArrowRight className="w-4 h-4" />
                </a>
                <button 
                  onClick={() => {
                    setCart([]);
                    setIsOrderComplete(false);
                  }}
                  className="w-full py-4 text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
                >
                  Seguir Comprando
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 z-40 bg-art-bg pt-24 px-12 lg:hidden"
          >
            <div className="flex flex-col gap-8 text-4xl font-serif italic">
              <a href="#" onClick={() => setIsMenuOpen(false)}>Inicio</a>
              <a href="#productos" onClick={() => setIsMenuOpen(false)}>Mercado</a>
              <a href="#nosotros" onClick={() => setIsMenuOpen(false)}>Nosotros</a>
              <a href="#contacto" onClick={() => setIsMenuOpen(false)}>Contacto</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-8 pt-24 pb-8 h-[90vh]">
        <div className="max-w-7xl mx-auto h-full relative rounded-[40px] overflow-hidden bg-art-banner flex items-center p-8 md:p-20 border border-[#E5E2D9]">
          <div className="absolute inset-0 opacity-20 bg-dots"></div>
          
          <div className="relative z-10 max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl md:text-8xl font-serif leading-[1.05] mb-8 text-art-heading">
                Frutos de la tierra, <br />
                <span className="italic">directos a casa.</span>
              </h2>
              <p className="text-xl mb-12 text-[#4A5D4B] leading-relaxed max-w-md">
                Selección premium de abarrotes artesanales y vegetales orgánicos cosechados al amanecer.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#productos" 
                  className="px-10 py-5 bg-art-action text-white rounded-full font-bold uppercase tracking-tighter hover:bg-[#B45309] shadow-xl shadow-orange-900/20 transition-all flex items-center gap-3"
                >
                  Explorar Temporada <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>

          <div className="absolute right-[-50px] top-[-50px] w-[500px] h-[500px] bg-art-accent rounded-full blur-[100px] opacity-30"></div>
          
          <div className="hidden lg:block absolute bottom-12 right-20 text-right">
            <div className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Oferta de Hoy</div>
            <div className="text-4xl font-serif italic text-art-heading">Caja de Cítricos Mix</div>
            <div className="text-2xl font-bold mt-1 text-art-primary">$18.50</div>
          </div>
        </div>
      </section>

      {/* Grid Layout Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Sidebar / Shopping Cart */}
          <section className="md:col-span-4 lg:col-span-3 bg-white rounded-[40px] p-8 shadow-sm border border-[#E5E2D9] h-fit sticky top-24">
            <h3 className="text-2xl font-serif italic mb-8 border-b border-art-bg pb-4">Tu Carrito</h3>
            <div className="flex flex-col gap-6 max-h-[400px] overflow-y-auto no-scrollbar">
              {cartItems.length > 0 ? (
                cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-art-bg rounded-xl flex items-center justify-center text-xl grayscale group-hover:grayscale-0 transition-all">
                      {item.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-xs uppercase tracking-wider leading-tight">{item.name}</div>
                      <div className="text-[10px] opacity-40">Qty: {item.quantity} × ${item.price.toFixed(2)}</div>
                    </div>
                    <div className="font-serif italic text-sm">${(item.price * item.quantity).toFixed(2)}</div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-art-primary/20 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <ShoppingCart className="w-8 h-8 text-art-bg mx-auto mb-4" />
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-30">El carrito está vacío</p>
                </div>
              )}
            </div>
            
            <div className="mt-8 pt-8 border-t border-art-bg">
              <div className="flex justify-between items-center mb-6">
                <span className="uppercase text-[10px] font-bold opacity-40 tracking-widest">Subtotal</span>
                <span className="text-2xl font-serif italic text-art-heading">${totalAmount.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className={`w-full py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-xl transition-all ${
                  cart.length > 0 
                  ? 'bg-art-primary text-art-bg hover:shadow-art-primary/20 hover:scale-[1.02] active:scale-95' 
                  : 'bg-art-primary/10 text-art-primary/20 cursor-not-allowed'
                }`}
              >
                Finalizar Pedido
              </button>
            </div>
          </section>

          {/* Main Product Feed */}
          <section id="productos" className="md:col-span-8 lg:col-span-9 flex flex-col gap-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-4">
              <h2 className="text-4xl font-serif italic text-art-heading">El Mercado</h2>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                      selectedCategory === cat 
                        ? 'bg-art-primary text-art-bg shadow-lg shadow-art-primary/10' 
                        : 'border border-art-primary/10 text-art-primary/60 hover:border-art-primary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="group flex flex-col justify-between h-[420px] bg-white rounded-[40px] p-6 border border-[#E5E2D9] hover:shadow-2xl transition-all"
                  >
                    <div>
                      <div className="flex justify-between mb-4">
                        <span className="text-4xl">{product.emoji}</span>
                        <div className="text-right">
                          <div className="text-[10px] uppercase opacity-40 font-bold tracking-widest">Recolectado</div>
                          <div className="font-serif italic text-sm">{product.category}</div>
                        </div>
                      </div>
                      <div className="h-40 overflow-hidden rounded-[24px] mb-6">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <h4 className="text-xl font-serif italic leading-tight mb-1">{product.name}</h4>
                      <p className="text-[11px] text-art-primary/60 line-clamp-2 uppercase tracking-wide leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-end mt-4">
                      <div className="text-2xl font-bold">
                        ${product.price.toFixed(2)}
                        <span className="text-[10px] font-normal opacity-40 ml-1 italic">/ unidad</span>
                      </div>
                      <button 
                        onClick={() => addToCart(product.id)}
                        className="bg-art-primary text-art-bg w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl hover:bg-art-accent transition-colors shadow-lg active:scale-95"
                      >
                        +
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

        </div>
      </main>

      {/* Featured Section */}
      <section className="bg-art-card py-20 px-8 mb-20 border-y border-[#E5E2D9]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Leaf className="text-art-accent" />
            </div>
            <h3 className="text-2xl font-serif italic">100% Orgánico</h3>
            <p className="text-sm opacity-60">Cultivado bajo los más altos estándares de pureza y respeto al suelo.</p>
          </div>
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Truck className="text-art-action" />
            </div>
            <h3 className="text-2xl font-serif italic">Entrega Artesanal</h3>
            <p className="text-sm opacity-60">Paquetes cuidados con detalle y entregados en menos de 24 horas.</p>
          </div>
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
              <ShieldCheck className="text-blue-400" />
            </div>
            <h3 className="text-2xl font-serif italic">Pago Seguro</h3>
            <p className="text-sm opacity-60">Transacciones protegidas y garantía de frescura en cada compra.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="px-12 pb-12 text-[#2C3E2D]">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-12 border-b border-art-primary/10">
            <div className="flex flex-col gap-4">
              <h2 className="text-5xl font-serif italic text-art-heading">Únete a la Cosecha</h2>
              <p className="uppercase text-[10px] tracking-[0.3em] font-bold opacity-40">Suscríbete para ofertas de temporada</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="TU CORREO @" 
                  className="bg-transparent border-b border-art-primary/20 py-2 outline-none text-xs uppercase tracking-widest w-64 focus:border-art-primary transition-colors"
                />
                <button className="text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">Enviar</button>
              </div>
            </div>
            
            <div className="flex gap-12 text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">
              <div className="flex flex-col gap-2">
                <a href="#" className="hover:text-art-primary transition-colors">Instagram</a>
                <a href="#" className="hover:text-art-primary transition-colors">Facebook</a>
                <a href="#" className="hover:text-art-primary transition-colors">Twitter</a>
              </div>
              <div className="flex flex-col gap-2">
                <span>Horarios:</span>
                <span className="font-normal opacity-60 italic">07:00 — 21:00</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 text-[10px] uppercase tracking-[0.3em] font-bold">
            <div>Envío gratuito en órdenes superiores a $50</div>
            <div>Calle de las Flores 124, Ciudad de México</div>
            <div>© 2024 La Cosecha Fresca</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
