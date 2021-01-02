import { Fragment } from 'react'

import { GetStaticProps, NextPage } from 'next'

import { HeadTitle } from '../core/components/headTitle'
import { MusicCard } from '../core/components/musicCard'
import { CardHeading } from '../core/components/cardHeading'
import { CharacterCard } from '../core/components/characterCard'
import { EventCard } from '../core/components/eventCard'

import { Music } from '../@types/Music'
import { Card } from '../@types/Card'
import { Event } from '../@types/Event'

interface Props {
  musics: Music[]
  cards: Card[]
  event: Event
}

const Page: NextPage<Props> = props => {
  const { musics, cards, event } = props

  return (
    <Fragment>
      <HeadTitle title="Home" />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <div className="col-span-1 space-y-4 sm:space-y-6 lg:space-y-8">
          <CardHeading title="Latest music">
            <div className="grid gap-6 grid-cols-2 xl:grid-cols-3">
              {musics.map(music => (
                <MusicCard
                  music={music}
                  key={`music-${music.id}`}
                  disableOverlay
                  sizes="275px"
                  priority
                />
              ))}
            </div>
          </CardHeading>
          <CardHeading title="Latest card">
            <div className="grid gap-4 grid-cols-2">
              {cards.map(card => (
                <CharacterCard
                  key={`card-${card.id}`}
                  card={card}
                  afterTraining={card.rarity >= 3}
                  cardSizes="300px"
                  iconSizes="40px"
                  priority
                />
              ))}
            </div>
          </CardHeading>
        </div>
        <div className="col-span-1 space-y-4 sm:space-y-6 lg:space-y-8">
          <CardHeading title="Latest event">
            <EventCard
              event={event}
              backgroundSizes="600px"
              logoSizes="300px"
              priority
            />
          </CardHeading>
        </div>
      </div>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { sortBy, reverse, slice, first } = await import('lodash')

  const { getMusics } = await import('../core/services/getMusics')
  const { getCards } = await import('../core/services/getCards')
  const { getEvents } = await import('../core/services/getEvents')

  const [musics, cards, events] = await Promise.all([
    getMusics(),
    getCards(),
    getEvents(),
  ])

  // get first 6 latest musics
  const filteredMusics = slice(
    reverse(sortBy(musics, music => music.publishedAt)),
    0,
    6
  )

  // get first 4 latest cards
  const filteredCards = slice(
    reverse(sortBy(cards, card => card.releaseAt)),
    0,
    4
  )

  // get first 4 latest cards
  const filteredEvent = first(reverse(sortBy(events, event => event.startAt)))

  return {
    props: {
      musics: filteredMusics,
      // discard data that will not be rendered
      cards: filteredCards.map(card => ({
        ...card,
        cardParameters: [],
        specialTrainingCosts: [],
      })),
      event: filteredEvent,
    },
  }
}

export default Page
