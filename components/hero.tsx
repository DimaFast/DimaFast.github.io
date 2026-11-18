import Image from "next/image";
import { ResponsiveImage } from "@/components/responsive-image";
import { Button, GoldRule, PhoneButton, Specialties } from "@/components/ui";
import styles from "./hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`wrap ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <div className={styles.heroWordmark}><strong>Вербена</strong><span>Медичний центр</span></div>
          <Specialties />
          <h1 id="hero-title">Онкогінекологія та комплексна гінекологічна допомога</h1>
          <GoldRule />
          <p className={styles.heroDescription}>Від профілактичних оглядів і точної діагностики до лікування гінекологічних та онкологічних захворювань — ми забезпечуємо повний спектр медичної допомоги, поєднуючи сучасні підходи, консультації експертного рівня та турботу команди, якій довіряють пацієнти.</p>
          <div className={styles.heroActions}>
            <Button href="/contacts/">Записатись на прийом</Button>
            <PhoneButton />
          </div>
        </div>
        <div className={styles.heroCollage} aria-hidden="true">
          <div className={`${styles.collagePhoto} ${styles.collageAnastasiia}`}><Image src="/media/anastasiia-profile.webp" alt="" fill loading="eager" fetchPriority="high" /></div>
          <div className={`${styles.collagePhoto} ${styles.collageDiagnostics}`}><ResponsiveImage src="/media/blog-ultrasound.webp" alt="" sizes="(max-width: 700px) 38vw, 220px" /></div>
          <div className={`${styles.collagePhoto} ${styles.collageTeam}`}>
            <Image src="/media/tetiana-profile.webp" alt="" fill loading="lazy" />
            <Image src="/media/anastasiia-profile.webp" alt="" fill loading="lazy" />
          </div>
          <div className={`${styles.collagePhoto} ${styles.collageProcedure}`}><ResponsiveImage src="/media/blog-cytology.webp" alt="" sizes="(max-width: 700px) 41vw, 250px" /></div>
          <div className={`${styles.collagePhoto} ${styles.collageTetiana}`}><Image src="/media/tetiana-profile.webp" alt="" fill loading="lazy" /></div>
        </div>
      </div>
    </section>
  );
}
