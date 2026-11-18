import { Button, Heading } from '@/components/ui'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <section className={`inner-page ${styles.errorPage}`}>
      <div className="wrap inner-content">
        <Heading level={1}>Сторінку не знайдено</Heading>
        <p>Перейдіть до списку лікарів або поверніться на головну.</p>
        <div className="button-row">
          <Button href="/doctors/">Наші лікарі</Button>
          <Button href="/" variant="green">
            На головну
          </Button>
        </div>
      </div>
    </section>
  )
}
