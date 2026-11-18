import { Consultation } from "@/components/consultation";
import { Heading } from "@/components/ui";
import { prices } from "@/content/pricing";
import styles from "./prices.module.css";

export function Prices() {
  const [header, ...rows] = prices;
  return (
    <>
      <section className="inner-page">
        <div className="wrap inner-content">
          <Heading level={1}>Прайс</Heading>
          <table className={styles.priceTable}>
            <caption className="visually-hidden">Прайс медичного центру «Вербена»</caption>
            <thead><tr>{header.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
            <tbody>
              {rows.map(([service, price]) => price ? (
                <tr key={service}><th scope="row">{service}</th><td>{price}</td></tr>
              ) : (
                <tr key={service} className={styles.priceCategory}><td colSpan={2}>{service}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Consultation />
    </>
  );
}
