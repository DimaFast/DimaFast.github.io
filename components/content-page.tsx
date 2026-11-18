import Image from 'next/image'
import { Consultation } from '@/components/consultation'
import { Button, Heading } from '@/components/ui'
import type { DetailPage, TextBlock } from '@/lib/site'
import styles from './content-page.module.css'

function ProseBlock({ block }: { block: TextBlock }) {
  if (Array.isArray(block.text)) {
    const List = block.type === 'ol' ? 'ol' : 'ul'
    return (
      <List>
        {block.text.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </List>
    )
  }
  const Tag =
    block.type === 'h2' && block.text.length < 140
      ? 'h2'
      : block.type === 'h3' || block.type === 'h4'
        ? 'h3'
        : 'p'
  return <Tag>{block.text}</Tag>
}

export function ContentPage({ page }: { page: DetailPage }) {
  const editorial = page.kind === 'editorial'
  return (
    <>
      <section className={`inner-page ${editorial ? styles.editorialPage : ''}`}>
        <div className="wrap inner-content">
          <article className={styles.prose}>
            <Heading level={1}>{page.heading}</Heading>
            {editorial && page.image && (
              <Image
                className={styles.editorialImage}
                src={page.image}
                width={300}
                height={page.image.endsWith('article-surgery.webp') ? 200 : 169}
                alt=""
              />
            )}
            {page.blocks.map((block, index) => (
              <ProseBlock key={index} block={block} />
            ))}
            {!editorial && (
              <div className={`button-row ${styles.innerActions}`}>
                <Button href="/contacts/#form">Консультація</Button>
                <Button href="/prices/" variant="green">
                  Прайс
                </Button>
              </div>
            )}
          </article>
        </div>
      </section>
      {!editorial && <Consultation />}
    </>
  )
}
