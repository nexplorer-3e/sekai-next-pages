import { Fragment } from 'react'

import { NextPage, GetStaticProps, GetStaticPaths } from 'next'

import { HeadTitle } from '../../core/components/headTitle'

import { Card } from '../../@types/Card'

interface Props {
  card: Card
}

const Page: NextPage<Props> = props => {
  const { card } = props

  return (
    <Fragment>
      <HeadTitle title={card.prefix} />
      <div className="p-8 text-sm text-gray-900">{JSON.stringify(props)}</div>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { getCards } = await import('../../core/services/getCards')

  const targetId = Number(context.params.id)

  const cards = await getCards()
  const targetCard = cards.find(card => card.id === targetId)

  return {
    props: {
      card: targetCard,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getCards } = await import('../../core/services/getCards')

  const cards = await getCards()

  return {
    paths: cards.map(card => ({
      params: {
        id: card.id.toString(),
      },
    })),
    fallback: false,
  }
}

export default Page
