import { Carousel } from '@/components/carousel'
import { Services } from '@/components/services'

export function HomeServices() {
  return (
    <Services carousel={(cards) => <Carousel label="Послуги медичного центру">{cards}</Carousel>} />
  )
}
