import Image from "next/image";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { navigation, site, socials } from "@/lib/site";
import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.footerGrid}`}>
        <div>
          <h2>Контакти</h2>
          <ul className={styles.footerContacts}>
            <li><a href={site.directions}>⌖&nbsp; {site.address}</a></li>
            <li><a href={`tel:${site.telephone}`}>☎&nbsp; {site.phone}</a></li>
            <li><a href={`mailto:${site.email}`}>✉&nbsp; {site.email}</a></li>
          </ul>
          <div className={styles.socialIcons}>
            {socials.map(({ label, href, image }) => (
              <a key={label} href={href} aria-label={label}><Image src={`/media/${image}.webp`} width={32} height={32} alt="" /></a>
            ))}
          </div>
        </div>
        <div>
          <h2>Категорії</h2>
          <nav aria-label="Меню внизу сторінки" className={styles.footerLinks}>
            {navigation.map(({ href, label }) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
        </div>
        <Brand footer />
      </div>
      <div className={styles.footerBottom}>{site.name}</div>
    </footer>
  );
}
