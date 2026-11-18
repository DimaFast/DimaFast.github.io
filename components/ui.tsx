import type { PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function Button({ href, children, variant = "gold", className = "" }: PropsWithChildren<{ href: string; variant?: "gold" | "green"; className?: string }>) {
  const classes = `button button-${variant} ${className}`;
  return href.startsWith("/") ? <Link className={classes} href={href}>{children}</Link> : <a className={classes} href={href}>{children}</a>;
}

export function Heading({ children, level = 2 }: PropsWithChildren<{ level?: 1 | 2 }>) {
  const Tag = level === 1 ? "h1" : "h2";
  return <Tag className="section-heading">{children}</Tag>;
}

export function Specialties() {
  return (
    <ul className="specialties" aria-label="Напрями медичного центру">
      {["Гінекологія", "Онкологія", "УЗД", "Хірургія"].map((label) => <li key={label}>{label}</li>)}
    </ul>
  );
}

export function GoldRule() {
  return <div className="gold-rule" aria-hidden="true" />;
}

export function AppointmentButtons({ primaryOnly = false }: { primaryOnly?: boolean }) {
  return (
    <div className="button-row">
      <Button href="/contacts/">Записатись на прийом</Button>
      {!primaryOnly && <Button href="/contacts/#form" variant="green">Отримати консультацію</Button>}
    </div>
  );
}

export function PhoneButton() {
  return (
    <a href={`tel:${site.telephone}`} className="button button-gold phone-button" aria-label={`Зателефонувати ${site.phone}`}>
      <Image src="/media/phone.webp" width={22} height={22} alt="" />
    </a>
  );
}
