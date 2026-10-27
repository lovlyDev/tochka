import { useState } from 'react';
import { contacts } from '../data';
import { useKurskNow, useScrolled, useScrollLock } from '../hooks';
import { Icon, MaxIcon, VkIcon } from './Icon';

const links = [
  ['#prices', 'Цены'],
  ['#services', 'Услуги'],
  ['#why', 'Почему мы'],
  ['#reviews', 'Отзывы'],
  ['#contacts', 'Контакты'],
];

/** The client's logo (pin with gears), recoloured for the dark header: black became white. */
export function Logo() {
  const src = import.meta.env.BASE_URL;
  return (
    <a href="#top" className="logo">
      <img src={`${src}logo-64.png`} srcSet={`${src}logo-64.png 1x, ${src}logo-128.png 2x`} alt="Точка — автосервис" width={159} height={64} />
    </a>
  );
}

export function OpenBadge({ compact }: { compact?: boolean }) {
  const now = useKurskNow();
  const soon = now.open && now.minsLeft <= 60;
  const text = now.open ? (soon ? `Открыто ещё ${now.minsLeft} мин` : 'Открыто до 19:00') : 'Закрыто · откроемся в 9:00';
  return (
    <span className={`open-badge${now.open ? '' : ' off'}`}>
      <i />{compact ? <span>{now.open ? 'Открыто' : 'Закрыто'}</span> : <><span className="ob-full">{text}</span><span className="ob-short">{now.open ? 'Открыто' : 'Закрыто'}</span></>}
    </span>
  );
}

export function Header({ onBook, cartCount }: { onBook: () => void; cartCount: number }) {
  const [menu, setMenu] = useState(false);
  const scrolled = useScrolled(30);
  useScrollLock(menu);

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}${menu ? ' menu-open' : ''}`}>
        <div className="wrap header-inner">
          <Logo />
          <nav className="nav-desk" aria-label="Разделы">
            {links.map(([h, t]) => <a key={h} href={h}>{t}</a>)}
          </nav>
          <div className="header-right">
            <OpenBadge />
            <a className="header-phone" href={contacts.phoneHref}>{contacts.phone}</a>
            <button className="btn btn-y btn-sm header-book" onClick={onBook}>
              Записаться{cartCount > 0 && <span className="count">{cartCount}</span>}
            </button>
            <button className="burger" onClick={() => setMenu(!menu)} aria-label={menu ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menu}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* phone menu: full screen, items slide in one by one */}
      <div className={`mmenu${menu ? ' open' : ''}`} aria-hidden={!menu}>
        <nav>
          {links.map(([h, t], i) => (
            <a key={h} href={h} style={{ transitionDelay: menu ? `${.08 + i * .05}s` : '0s' }} onClick={() => setMenu(false)} tabIndex={menu ? 0 : -1}>{t}<Icon name="arrow" size={20} /></a>
          ))}
        </nav>
        <div className="mmenu-foot">
          <OpenBadge />
          <a href={contacts.phoneHref} className="mmenu-phone" tabIndex={menu ? 0 : -1}>{contacts.phone}</a>
          <p>{contacts.address} · ежедневно 9:00–19:00</p>
          <div className="mmenu-social">
            <a href={contacts.max} target="_blank" rel="noreferrer" tabIndex={menu ? 0 : -1}><MaxIcon size={22} />MAX</a>
            <a href={contacts.vk} target="_blank" rel="noreferrer" tabIndex={menu ? 0 : -1}><VkIcon size={22} />ВКонтакте</a>
          </div>
        </div>
      </div>
    </>
  );
}
