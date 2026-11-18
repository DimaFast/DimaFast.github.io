import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import styles from "./brand.module.css";

export function Brand({ footer = false, className = "" }: { footer?: boolean; className?: string }) {
  return (
    <Link href="/" className={`${styles.brand} ${footer ? styles.brandFooter : className}`} aria-label={site.name}>
      <Image src="/media/brand-mark.webp" alt="" width={54} height={54} />
      <span>
        <strong>Вербена</strong>
        <small>Медичний центр</small>
      </span>
    </Link>
  );
}
