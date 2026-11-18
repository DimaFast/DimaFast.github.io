import { ContentCard } from "@/components/content-card";
import { Reveal } from "@/components/reveal";
import { Button, Heading } from "@/components/ui";
import { doctors } from "@/lib/site";
import styles from "./doctors.module.css";

export function Doctors({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className={`section ${styles.doctorsSection} ${standalone ? "standalone" : ""}`}>
      <div className="wrap">
        <Heading level={standalone ? 1 : 2}>Наші лікарі</Heading>
        <p className="section-description">Команда професіоналів із міжнародним досвідом, що ставить у<br className={styles.desktopBreak} /> центрі вашу турботу та здоров’я.</p>
        <Reveal className={`catalog-grid ${styles.doctorsGrid}`}>
          {doctors.map((data) => <ContentCard key={data.slug} data={data} kind="doctor" />)}
        </Reveal>
        <div className="section-action"><Button href="/contacts/">Записатись на прийом</Button></div>
      </div>
    </section>
  );
}
