import { useMemo, useState, type CSSProperties } from 'react';
import { alsoDo, brands, categories, contacts, faq, perks, rating, rub, services, type Service } from '../data';
import { useKurskNow } from '../hooks';
import { Icon, MaxIcon, VkIcon } from './Icon';
import { Logo, OpenBadge } from './Header';

const pic = (name: string, alt: string, eager?: boolean) => (
  <picture>
    <source srcSet={`./img/${name}.avif`} type="image/avif" />
    <img src={`./img/${name}.webp`} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
  </picture>
);

/* ---------------- hero ---------------- */
export function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section className="hero" id="top">
      <div className="hero-bg">{pic('hero', '', true)}</div>
      <div className="wrap hero-grid">
        <div className="hero-text">
          <p className="hero-kicker"><Icon name="pin" size={16} />Курск, Кирпичная, 19 · новое место</p>
          <h1>Ремонт и ТО<br /><span>без лишних трат</span></h1>
          <p className="hero-lead">ТО, тормоза, двигатель, ходовая и диагностика для отечественных машин и иномарок. Запчасти в наличии, гарантия на работы.</p>
          <div className="hero-cta">
            <button className="btn btn-y btn-lg" onClick={onBook}>Записаться на ремонт <Icon name="arrow" /></button>
            <a className="btn btn-ghost btn-lg" href="#prices">Смотреть цены</a>
          </div>
        </div>
        <a className="hero-rating" href={contacts.reviews} target="_blank" rel="noreferrer">
          <span className="stars">{[0, 1, 2, 3, 4].map(i => <Icon key={i} name="star" size={18} />)}</span>
          <b>{rating.value}</b>
          <span>{rating.votes} оценок · {rating.reviews} отзыва<br />на Яндекс Картах</span>
        </a>
      </div>
      <div className="hazard" aria-hidden="true" />
    </section>
  );
}

/* ---------------- stats strip ---------------- */
export function Stats() {
  const items = [
    { k: '5.0 ★', v: 'рейтинг на Картах' },
    { k: '177', v: 'оценок клиентов' },
    { k: '9–19', v: 'каждый день' },
    { k: 'от 100 ₽', v: 'простые работы' },
  ];
  return (
    <div className="stats">
      <div className="wrap stats-inner">
        {items.map((x, i) => <div key={i} className="reveal" style={{ '--i': i } as CSSProperties}><b>{x.k}</b><span>{x.v}</span></div>)}
      </div>
    </div>
  );
}

/* ---------------- popular jobs ---------------- */
export function Popular({ onAdd, inCart }: { onAdd: (s: Service) => void; inCart: (n: string) => boolean }) {
  const tiles: { s: Service; img: string; big?: boolean; wide?: boolean }[] = [
    { s: services.find(x => x.name === 'Замена масла в двигателе')!, img: 'oil', big: true },
    { s: services.find(x => x.name === 'Замена передних тормозных колодок')!, img: 'brakes' },
    { s: services.find(x => x.name === 'Диагностика двигателя')!, img: 'diag' },
    { s: services.find(x => x.name === 'Замена сцепления в сборе')!, img: 'gearbox', wide: true },
  ];
  return (
    <section className="section wrap" id="services">
      <div className="head reveal"><div><span className="label">Популярное</span><h2>Чаще всего делаем</h2></div><p>Цены за работу из нашего прайса. Нажмите «+», чтобы добавить в заявку.</p></div>
      <div className="bento">
        {tiles.map(({ s, img, big, wide }, i) => (
          <article key={s.name} className={`tile reveal${big ? ' big' : ''}${wide ? ' wide' : ''}`} style={{ '--i': i } as CSSProperties}>
            {pic(img, s.name)}
            <div className="tile-body">
              <span className="tag">{categories.find(c => c.id === s.cat)!.short}</span>
              <h3>{s.name}</h3>
              <div className="tile-foot">
                <b>{rub(s.price)}</b>
                <button className={`add${inCart(s.name) ? ' on' : ''}`} onClick={() => onAdd(s)} aria-label={inCart(s.name) ? 'Убрать из заявки' : 'Добавить в заявку'}>
                  <Icon name={inCart(s.name) ? 'check' : 'plus'} size={20} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- full price list ---------------- */
export function Prices({ onAdd, inCart }: { onAdd: (s: Service) => void; inCart: (n: string) => boolean }) {
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const list = useMemo(() => services.filter(s => (cat === 'all' || s.cat === cat) && s.name.toLowerCase().includes(q.trim().toLowerCase())), [cat, q]);

  return (
    <section className="prices" id="prices">
      <div className="wrap">
        <div className="head reveal">
          <div><span className="label">Прайс · {services.length} работ</span><h2>Цены на работы</h2></div>
          <p>Цены за работу, без запчастей. Нормочас — от 1 000 ₽. Точную стоимость назовём после осмотра.</p>
        </div>
        <div className="prices-bar">
          <div className="tabs scroll-x" role="tablist">
            <button role="tab" aria-selected={cat === 'all'} className={cat === 'all' ? 'on' : ''} onClick={() => setCat('all')}>Все <small>{services.length}</small></button>
            {categories.map(c => (
              <button key={c.id} role="tab" aria-selected={cat === c.id} className={cat === c.id ? 'on' : ''} onClick={() => setCat(c.id)}>
                <Icon name={c.icon} size={17} />{c.short}<small>{services.filter(s => s.cat === c.id).length}</small>
              </button>
            ))}
          </div>
          <label className="search">
            <Icon name="search" size={18} />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Найти работу: масло, колодки…" />
            {q && <button onClick={() => setQ('')} aria-label="Очистить"><Icon name="close" size={16} /></button>}
          </label>
        </div>
        <ul className="price-list" key={cat + q}>
          {list.map((s, i) => (
            <li key={s.name} style={{ '--i': Math.min(i, 12) } as CSSProperties} className={inCart(s.name) ? 'on' : ''}>
              <button onClick={() => onAdd(s)}>
                <span className="pl-name">{s.name}{s.popular && <em>часто</em>}</span>
                <span className="pl-dots" />
                <b className="pl-price">{rub(s.price)}</b>
                <span className="pl-add"><Icon name={inCart(s.name) ? 'check' : 'plus'} size={18} /></span>
              </button>
            </li>
          ))}
          {!list.length && <li className="pl-empty">Такой работы нет в прайсе — позвоните, подскажем цену.</li>}
        </ul>
        <div className="also reveal">
          <span>Также делаем:</span>
          {alsoDo.map(x => <i key={x}>{x}</i>)}
        </div>
      </div>
    </section>
  );
}

/* ---------------- brands marquee ---------------- */
export function Brands() {
  const row = [...brands, ...brands];
  return (
    <section className="brands" aria-label="Обслуживаем марки">
      <div className="wrap brands-head reveal">
        <span className="label">Марки</span>
        <p>Обслуживаем легковые автомобили: отечественные, корейские, японские, китайские и европейские.</p>
      </div>
      <div className="marquee">
        <ul className="marquee-track">
          {row.map((b, i) => (
            <li key={i} className="brand" aria-hidden={i >= brands.length}>
              {/* relative to the page, so it works both at the site root and under /tochka/ */}
              <img src={`${import.meta.env.BASE_URL}brands/${b.file}`} alt={b.name} loading="lazy" draggable={false} />
              <span>{b.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- how it works ---------------- */
export function Steps({ onBook }: { onBook: () => void }) {
  const steps = [
    { t: 'Заявка', d: 'На сайте, в MAX, ВКонтакте или по телефону.' },
    { t: 'Осмотр', d: 'Находим причину и показываем её вам.' },
    { t: 'Цена', d: 'Называем стоимость до начала работ.' },
    { t: 'Ремонт', d: 'Делаем аккуратно, даём гарантию.' },
    { t: 'Готово', d: 'Забираете машину, платите как удобно.' },
  ];
  return (
    <section className="section wrap steps-sec">
      <div className="head reveal"><div><span className="label">Как это устроено</span><h2>От звонка до ключей</h2></div><p>Без сюрпризов в счёте: вы знаете цену до того, как мы начали.</p></div>
      <ol className="timeline reveal">
        {steps.map((s, i) => (
          <li key={s.t} style={{ '--i': i } as CSSProperties}>
            <span className="tl-dot" aria-hidden="true" />
            <b>{s.t}</b><span>{s.d}</span>
          </li>
        ))}
      </ol>
      <div className="steps-cta reveal"><button className="btn btn-y" onClick={onBook}>Оставить заявку</button><a className="btn btn-ghost" href={contacts.phoneHref}><Icon name="phone" />Позвонить</a></div>
    </section>
  );
}

/* ---------------- why us ---------------- */
export function Why() {
  const icons = ['tag', 'shield', 'box', 'truck', 'coffee', 'card'];
  return (
    <section className="why" id="why">
      <div className="wrap why-grid">
        <div className="why-media reveal">
          {pic('engine', 'Ремонт двигателя')}
          <div className="why-badge"><b>гарантия</b><span>на выполненные работы</span></div>
        </div>
        <div>
          <div className="head reveal"><div><span className="label">Почему мы</span><h2>Почему «Точка»</h2></div></div>
          <ul className="perks">
            {perks.map((p, i) => (
              <li key={p.title} className="reveal" style={{ '--i': i } as CSSProperties}>
                <b>{p.title}</b>
                <span>{p.text}</span>
                <Icon name={icons[i]} size={44} className="perk-ico" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- reviews ---------------- */
export function Reviews() {
  return (
    <section className="section wrap reviews" id="reviews">
      <div className="rev-side reveal">
        <span className="label">Отзывы</span>
        <h2>Что говорят клиенты</h2>
        <div className="rev-score">
          <b>{rating.value}</b>
          <div><span className="stars">{[0, 1, 2, 3, 4].map(i => <Icon key={i} name="star" size={18} />)}</span><small>{rating.votes} оценок · {rating.reviews} отзыва на Яндекс Картах</small></div>
        </div>
        <p className="muted">Настоящие отзывы — подтягиваются прямо с Яндекс Карт.</p>
        <a className="btn btn-ghost" href={contacts.reviews} target="_blank" rel="noreferrer">Все отзывы <Icon name="arrow" /></a>
      </div>
      <div className="rev-widget reveal">
        <iframe title="Отзывы о «Точке» на Яндекс Картах" src={contacts.reviewsWidget} loading="lazy" />
      </div>
    </section>
  );
}

/* ---------------- faq ---------------- */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section wrap faq-sec">
      <div className="faq-grid">
        <div className="faq-side reveal">
          <span className="label">Вопросы</span>
          <h2>Частые вопросы</h2>
          <div className="faq-card">
            <b>Не нашли ответ?</b>
            <p>Позвоните или напишите — ответим в рабочее время.</p>
            <a className="btn btn-y btn-block" href={contacts.phoneHref}><Icon name="phone" />{contacts.phone}</a>
            <a className="btn btn-ghost btn-block" href={contacts.max} target="_blank" rel="noreferrer"><MaxIcon size={20} />Написать в MAX</a>
          </div>
        </div>
        {/* .reveal sits on a static wrapper: React rewrites the item's className on toggle and would drop «in» */}
        <div className="faq reveal">
          {faq.map(([q, a], i) => (
            <div key={q} className={`faq-item${open === i ? ' open' : ''}`}>
              <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>{q}<span className="faq-plus" aria-hidden="true" /></button>
              <div className="faq-body"><p>{a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- contacts ---------------- */
export function Contacts({ onBook }: { onBook: () => void }) {
  const now = useKurskNow();
  const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
  const today = (new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Moscow' })).getDay() + 6) % 7;
  const [x, y] = contacts.coords;
  return (
    <section className="contacts" id="contacts">
      <div className="wrap contacts-grid">
        <div className="reveal">
          <span className="label">Контакты</span>
          <h2>Как доехать</h2>
          <a className="addr" href={contacts.mapsOrg} target="_blank" rel="noreferrer"><Icon name="pin" />{contacts.address}</a>
          <ul className="week">
            {week.map((d, i) => <li key={d} className={i === today ? 'today' : ''}><span>{d}</span><b>9:00 – 19:00</b>{i === today && <em>{now.open ? 'сейчас открыто' : 'сегодня'}</em>}</li>)}
          </ul>
          <div className="contact-btns">
            <a className="cbtn" href={contacts.phoneHref}><span className="cb-ico y"><Icon name="phone" /></span><span><b>{contacts.phone}</b><small>Позвонить</small></span></a>
            <a className="cbtn" href={contacts.max} target="_blank" rel="noreferrer"><span className="cb-ico max"><MaxIcon size={46} /></span><span><b>MAX</b><small>Написать в чат</small></span></a>
            <a className="cbtn" href={contacts.vk} target="_blank" rel="noreferrer"><span className="cb-ico vk"><VkIcon size={22} /></span><span><b>ВКонтакте</b><small>Сообщество</small></span></a>
          </div>
          <button className="btn btn-y btn-block contacts-book" onClick={onBook}>Записаться онлайн</button>
        </div>
        <div className="map reveal">
          <iframe title="«Точка» на карте" src={`https://yandex.ru/map-widget/v1/?ll=${x}%2C${y}&z=16&pt=${x}%2C${y}%2Cpm2ylm&l=map`} loading="lazy" allowFullScreen />
          <a className="map-route" href={`https://yandex.ru/maps/?rtext=~${y}%2C${x}&rtt=auto`} target="_blank" rel="noreferrer"><Icon name="arrow" size={18} />Построить маршрут</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <Logo />
        <p>Автосервис «Точка» · {contacts.address} · ежедневно 9:00–19:00</p>
        <OpenBadge compact />
      </div>
    </footer>
  );
}

/* ---------------- phone bottom bar ---------------- */
export function MobileBar({ onBook, cartCount }: { onBook: () => void; cartCount: number }) {
  return (
    <div className="mbar">
      <a href={contacts.phoneHref} className="mbar-btn" aria-label="Позвонить"><Icon name="phone" size={22} /><span>Звонок</span></a>
      <a href={contacts.max} target="_blank" rel="noreferrer" className="mbar-btn" aria-label="Написать в MAX"><MaxIcon size={24} /><span>MAX</span></a>
      <button className="mbar-main" onClick={onBook}>Записаться{cartCount > 0 && <span className="count">{cartCount}</span>}</button>
    </div>
  );
}
