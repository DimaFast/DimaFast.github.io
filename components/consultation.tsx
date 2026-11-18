import { ContactForm } from '@/components/contact-form'
import { Reveal } from '@/components/reveal'
import { Button, Specialties } from '@/components/ui'
import { benefits, site } from '@/lib/site'
import styles from './consultation.module.css'

const consultationText =
  'Залиште свої контакти, і наш адміністратор зв’яжеться з вами найближчим часом, щоб відповісти на запитання та допомогти записатися на прийом у зручний для вас час.'

export function Consultation({ withBenefits = false }: { withBenefits?: boolean }) {
  return (
    <section
      className={`${styles.consultationSection}${withBenefits ? ` ${styles.consultationWithBenefits}` : ''}`}
      aria-labelledby="quick-consultation"
    >
      <div className="wrap">
        <Reveal className={styles.consultationPanel}>
          <div>
            <h2 id="quick-consultation">Швидка консультація</h2>
            <p>{consultationText}</p>
            <p>Або зателефонуйте нам прямо зараз.</p>
            <a className={styles.contactValue} href={`tel:${site.telephone}`}>
              {site.phone}
            </a>
          </div>
          <ContactForm mode="callback" />
        </Reveal>
        {withBenefits && (
          <div className={styles.benefits}>
            <Specialties />
            <h2>Чому обирають «Вербену»</h2>
            <Reveal className={styles.benefitGrid}>
              <p className={styles.benefitIntro}>
                Ми створили простір, де сучасна медицина поєднується з повагою, делікатністю та
                довірою. Тут важливі не лише точні діагнози, а й ваш комфорт, спокій та впевненість
                у кожному рішенні.
              </p>
              {benefits.map(({ title, description }) => (
                <article key={title} className={styles.benefitCard}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </Reveal>
            <div className="section-action">
              <Button href="/services/">Детальніше про послуги</Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
