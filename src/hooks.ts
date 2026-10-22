import { useEffect, useState } from 'react';
import { hours } from './data';

/** Adds `.in` to every `.reveal` element as it scrolls into view. Re-scans when `dep` changes. */
export function useReveal(dep?: unknown) {
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

/** Hour and minute in Kursk (Moscow time), refreshed every minute. */
export function useKurskNow() {
  const read = () => {
    const parts = new Intl.DateTimeFormat('ru-RU', { hour: 'numeric', minute: 'numeric', hourCycle: 'h23', timeZone: 'Europe/Moscow' }).formatToParts(new Date());
    const get = (t: string) => Number(parts.find(p => p.type === t)?.value ?? 0);
    return { h: get('hour'), m: get('minute') };
  };
  const [now, setNow] = useState(read);
  useEffect(() => {
    const id = setInterval(() => setNow(read()), 60_000);
    return () => clearInterval(id);
  }, []);
  const open = now.h >= hours.open && now.h < hours.close;
  const minsLeft = (hours.close - now.h) * 60 - now.m;
  return { ...now, open, minsLeft };
}

/** True while the page is scrolled past `y` pixels. */
export function useScrolled(y = 20) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const on = () => setS(scrollY > y);
    on();
    addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, [y]);
  return s;
}

/** Locks page scrolling while `on` (for the menu and the booking sheet). */
export function useScrollLock(on: boolean) {
  useEffect(() => {
    if (!on) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [on]);
}
