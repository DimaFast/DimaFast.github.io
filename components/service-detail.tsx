import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import { Consultation } from '@/components/consultation'
import { BreadcrumbData } from '@/components/structured-data'
import { doctorsForService } from '@/content/doctor-services'
import { Button } from '@/components/ui'
import type { ServicePage } from '@/content/service-details'
import styles from './service-detail.module.css'

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={down ? styles.arrowDown : undefined}
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  )
}

export function ServiceDetailPage({ service }: { service: ServicePage }) {
  const doctors = doctorsForService(service.slug)

  return (
    <article className={styles.page}>
      <BreadcrumbData
        section={{ label: 'Послуги', path: '/services/' }}
        page={{ label: service.title, path: `/${service.slug}/` }}
      />
      <header className={styles.hero}>
        <div className="wrap">
          <nav aria-label="Навігаційний шлях" className={styles.breadcrumbs}>
            <ol>
              <li>
                <Link href="/">Головна</Link>
              </li>
              <li>
                <Link href="/services/">Послуги</Link>
              </li>
              <li aria-current="page">{service.title}</li>
            </ol>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1>{service.title}</h1>
              <p>{service.description}</p>
              <div className={styles.heroActions}>
                <Button href="#service-booking">Записатися</Button>
                <a className={styles.textLink} href="#service-prices">
                  Переглянути ціни <Arrow down />
                </a>
              </div>
            </div>

            <div
              className={`${styles.heroVisual} ${service.photo ? styles.photoVisual : styles.iconVisual}`}
            >
              {service.photo && (
                <Image
                  className={styles.heroPhoto}
                  src={service.photo}
                  fill
                  alt=""
                  sizes="(max-width: 700px) 100vw, (max-width: 1200px) 46vw, 475px"
                  loading="eager"
                  fetchPriority="high"
                />
              )}
              <div className={styles.serviceIcon}>
                <Image src={service.image} width={100} height={100} alt="" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.jumpBar}>
        <nav className={`wrap ${styles.jumpLinks}`} aria-label="На цій сторінці">
          <a href="#service-details">Про послугу</a>
          <a href="#service-prices">Вартість</a>
          <a href="#service-booking">Запис</a>
        </nav>
      </div>

      <div className={`wrap ${styles.content}`}>
        <section
          id="service-details"
          className={styles.details}
          aria-labelledby="service-details-title"
        >
          <h2 id="service-details-title">Про послугу</h2>
          <div className={styles.sectionList}>
            {service.sections.map(({ title, description, items }) => (
              <Reveal key={title} className={styles.section}>
                <h3>{title}</h3>
                {description && <p>{description}</p>}
                {items && (
                  <ul>
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>
          {doctors.length > 0 && (
            <div className={styles.providers}>
              <h3>Лікарі цього напряму</h3>
              <ul>
                {doctors.map(({ slug, name, specialty }) => (
                  <li key={slug}>
                    <Link className={styles.textLink} href={`/${slug}/`}>
                      {name} <Arrow />
                    </Link>
                    <p>{specialty}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <aside id="service-prices" className={styles.prices} aria-labelledby="service-prices-title">
          <h2 id="service-prices-title">Вартість</h2>
          <dl>
            {service.prices.map(({ label, amount }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{amount}</dd>
              </div>
            ))}
          </dl>
          {service.priceNote && <p className={styles.priceNote}>{service.priceNote}</p>}
          <Link className={styles.textLink} href="/prices/">
            Повний прайс <Arrow />
          </Link>
        </aside>
      </div>

      <div id="service-booking" className={styles.booking}>
        <Consultation />
      </div>

      <section className={`wrap ${styles.related}`} aria-labelledby="related-services-title">
        <div className={styles.relatedHeader}>
          <h2 id="related-services-title">Суміжні послуги</h2>
          <Link className={styles.textLink} href="/services/">
            Усі послуги <Arrow />
          </Link>
        </div>
        <div className={styles.relatedGrid}>
          {service.relatedServices.map(({ slug, title, image }) => (
            <Link key={slug} className={styles.relatedCard} href={`/${slug}/`}>
              <Image src={image} width={48} height={48} alt="" />
              <span>{title}</span>
              <Arrow />
            </Link>
          ))}
        </div>
      </section>
    </article>
  )
}
