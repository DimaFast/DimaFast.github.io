"use client";

import { Children, useEffect, useId, useState, type KeyboardEvent, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./carousel.module.css";

const options = {
  align: "start",
  slidesToScroll: "auto",
  breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } },
} as const;

export function Carousel({ children, label, variant = "services" }: { children: ReactNode; label: string; variant?: "services" | "reviews" }) {
  const id = useId();
  const [viewportRef, embla] = useEmblaCarousel(options);
  const [active, setActive] = useState(0);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    if (!embla) return;
    function sync() {
      if (!embla) return;
      setActive(embla.selectedScrollSnap());
      setPages(embla.scrollSnapList().length);
    }
    sync();
    embla.on("select", sync).on("reInit", sync);
    return () => {
      embla.off("select", sync).off("reInit", sync);
    };
  }, [embla]);

  function goTo(page: number) {
    if (!embla || pages < 2) return;
    embla.scrollTo((page + pages) % pages);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (pages < 2 || event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) return;
    switch (event.key) {
      case "ArrowLeft": goTo(active - 1); break;
      case "ArrowRight": goTo(active + 1); break;
      default: return;
    }
    event.preventDefault();
  }

  return (
    <div className={variant === "reviews" ? `${styles.carousel} ${styles.carouselReviews}` : styles.carousel} role="region" aria-label={label} onKeyDown={onKeyDown}>
      <div className={embla ? `${styles.carouselViewport} ${styles.carouselReady}` : styles.carouselViewport} id={id} ref={viewportRef}>
        <div className={styles.carouselTrack}>
          {Children.map(children, (slide) => <div className={styles.carouselSlide}>{slide}</div>)}
        </div>
      </div>
      {pages > 1 && (
        <>
          <button className={`${styles.carouselArrow} ${styles.carouselPrev}`} aria-controls={id} type="button" onClick={() => goTo(active - 1)} aria-label="Попередні картки">‹</button>
          <button className={`${styles.carouselArrow} ${styles.carouselNext}`} aria-controls={id} type="button" onClick={() => goTo(active + 1)} aria-label="Наступні картки">›</button>
          <div className={styles.carouselDots} aria-label="Сторінки каруселі">
            {Array.from({ length: pages }, (_, index) => (
              <button key={index} type="button" aria-controls={id} aria-label={`Сторінка ${index + 1}`} aria-current={active === index ? "true" : undefined} onClick={() => goTo(index)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
