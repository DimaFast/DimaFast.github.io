import { ContactForm } from '@/components/contact-form'
import { ContactMap } from '@/components/contact-map'
import { Reveal } from '@/components/reveal'
import { Specialties } from '@/components/ui'
import { site, socials } from '@/lib/site'
import styles from './contacts.module.css'

export function Contacts({ standalone = false }: { standalone?: boolean }) {
  const Tag = standalone ? 'h1' : 'h2'
  return (
    <>
      <section className={`${styles.contactsSection}${standalone ? ' standalone' : ''}`}>
        <picture className={styles.contactsBackground} aria-hidden="true">
          <source media="(max-width: 700px)" srcSet="/media/contact-mobile.webp" />
          {/* The art-directed background keeps both original WebP files. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/contact-background.webp"
            width={1440}
            height={818}
            alt=""
            loading={standalone ? 'eager' : 'lazy'}
          />
        </picture>
        <div className="wrap">
          <Reveal className={styles.contactGrid}>
            <div>
              <Specialties />
              <Tag>Контакти</Tag>
              <p className={styles.contactTagline}>
                Ми поруч, коли вам потрібна турбота про здоров’я
              </p>
              <p>
                Зв’яжіться з нами у зручний для вас спосіб або завітайте до медичного центру
                «Вербена». Наша команда допоможе обрати зручний час для консультації та відповість
                на організаційні запитання.
              </p>
              <dl className={styles.contactDetails}>
                <div>
                  <dt>Телефон</dt>
                  <dd>
                    <a href={`tel:${site.telephone}`}>{site.phone}</a>
                  </dd>
                </div>
                <div>
                  <dt>Пошта</dt>
                  <dd>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>Адреса</dt>
                  <dd>
                    <a href={site.directions}>{site.address}</a>
                  </dd>
                </div>
              </dl>
            </div>
            <div id="form" className={styles.contactsForm}>
              <ContactForm mode="message" />
            </div>
          </Reveal>
          <ul className={styles.contactSocials}>
            {socials.map(({ label, href }) => (
              <li key={label}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ContactMap embedUrl={site.map} directionsUrl={site.directions} />
    </>
  )
}
