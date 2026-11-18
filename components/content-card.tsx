import Image from "next/image";
import Link from "next/link";
import { ResponsiveImage } from "@/components/responsive-image";
import type { Card } from "@/lib/site";
import styles from "./content-card.module.css";

export function ContentCard({ data, kind }: { data: Card; kind: "service" | "doctor" | "blog" }) {
  const isService = kind === "service";
  const isDoctor = kind === "doctor";
  const variant = { service: styles.cardService, doctor: styles.cardDoctor, blog: styles.cardBlog }[kind];
  const href = `/${data.slug}/`;
  return (
    <article className={`${styles.contentCard} ${variant}`}>
      <Link className={styles.cardTitleLink} href={href}>
        {isService ? (
          <Image src={data.image} alt="" width={100} height={100} />
        ) : (
          <ResponsiveImage
            src={data.image}
            alt=""
            sizes={isDoctor ? "(max-width: 700px) calc((100vw - 100px) / 2), 308px" : "(max-width: 700px) min(calc(100vw - 66px), 420px), 325px"}
          />
        )}
        <h3>{data.title}</h3>
      </Link>
      <p>{data.description}</p>
      <Link className={styles.cardLink} href={href} aria-label={`${data.title} — детальніше`}>
        {isService ? "Детальніше" : isDoctor ? "Детальніше про лікаря" : "Читати більше"}
      </Link>
    </article>
  );
}
