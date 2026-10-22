import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { contacts, hours, rub, type Service } from '../data';
import { useScrollLock } from '../hooks';
import { Icon, MaxIcon } from './Icon';

const days = (() => {
  const out: { date: Date; label: string; sub: string }[] = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    out.push({
      date: d,
      label: i === 0 ? 'Сегодня' : i === 1 ? 'Завтра' : d.toLocaleDateString('ru-RU', { weekday: 'short' }),
      sub: d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }).replace('.', ''),
    });
  }
  return out;
})();
const times = Array.from({ length: hours.close - hours.open - 1 }, (_, i) => `${hours.open + i}:00`);

/** Formats a Russian mobile number as the visitor types: +7 (951) 088-08-08 */
function maskPhone(v: string) {
  let d = v.replace(/\D/g, '');
  if (d.startsWith('8')) d = '7' + d.slice(1);
  if (!d.startsWith('7')) d = '7' + d;
  d = d.slice(0, 11);
  const p = [d.slice(1, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)];
  let out = '+7';
  if (p[0]) out += ` (${p[0]}`;
  if (p[0].length === 3) out += ')';
  if (p[1]) out += ` ${p[1]}`;
  if (p[2]) out += `-${p[2]}`;
  if (p[3]) out += `-${p[3]}`;
  return out;
}

type Props = { open: boolean; onClose: () => void; cart: Service[]; onRemove: (name: string) => void };

/**
 * Booking form. On phones it is a bottom sheet, on desktop a centred dialog.
 * Until a bot is connected, «Отправить» copies the request and opens the shop's MAX chat.
 */
export function Booking({ open, onClose, cart, onRemove }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [car, setCar] = useState('');
  const [day, setDay] = useState(0);
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [open, onClose]);
  useEffect(() => { if (open) setSent(false); }, [open]);

  const total = useMemo(() => cart.reduce((s, x) => s + x.price, 0), [cart]);
  const phoneOk = phone.replace(/\D/g, '').length === 11;

  const message = () => [
    'Здравствуйте! Хочу записаться в автосервис.',
    `Имя: ${name || '—'}`,
    `Телефон: ${phone}`,
    car && `Автомобиль: ${car}`,
    cart.length ? `Работы: ${cart.map(s => s.name).join(', ')} (от ${rub(total)})` : '',
    `Когда: ${days[day].label.toLowerCase()}, ${days[day].sub}${time ? ', ' + time : ''}`,
    note && `Комментарий: ${note}`,
  ].filter(Boolean).join('\n');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!phoneOk) return;
    try { await navigator.clipboard.writeText(message()); } catch { /* clipboard blocked: the request is still shown below */ }
    setSent(true);
  };

  return (
    <div className={`sheet${open ? ' open' : ''}`} aria-hidden={!open}>
      <div className="sheet-backdrop" onClick={onClose} />
      <div className="sheet-panel" role="dialog" aria-modal="true" aria-label="Запись в автосервис">
        <span className="sheet-handle" aria-hidden="true" />
        <button className="sheet-x" onClick={onClose} aria-label="Закрыть"><Icon name="close" /></button>

        {!sent ? (
          <form onSubmit={submit} className="book">
            <h2>Запись на ремонт</h2>
            <p className="muted">Оставьте номер — перезвоним и подтвердим время.</p>

            {cart.length > 0 && (
              <div className="book-cart">
                {cart.map(s => (
                  <span key={s.name} className="book-chip">{s.name}<b>{rub(s.price)}</b>
                    <button type="button" onClick={() => onRemove(s.name)} aria-label={`Убрать ${s.name}`}><Icon name="close" size={14} /></button>
                  </span>
                ))}
                <span className="book-total">от {rub(total)}</span>
              </div>
            )}

            <div className="book-row">
              <label>Имя<input value={name} onChange={e => setName(e.target.value)} placeholder="Как к вам обращаться" autoComplete="name" /></label>
              <label>Телефон*<input value={phone} onChange={e => setPhone(maskPhone(e.target.value))} placeholder="+7 (___) ___-__-__" inputMode="tel" autoComplete="tel" required /></label>
            </div>
            <label>Автомобиль<input value={car} onChange={e => setCar(e.target.value)} placeholder="Например, Kia Rio 2016" /></label>

            <fieldset>
              <legend>День</legend>
              <div className="chips scroll-x">
                {days.map((d, i) => (
                  <button type="button" key={i} className={`chip day${i === day ? ' on' : ''}`} onClick={() => setDay(i)}>{d.label}<small>{d.sub}</small></button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Удобное время</legend>
              <div className="chips times">
                {times.map(t => <button type="button" key={t} className={`chip${t === time ? ' on' : ''}`} onClick={() => setTime(t === time ? '' : t)}>{t}</button>)}
              </div>
            </fieldset>
            <label>Что беспокоит<textarea value={note} onChange={e => setNote(e.target.value)} rows={2} placeholder="Например, стучит спереди справа" /></label>

            <button className="btn btn-y btn-block" disabled={!phoneOk}>Отправить заявку <Icon name="arrow" /></button>
            <p className="book-small">Или сразу: <a href={contacts.phoneHref}>{contacts.phone}</a></p>
          </form>
        ) : (
          <div className="book-done">
            <span className="done-tick"><Icon name="check" size={34} /></span>
            <h2>Заявка готова</h2>
            <p className="muted">Мы скопировали её — откройте чат «Точки» в MAX и вставьте сообщение. Ответим в рабочее время.</p>
            <pre className="book-msg">{message()}</pre>
            <a className="btn btn-max btn-block" href={contacts.max} target="_blank" rel="noreferrer"><MaxIcon size={22} />Открыть MAX</a>
            <a className="btn btn-ghost btn-block" href={contacts.phoneHref}><Icon name="phone" />Позвонить</a>
          </div>
        )}
      </div>
    </div>
  );
}
