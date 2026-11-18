import Image from 'next/image'
import Link from 'next/link'
import type { DoctorProfile } from '@/content/doctor-profiles'
import { ContactForm } from '@/components/contact-form'
import { Reveal } from '@/components/reveal'
import { BreadcrumbData } from '@/components/structured-data'
import { servicesForDoctor } from '@/content/doctor-services'
import { Button } from '@/components/ui'
import { site } from '@/lib/site'
import styles from './doctor-profile.module.css'

export function DoctorProfilePage({ profile, slug }: { profile: DoctorProfile; slug: string }) {
  const { name, patronymic, image, specialty, approach, practice, qualifications } = profile

  const services = servicesForDoctor(slug)

  return (
    <div className={styles.profile}>
      <BreadcrumbData
        section={{ label: 'Лікарі', path: '/doctors/' }}
        page={{ label: name, path: `/${slug}/` }}
      />
      <section className={styles.hero} aria-labelledby="doctor-name">
        <div className="wrap">
          <nav aria-label="Шлях до сторінки" className={styles.breadcrumbs}>
            <Link href="/">Головна</Link>
            <Link href="/doctors/">Лікарі</Link>
            <span aria-current="page">{name}</span>
          </nav>
          <div className={styles.heroGrid}>
            <div className={styles.intro}>
              <div className={styles.specialty}>{specialty}</div>
              <h1 id="doctor-name" className={styles.name}>
                {name} <span>{patronymic}</span>
              </h1>
              <p className={styles.approach}>{approach}</p>
              <div className={styles.heroActions}>
                <Button className={styles.bookButton} href="#appointment">
                  Записатися на прийом <span className={styles.downArrow} aria-hidden="true" />
                </Button>
                <Link className={styles.priceLink} href="/prices/">
                  Переглянути прайс
                </Link>
              </div>
            </div>
            <Image
              className={styles.portrait}
              src={image}
              alt={name}
              width={369}
              height={467}
              preload
            />
          </div>
          <nav aria-label="Розділи профілю" className={styles.sections}>
            <a href="#practice">Напрями роботи</a>
            <a href="#qualifications">{qualifications.title}</a>
            <a href="#appointment">Запис на прийом</a>
          </nav>
        </div>
      </section>

      <div className="wrap">
        <div className={styles.details}>
          <section id="practice" className={styles.practice} aria-labelledby="practice-title">
            <h2 id="practice-title">Напрями роботи</h2>
            <ul className={styles.practiceList}>
              {practice.map(({ title, description }) => (
                <li key={title}>
                  <h3>{title}</h3>
                  {description && <p>{description}</p>}
                </li>
              ))}
            </ul>
            {services.length > 0 && (
              <div className={styles.serviceLinks}>
                <h3>Послуги за цим напрямом</h3>
                <ul>
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link href={`/${service.slug}/`}>{service.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
          <section
            id="qualifications"
            className={styles.qualifications}
            aria-labelledby="qualifications-title"
          >
            <h2 id="qualifications-title">{qualifications.title}</h2>
            <ul>
              {qualifications.items.map(({ title, description }) => (
                <li key={title}>
                  <h3>{title}</h3>
                  {description && <p>{description}</p>}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section
          id="appointment"
          className={styles.appointment}
          aria-labelledby="appointment-title"
        >
          <Reveal className={styles.appointmentPanel}>
            <div className={styles.appointmentInfo}>
              <h2 id="appointment-title">Запис на прийом</h2>
              <p>
                Залиште ім’я та номер телефону. Адміністратор зв’яжеться з вами, щоб узгодити час
                прийому.
              </p>
              <a className={styles.phone} href={`tel:${site.telephone}`}>
                <Image src="/media/phone.webp" alt="" width={18} height={18} />
                {site.phone}
              </a>
              <a className={styles.address} href={site.directions}>
                {site.address} <span className={styles.externalArrow} aria-hidden="true" />
              </a>
            </div>
            <div className={styles.form}>
              <ContactForm mode="callback" doctorName={name} />
            </div>
          </Reveal>
        </section>
        <Link className={styles.backLink} href="/doctors/">
          <span aria-hidden="true">←</span> Усі лікарі
        </Link>
      </div>
    </div>
  )
}
