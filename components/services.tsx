import type { ReactNode } from "react";
import { ContentCard } from "@/components/content-card";
import { Reveal } from "@/components/reveal";
import { Button, Heading } from "@/components/ui";
import { services } from "@/lib/site";
import styles from "./services.module.css";

export function Services({ carousel }: { carousel?: (cards: ReactNode) => ReactNode }) {
  const standalone = !carousel;
  const cards = services.map((data) => <ContentCard key={data.slug} data={data} kind="service" />);
  return (
    <section className={`section ${styles.servicesSection} ${standalone ? "standalone" : ""}`}>
      <div className="wrap">
        <Heading level={standalone ? 1 : 2}>Наші послуги</Heading>
        <Reveal>
          {carousel ? carousel(cards) : <div className={`catalog-grid ${styles.servicesGrid}`}>{cards}</div>}
        </Reveal>
        {!standalone && <div className="section-action"><Button href="/services/">Переглянути всі послуги</Button></div>}
      </div>
    </section>
  );
}
