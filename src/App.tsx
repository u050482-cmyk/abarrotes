import { useState, useEffect, useRef } from 'react';
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
  Twitter,
  Phone,
  Mail,
  Clock,
  MapPin,
  MessageCircle,
  HelpCircle
} from 'lucide-react';

// Product Data with high-quality, reliable images
const PRODUCTS = [
  {
    id: 1,
    name: "Tomates Heirloom",
    price: 3.50,
    category: "Verduras",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    description: "Tomates rojos y jugosos cultivados localmente sin pesticidas.",
    emoji: "🍅"
  },
  {
    id: 2,
    name: "Leche Orgánica",
    price: 1.90,
    category: "Lácteos",
    image: "https://media.istockphoto.com/id/1989575540/es/vector/ilustraci%C3%B3n-de-la-leche.jpg?s=612x612&w=0&k=20&c=mIyxQ5jLkumMBj9yW_Sl7rrlPr4VGpRYhR6Ggmv9RU8=",
    rating: 4.9,
    description: "Leche fresca del día, pasteurizada y de vacas alimentadas con pasto.",
    emoji: "🥛"
  },
  {
    id: 3,
    name: "Pan de Masa Madre",
    price: 4.20,
    category: "Panadería",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    description: "Horneado cada mañana con masa madre y granos seleccionados.",
    emoji: "🍞"
  },
  {
    id: 4,
    name: "Huevos de Granja",
    price: 5.50,
    category: "Lácteos",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&q=80&w=800",
    rating: 5.0,
    description: "Media docena de huevos de gallinas libres de pastoreo.",
    emoji: "🥚"
  },
  {
    id: 5,
    name: "Aguacates Hass",
    price: 6.80,
    category: "Frutas",
    image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?auto=format&fit=crop&q=80&w=800",
    rating: 4.6,
    description: "Aguacates en su punto justo de madurez, cremosos y deliciosos.",
    emoji: "🥑"
  },
  {
    id: 6,
    name: "Miel de Azahar",
    price: 8.50,
    category: "Abarrotes",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCPsuNUTOXcStaTEwF_F9u1znoHH3Nzh2wqw&s",
    rating: 4.9,
    description: "Miel 100% pura recolectada de flores silvestres de la región.",
    emoji: "🍯"
  },
  {
    id: 7,
    name: "Fresas Silvestres",
    price: 4.50,
    category: "Frutas",
    image: "https://i.blogs.es/2e76ad/fresas/500_333.jpeg",
    rating: 4.9,
    description: "Fresas dulces y maduradas al sol, perfectas para desayunos.",
    emoji: "🍓"
  },
  {
    id: 8,
    name: "Espinacas Baby",
    price: 2.80,
    category: "Verduras",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    description: "Hojas tiernas y nutritivas, lavadas y listas para consumir.",
    emoji: "🥬"
  },
  {
    id: 9,
    name: "Queso Artesanal",
    price: 12.50,
    category: "Lácteos",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Jq-ugqYnWkNGBlPprfUl3Yj1_IujU7PE6Q&s",
    rating: 4.9,
    description: "Queso curado de granja con sabor intenso y textura cremosa.",
    emoji: "🧀"
  },
  {
    id: 10,
    name: "Manzanas Gala",
    price: 3.20,
    category: "Frutas",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=800",
    rating: 4.6,
    description: "Manzanas crujientes y dulces, directo del huerto familiar.",
    emoji: "🍎"
  },
  {
    id: 11,
    name: "Café Especial",
    price: 15.90,
    category: "Abarrotes",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800",
    rating: 5.0,
    description: "Granos de café de altura con tueste medio y notas achocolatadas.",
    emoji: "☕"
  },
  {
    id: 12,
    name: "Zanahorias Naranja",
    price: 2.10,
    category: "Verduras",
    image: "https://i.blogs.es/127977/carrots-2387394_1280-1-/1366_2000.jpg",
    rating: 4.7,
    description: "Zanahorias dulces con su rama, cultivadas de forma tradicional.",
    emoji: "🥕"
  }
];

const CATEGORIES = ["Todos", "Verduras", "Lácteos", "Panadería", "Frutas", "Abarrotes"];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [cart, setCart] = useState<{ id: number, quantity: number }[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'form' | 'success'>('idle');
  const [userData, setUserData] = useState({ name: '', address: '', phone: '' });
  const [activeSupportModal, setActiveSupportModal] = useState<'chat' | 'faq' | 'warranty' | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ text: string, sender: 'user' | 'agent' }[]>([
    { text: "¡Hola! 👋 Bienvenido a La Cosecha Fresca. ¿En qué podemos ayudarte hoy?", sender: 'agent' }
  ]);
  const [currentChatMessage, setCurrentChatMessage] = useState("");
  const [isAgentTyping, setIsAgentTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isAgentTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentChatMessage.trim()) return;

    setChatMessages(prev => [...prev, { text: currentChatMessage, sender: 'user' }]);
    const message = currentChatMessage;
    setCurrentChatMessage("");

    // Inteligencia básica del agente
    setIsAgentTyping(true);
    setTimeout(() => {
      setIsAgentTyping(false);
      let response = "";
      const msg = message.toLowerCase();

      if (msg.includes("hola") || msg.includes("buenos días") || msg.includes("buenas tardes")) {
        response = "¡Hola! Un gusto saludarte. ¿Cómo puedo ayudarte con tu mercado hoy? 🥕";
      } else if (msg.includes("pedido") || msg.includes("seguimiento") || msg.includes("cuando llega")) {
        response = "Nuestros pedidos locales en CDMX suelen llegar entre 2 y 4 horas. Si ya realizaste tu compra, puedes rastrearlo con el número que te dimos al final.";
      } else if (msg.includes("fresco") || msg.includes("calidad") || msg.includes("organico")) {
        response = "Trabajamos directamente con agricultores que usan técnicas sostenibles. Si algo no llega perfecto, te lo cambiamos sin costo.";
      } else if (msg.includes("precio") || msg.includes("costo") || msg.includes("barato")) {
        response = "Buscamos el precio más justo tanto para ti como para nuestros productores. ¡Checa nuestra sección de 'Frutas' para las ofertas de temporada!";
      } else if (msg.includes("leche")) {
        response = "Nuestra leche orgánica es de libre pastoreo, pasteurizada y llega fresca todas las mañanas.";
      } else if (msg.includes("miel")) {
        response = "La miel de azahar es 100% pura, sin azúcares añadidos. ¡Es deliciosa!";
      } else if (msg.includes("gracias") || msg.includes("ok")) {
        response = "¡Para eso estamos! Que tengas un excelente día. 😊";
      } else {
        response = "Entiendo. Un especialista de 'La Cosecha Fresca' revisará tu consulta detalladamente y te contactará si es necesario. ¿Hay algo más en lo que pueda apoyarte?";
      }

      setChatMessages(prev => [...prev, { text: response, sender: 'agent' }]);
    }, 1500);
  };

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

  const handleStartCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep('form');
  };

  const handleFinalizeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData.name || !userData.address || !userData.phone) return;
    
    setCheckoutStep('success');
    
    // Simular envío a AppSheet en el backend
    console.log("Pedido confirmado y datos enviados:", {
      user: userData,
      items: cartItems,
      total: totalAmount,
      date: new Date().toISOString()
    });
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
            <a href="#nosotros" className="opacity-40 hover:opacity-100 transition-opacity">Ayuda</a>
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
      
      {/* Checkout/Success Modal */}
      <AnimatePresence>
        {checkoutStep !== 'idle' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-art-primary/60 backdrop-blur-sm" />
            
            {checkoutStep === 'form' ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative bg-art-bg rounded-[40px] p-10 md:p-12 max-w-xl w-full border border-[#E5E2D9] shadow-2xl"
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-2 block">Casi listo</span>
                    <h2 className="text-4xl font-serif italic text-art-heading">Inserta tus datos</h2>
                  </div>
                  <button onClick={() => setCheckoutStep('idle')} className="p-2 hover:bg-art-primary/5 rounded-full">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleFinalizeOrder} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest opacity-60 ml-2">Nombre Completo</label>
                    <input 
                      required
                      type="text" 
                      placeholder="..."
                      className="w-full bg-white border-none rounded-2xl px-6 py-4 text-sm focus:ring-1 ring-art-primary outline-none shadow-sm"
                      value={userData.name}
                      onChange={e => setUserData({...userData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest opacity-60 ml-2">Dirección de Entrega</label>
                    <input 
                      required
                      type="text" 
                      placeholder="..."
                      className="w-full bg-white border-none rounded-2xl px-6 py-4 text-sm focus:ring-1 ring-art-primary outline-none shadow-sm"
                      value={userData.address}
                      onChange={e => setUserData({...userData, address: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest opacity-60 ml-2">Teléfono</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="..."
                      className="w-full bg-white border-none rounded-2xl px-6 py-4 text-sm focus:ring-1 ring-art-primary outline-none shadow-sm"
                      value={userData.phone}
                      onChange={e => setUserData({...userData, phone: e.target.value})}
                    />
                  </div>

                  <div className="pt-6 border-t border-art-primary/5 flex justify-between items-center">
                    <div>
                      <div className="text-[9px] uppercase font-bold opacity-40 tracking-widest">Total a pagar</div>
                      <div className="text-2xl font-serif italic">${totalAmount.toFixed(2)}</div>
                    </div>
                    <button 
                      type="submit"
                      className="px-10 py-5 bg-art-primary text-art-bg rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all"
                    >
                      Realizar Compra
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative bg-art-bg rounded-[40px] p-12 max-w-lg w-full text-center border border-[#E5E2D9] shadow-2xl"
              >
                <div className="w-20 h-20 bg-art-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <Truck className="text-white w-10 h-10" />
                </div>
                <h2 className="text-4xl font-serif italic text-art-heading mb-4">¡Tu compra ya va en camino!</h2>
                <p className="text-sm text-art-primary/60 uppercase tracking-widest font-bold mb-8">
                  Gracias por elegir lo fresco, {userData.name.split(' ')[0]}
                </p>
                
                <div className="bg-white rounded-3xl p-6 mb-10 border border-art-primary/5 text-left">
                  <div className="flex justify-between text-[9px] mb-4 opacity-40 font-bold uppercase tracking-widest border-b border-art-bg pb-2">
                    <span>Detalle del Envío</span>
                    <span>#{Math.floor(Math.random() * 9000) + 1000}</span>
                  </div>
                  <div className="text-xs space-y-2 opacity-70">
                    <p><strong>Dirección:</strong> {userData.address}</p>
                    <div className="flex gap-2 text-2xl pt-2">
                      {cartItems.map(item => (
                        <span key={item.id} title={item.name}>{item.emoji}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    setCart([]);
                    setCheckoutStep('idle');
                    setUserData({ name: '', address: '', phone: '' });
                  }}
                  className="w-full py-5 bg-art-primary text-art-bg rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all"
                >
                  Regresar al Mercado
                </button>
              </motion.div>
            )}
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

      {/* Support Modals */}
      <AnimatePresence>
        {activeSupportModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-art-primary/80 backdrop-blur-md" onClick={() => setActiveSupportModal(null)} />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative bg-art-bg rounded-[40px] p-8 md:p-12 max-w-2xl w-full border border-[#E5E2D9] shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setActiveSupportModal(null)}
                className="absolute top-8 right-8 p-2 hover:bg-art-primary/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {activeSupportModal === 'chat' && (
                <div className="space-y-8 text-art-primary">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-emerald-100">
                          <img 
                            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200" 
                            alt="Agente" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-art-bg rounded-full" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-serif italic text-art-heading">Chat en Vivo</h2>
                        <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Atendido por Elena de Soporte</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-[32px] p-6 h-80 border border-art-primary/5 flex flex-col gap-4 overflow-y-auto no-scrollbar shadow-inner">
                    {chatMessages.map((msg, index) => (
                      <div 
                        key={index}
                        className={`flex gap-3 max-w-[85%] ${msg.sender === 'agent' ? 'self-start' : 'self-end flex-row-reverse'}`}
                      >
                        {msg.sender === 'agent' && (
                          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                            <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=100" alt="Avatar" />
                          </div>
                        )}
                        <div className={`p-4 rounded-2xl text-xs ${
                          msg.sender === 'agent' 
                          ? 'bg-art-bg rounded-tl-none italic' 
                          : 'bg-art-primary text-art-bg rounded-tr-none font-bold'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isAgentTyping && (
                      <div className="flex items-center gap-2 text-[9px] opacity-40 font-bold uppercase tracking-widest ml-11">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                        Elena está escribiendo...
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  <form onSubmit={handleSendMessage} className="flex gap-4">
                    <input 
                      type="text" 
                      value={currentChatMessage}
                      onChange={(e) => setCurrentChatMessage(e.target.value)}
                      placeholder="Escribe tu mensaje..."
                      className="flex-1 bg-white border-none rounded-2xl px-6 py-4 text-sm focus:ring-1 ring-art-primary outline-none shadow-sm"
                    />
                    <button 
                      type="submit"
                      className="w-14 h-14 bg-art-primary text-art-bg rounded-2xl flex items-center justify-center hover:scale-105 transition-transform shadow-xl disabled:opacity-50"
                      disabled={!currentChatMessage.trim()}
                    >
                      <ArrowRight className="w-6 h-6" />
                    </button>
                  </form>
                </div>
              )}

              {activeSupportModal === 'faq' && (
                <div className="space-y-8 text-art-primary">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-48 h-32 rounded-[24px] overflow-hidden shadow-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=400" 
                        alt="FAQ" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-3xl font-serif italic text-art-heading">Centro de Ayuda</h2>
                      <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Respuestas rápidas a tus dudas</p>
                    </div>
                  </div>

                  <div className="space-y-3 max-h-80 overflow-y-auto pr-4 no-scrollbar">
                    {[
                      { q: "¿Cuánto tarda el envío?", a: "Para entregas en CDMX y área metropolitana, el envío se realiza en un lapso de 2 a 4 horas si pides antes de la 1 PM. De lo contrario llega al día siguiente." },
                      { q: "¿Qué métodos de pago aceptan?", a: "Aceptamos tarjetas de crédito Visa, Mastercard y Amex, además de transferencia bancaria y pago contra entrega." },
                      { q: "¿Los productos son realmente orgánicos?", a: "Sí, todos nuestros proveedores cuentan con certificados vigentes de agricultura limpia y sustentable." },
                      { q: "¿Puedo cancelar un pedido?", a: "Las cancelaciones son posibles hasta 30 minutos después de realizar la compra para garantizar la frescura en el envío." }
                    ].map((item, i) => (
                      <div 
                        key={i} 
                        onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                        className={`p-6 rounded-[24px] cursor-pointer transition-all border ${
                          expandedFaq === i ? 'bg-white border-art-primary shadow-lg' : 'bg-white/50 border-art-primary/5 hover:border-art-primary/20'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-sm uppercase tracking-wide">{item.q}</h4>
                          <div className={`w-6 h-6 rounded-full border border-art-primary/10 flex items-center justify-center transition-transform ${expandedFaq === i ? 'rotate-45 bg-art-primary text-art-bg' : ''}`}>
                            +
                          </div>
                        </div>
                        <AnimatePresence>
                          {expandedFaq === i && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="text-xs text-art-primary/60 leading-relaxed italic pt-4 mt-4 border-t border-art-primary/5">
                                {item.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-art-primary/5 text-center">
                    <p className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-40 mb-4">¿No encontraste lo que buscabas?</p>
                    <button 
                      onClick={() => setActiveSupportModal('chat')}
                      className="text-[10px] uppercase tracking-widest font-bold underline hover:text-art-accent"
                    >
                      Habla con un asesor por Chat
                    </button>
                  </div>
                </div>
              )}

              {activeSupportModal === 'warranty' && (
                <div className="space-y-8 text-art-primary">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm relative">
                      <ShieldCheck className="w-8 h-8" />
                      <div className="absolute -top-2 -right-2 bg-art-accent text-white text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">100% Real</div>
                    </div>
                    <div>
                      <h2 className="text-4xl font-serif italic text-art-heading">Compromiso Cosecha</h2>
                      <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Nuestra promesa de frescura extrema</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group p-2 bg-white rounded-[40px] border border-art-primary/5 shadow-sm overflow-hidden">
                      <div className="h-32 rounded-[30px] overflow-hidden mb-4">
                        <img 
                          src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=400" 
                          alt="Cosecha" 
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div className="px-6 pb-4">
                        <h4 className="font-bold text-sm mb-1 uppercase tracking-wider">Frescura 24h</h4>
                        <p className="text-[10px] text-art-primary/60 leading-relaxed italic">Si un producto tiene más de 24 horas de haber sido recolectado, te lo informamos o no se envía.</p>
                      </div>
                    </div>
                    <div className="group p-2 bg-white rounded-[40px] border border-art-primary/5 shadow-sm overflow-hidden">
                      <div className="h-32 rounded-[30px] overflow-hidden mb-4">
                        <img 
                          src="https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&q=80&w=400" 
                          alt="Seguridad" 
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div className="px-6 pb-4">
                        <h4 className="font-bold text-sm mb-1 uppercase tracking-wider">Cero Costo de Cambio</h4>
                        <p className="text-[10px] text-art-primary/60 leading-relaxed italic">Si recibes algo maltratado, el repartidor lo reemplaza en ese mismo instante sin cargos.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-8 bg-art-primary text-art-bg rounded-[32px] text-center shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-3xl" />
                      <p className="text-xl font-serif italic mb-2 relative z-10">"Si no está perfecto, no lo pagas."</p>
                      <p className="text-[9px] uppercase tracking-widest font-bold opacity-40 text-white/60 relative z-10">Nuestra Garantía Inquebrantable</p>
                    </div>

                    <button 
                      onClick={() => {
                        setActiveSupportModal('chat');
                        setChatMessages(prev => [...prev, { text: "Hola Elena, me gustaría aplicar la garantía de frescura en un pedido actual.", sender: 'user' }]);
                        setIsAgentTyping(true);
                        setTimeout(() => {
                          setIsAgentTyping(false);
                          setChatMessages(prev => [...prev, { text: "¡Claro que sí! Con gusto te ayudo con tu garantía. ¿Podrías indicarme tu número de pedido o el producto que no cumplió tus expectativas?", sender: 'agent' }]);
                        }, 1200);
                      }}
                      className="w-full py-5 bg-white border-2 border-art-primary text-art-primary rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-art-primary hover:text-art-bg transition-all flex items-center justify-center gap-4"
                    >
                      <ShieldCheck className="w-5 h-5" /> Aplicar Garantía Ahora
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
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
                    <div className="w-14 h-14 bg-art-bg rounded-xl overflow-hidden group-hover:scale-105 transition-all shadow-inner">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
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
                  <div className="w-16 h-16 bg-art-bg rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-8 h-8 text-art-primary/20" />
                  </div>
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
                onClick={handleStartCheckout}
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

      {/* Customer Support / FAQ Section */}
      <section id="nosotros" className="max-w-7xl mx-auto px-4 sm:px-8 py-32 border-t border-art-primary/5">
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40 mb-4 block">Atención al Cliente</span>
          <h2 className="text-5xl md:text-6xl font-serif italic text-art-heading">Estamos aquí para cuidarte</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            onClick={() => setActiveSupportModal('chat')}
            className="group relative flex flex-col items-center text-center p-10 bg-white rounded-[40px] border border-art-primary/5 hover:shadow-2xl transition-all cursor-pointer"
          >
            <div className="w-full h-48 mb-8 rounded-[30px] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" 
                alt="Soporte Técnico" 
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-14 h-14 bg-art-bg rounded-2xl flex items-center justify-center text-art-primary mb-6 shadow-sm">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif italic mb-4">Chat en Vivo</h3>
            <p className="text-xs text-art-primary/60 uppercase tracking-widest leading-loose">Habla con nuestros expertos en tiempo real para cualquier duda sobre pedidos.</p>
          </div>

          <div 
            onClick={() => setActiveSupportModal('faq')}
            className="group relative flex flex-col items-center text-center p-10 bg-art-primary text-art-bg rounded-[40px] shadow-2xl cursor-pointer"
          >
            <div className="w-full h-48 mb-8 rounded-[30px] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1484863137850-59afccd0759e?auto=format&fit=crop&q=80&w=400" 
                alt="Pedidos" 
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-14 h-14 bg-art-bg/10 rounded-2xl flex items-center justify-center text-art-bg mb-6 shadow-sm backdrop-blur-md">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif italic mb-4">Preguntas Frecuentes</h3>
            <p className="text-xs opacity-60 uppercase tracking-widest leading-loose">Todo lo que necesitas saber sobre envíos, cancelaciones y reembolsos.</p>
          </div>

          <div 
            onClick={() => setActiveSupportModal('warranty')}
            className="group relative flex flex-col items-center text-center p-10 bg-white rounded-[40px] border border-art-primary/5 hover:shadow-2xl transition-all cursor-pointer"
          >
            <div className="w-full h-48 mb-8 rounded-[30px] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1556740734-7f9a2b77d5ed?auto=format&fit=crop&q=80&w=400" 
                alt="Garantía" 
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-14 h-14 bg-art-bg rounded-2xl flex items-center justify-center text-art-primary mb-6 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif italic mb-4">Garantía de Frescura</h3>
            <p className="text-xs text-art-primary/60 uppercase tracking-widest leading-loose">¿Algo no llegó como esperabas? Te lo reponemos sin costo adicional.</p>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-[90] flex flex-col gap-4">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveSupportModal('chat')}
          className="w-16 h-16 bg-art-primary text-art-bg rounded-2xl shadow-2xl flex items-center justify-center hover:bg-art-heading transition-colors"
        >
          <MessageCircle className="w-8 h-8" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-art-primary rounded-full animate-pulse" />
        </motion.button>
      </div>

      {/* Footer */}
      <footer id="contacto" className="px-6 sm:px-12 pb-12 pt-20 bg-art-bg/50 border-t border-art-primary/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Branding */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60 mb-0.5 block">Desde 1994</span>
                <h1 className="text-3xl font-serif italic text-art-heading">La Cosecha Fresca</h1>
              </div>
              <p className="text-sm text-art-primary/60 leading-relaxed italic">
                "Cultivando historias y cosechando salud para tu familia, directamente desde el corazón de la tierra Mexicana."
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-art-primary/5 hover:bg-art-primary hover:text-white transition-all"><Facebook className="w-4 h-4" /></a>
                <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-art-primary/5 hover:bg-art-primary hover:text-white transition-all"><Instagram className="w-4 h-4" /></a>
                <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-art-primary/5 hover:bg-art-primary hover:text-white transition-all"><Twitter className="w-4 h-4" /></a>
              </div>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Contacto & Gestión</h4>
              <ul className="flex flex-col gap-4 text-xs font-medium uppercase tracking-[0.1em] text-art-primary/70">
                <li className="group">
                  <a href="tel:+525587654321" className="flex items-center gap-4 hover:text-art-accent transition-colors">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-art-accent group-hover:scale-110 transition-transform">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      +52 (55) 8765 4321
                    </div>
                  </a>
                </li>
                <li className="group">
                  <a href="mailto:hola@lacosechafresca.com" className="flex items-center gap-4 hover:text-art-action transition-colors">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-art-action group-hover:scale-110 transition-transform">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      hola@lacosechafresca.com
                    </div>
                  </a>
                </li>
                <li className="mt-2">
                  <a 
                    href="https://www.appsheet.com/newshortcut/453018ef-4506-4e47-ab4c-d444e2525928"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group p-2 pr-4 bg-art-primary/5 rounded-2xl hover:bg-art-primary hover:text-white transition-all w-fit"
                  >
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] tracking-widest font-bold">ACCEDER A APPSHEET</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Location with small Map placeholder */}
            <div className="flex flex-col gap-6 col-span-1 md:col-span-2 lg:col-span-1">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Ubicación</h4>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Calle+de+las+Flores+124,+Colonia+Centro,+Ciudad+de+México" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-xs uppercase tracking-wider font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                    Calle de las Flores 124,<br/>
                    Colonia Centro, Ciudad de México
                  </div>
                </div>
                <div className="h-32 bg-[#E5E2D9] rounded-[32px] overflow-hidden contrast-110 opacity-70 border border-white hover:opacity-100 transition-all cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=400" 
                    alt="Mapa" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </a>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col gap-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Boletín</h4>
              <p className="text-xs opacity-60 uppercase tracking-widest leading-loose">Suscríbete para recibir noticias de la cosecha y ofertas exclusivas de fin de semana.</p>
              
              <AnimatePresence mode="wait">
                {!isSubscribed ? (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col gap-3"
                  >
                    <input 
                      type="email" 
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="TU CORREO @" 
                      className="bg-transparent border-b border-art-primary/20 py-3 outline-none text-[10px] uppercase tracking-widest w-full focus:border-art-primary transition-colors text-center"
                    />
                    <button 
                      onClick={() => {
                        if (newsletterEmail && newsletterEmail.includes('@')) {
                          setIsSubscribed(true);
                        }
                      }}
                      className="w-full py-4 bg-art-primary text-art-bg rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-art-heading transition-all shadow-xl shadow-art-primary/10"
                    >
                      Suscribirse
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white border border-art-primary/10 rounded-[24px] p-6 text-center"
                  >
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Truck className="w-5 h-5" />
                    </div>
                    <p className="font-serif italic text-lg mb-1">¡Gracias por unirte!</p>
                    <p className="text-[9px] uppercase tracking-widest font-bold opacity-40">Revisa tu correo pronto</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-art-primary/5 opacity-40 text-[9px] uppercase tracking-[0.3em] font-bold">
            <div className="flex gap-8">
              <a href="#" className="hover:text-art-primary transition-colors">Términos</a>
              <a href="#" className="hover:text-art-primary transition-colors">Privacidad</a>
              <a href="#" className="hover:text-art-primary transition-colors">Cookies</a>
            </div>
            <div>© 2024 La Cosecha Fresca • Hecho con amor por lo natural</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
