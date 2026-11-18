import { ResponsiveImage } from "@/components/responsive-image";
import { Reveal } from "@/components/reveal";
import { AppointmentButtons, GoldRule, Specialties } from "@/components/ui";
import { about } from "@/lib/site";
import styles from "./about.module.css";

export function About({ standalone = false }: { standalone?: boolean }) {
  const Tag = standalone ? "h1" : "h2";
  return (
    <section className={`${styles.aboutSection}${standalone ? " standalone" : ""}`}>
      <div className="wrap">
        <Reveal className={styles.aboutLayout}>
          <div className={styles.aboutCopy}>
            <Specialties />
            <Tag>Про медичний центр «Вербена»</Tag>
            <GoldRule />
            <div>{about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <AppointmentButtons />
          </div>
          <ResponsiveImage
            className={styles.aboutTeam}
            src="/media/verbena-doctors-together.webp"
            sizes="(max-width: 700px) min(calc(100vw - 36px), 420px), (max-width: 1200px) 45vw, 547px"
            alt="Тетяна П’ятницька та Анастасія Шендера, лікарки медичного центру «Вербена»"
          />
        </Reveal>
        <Reveal className={styles.aboutFacts}>
          <article><h3>Міжнародний досвід</h3><p>Наші лікарі проходили стажування за кордоном, володіють іноземними мовами та застосовують світові стандарти та сучасні протоколи у щоденній практиці.</p></article>
          <article><h3>Постійний розвиток</h3><p>Ми регулярно вдосконалюємо знання та навички, впроваджуємо новітні технології та підходи для максимально ефективного лікування.</p></article>
          <article><h3>Безпека та ефективність</h3><p>Ми поєднуємо доказову медицину з максимально щадними методами лікування, створюючи комфортне та безпечне середовище для кожної пацієнтки.</p></article>
        </Reveal>
      </div>
    </section>
  );
}
