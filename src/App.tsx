import { useCallback, useState } from 'react';
import { type Service } from './data';
import { useReveal } from './hooks';
import { Header } from './components/Header';
import { Booking } from './components/Booking';
import { Brands, Contacts, Faq, Footer, Hero, MobileBar, Popular, Prices, Reviews, Stats, Steps, Why } from './components/Sections';
import { Icon } from './components/Icon';

export default function App() {
  const [cart, setCart] = useState<Service[]>([]);
  const [booking, setBooking] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  useReveal();

  const inCart = useCallback((name: string) => cart.some(s => s.name === name), [cart]);
  const toggle = (s: Service) => {
    const had = inCart(s.name);
    setCart(c => (had ? c.filter(x => x.name !== s.name) : [...c, s]));
    setToast(had ? null : s.name);
    if (!had) window.setTimeout(() => setToast(t => (t === s.name ? null : t)), 2400);
  };
  const remove = (name: string) => setCart(c => c.filter(x => x.name !== name));
  const openBooking = () => { setToast(null); setBooking(true); };

  return (
    <>
      <Header onBook={openBooking} cartCount={cart.length} />
      <main>
        <Hero onBook={openBooking} />
        <Stats />
        <Popular onAdd={toggle} inCart={inCart} />
        <Prices onAdd={toggle} inCart={inCart} />
        <Brands />
        <Steps onBook={openBooking} />
        <Why />
        <Reviews />
        <Faq />
        <Contacts onBook={openBooking} />
      </main>
      <Footer />
      <MobileBar onBook={openBooking} cartCount={cart.length} />

      {/* «added to request» toast with a shortcut to the form */}
      <div className={`toast${toast ? ' on' : ''}`} role="status">
        <Icon name="check" size={18} />
        <span>Добавлено: <b>{toast}</b></span>
        <button onClick={openBooking}>В заявку · {cart.length}</button>
      </div>

      <Booking open={booking} onClose={() => setBooking(false)} cart={cart} onRemove={remove} />
    </>
  );
}
