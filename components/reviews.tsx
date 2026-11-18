import Image from "next/image";
import { Carousel } from "@/components/carousel";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui";
import { reviews } from "@/lib/site";
import styles from "./reviews.module.css";

export function Reviews() {
  return (
    <section className={`section ${styles.reviewsSection}`}>
      <div className="wrap">
        <h2>Відгуки наших пацієнток</h2>
        <p className="section-description">Досвід, яким діляться наші пацієнтки</p>
        <Reveal className={styles.reviewsLayout}>
          <div>
            <p>Ми цінуємо довіру кожної жінки, яка обирає наш медичний центр. Їхні відгуки — це відображення нашого підходу: уважності, професіоналізму та щирої турботи про здоров’я.</p>
            <Button href="/contacts/#form">Залишити відгук</Button>
          </div>
          <Carousel label="Відгуки пацієнток" variant="reviews">
            {reviews.map(({ title, description }) => (
              <figure key={title} className={styles.reviewCard}><figcaption>{title}</figcaption><blockquote>{description}</blockquote><Image src="/media/stars.webp" width={90} height={18} alt="5 із 5" /></figure>
            ))}
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}
