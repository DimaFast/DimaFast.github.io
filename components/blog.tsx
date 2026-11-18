import { ContentCard } from '@/components/content-card'
import { Reveal } from '@/components/reveal'
import { Button, Heading } from '@/components/ui'
import { blog } from '@/lib/site'
import styles from './blog.module.css'

export function Blog({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className={`section${standalone ? ' standalone' : ''}`}>
      <div className="wrap">
        <Heading level={standalone ? 1 : 2}>Блог</Heading>
        <p className="section-description">Корисні матеріали про жіноче здоров’я</p>
        <Reveal className={`catalog-grid ${styles.blogGrid}`}>
          {blog.map((data) => (
            <ContentCard key={data.slug} data={data} kind="blog" />
          ))}
        </Reveal>
        {!standalone && (
          <div className="section-action">
            <Button href="/blog/">Переглянути всі статті</Button>
          </div>
        )}
      </div>
    </section>
  )
}
