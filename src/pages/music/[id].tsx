import { Fragment, useMemo } from 'react'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { HeadTitle } from '../../core/components/headTitle'
import { MusicDetail } from '../../modules/music/components/detail'
import { getAudioFull } from '../../modules/music/services/getAudio'
import { getMusicCover } from '../../modules/musics/services/getMusicCover'

import { Music } from '../../@types/Music'
import { MusicDifficulty } from '../../@types/MusicDifficulty'
import { MusicVocal } from '../../@types/MusicVocal'
import { Unit } from '../../@types/Unit'
import { UnitProfile } from '../../@types/UnitProfile'
import { getRemoteAssetURLSync } from '../../core/services/apiInstance'

interface Props {
  music: Pick<
    Music,
    | 'id'
    | 'categories'
    | 'title'
    | 'composer'
    | 'assetbundleName'
    | 'lyricist'
    | 'arranger'
    | 'publishedAt'
  >
  difficulties: Pick<
    MusicDifficulty,
    'id' | 'musicDifficulty' | 'playLevel' | 'noteCount'
  >[]
  vocals: Pick<
    MusicVocal,
    'id' | 'caption' | 'characters' | 'assetbundleName'
  >[]
  unitProfiles: Unit[]
}

const Page: NextPage<Props> = props => {
  const { music, vocals } = props

  const { query } = useRouter()
  const uniqueArtists = useMemo(
    () => Array.from(new Set([music.composer, music.arranger, music.lyricist])),
    []
  )

  return (
    <Fragment>
      <HeadTitle title={music.title} disableOg>
        <meta property="og:type" content="music.song" />
        <meta property="og:title" content={`${music.title} · セカイ Wiki`} />
        <meta
          property="og:url"
          content={getRemoteAssetURLSync(`/music/${query.id}`, undefined)}
        />
        <meta
          property="og:image"
          content={getRemoteAssetURLSync(
            `/api/og/music/${query.id}`,
            undefined
          )}
        />
        <meta
          property="og:audio"
          content={getAudioFull(vocals[0].assetbundleName)}
        />
        <meta
          property="music:album"
          content={getMusicCover(music.assetbundleName)}
        />
        {uniqueArtists.map(artist => (
          <meta property="music:musician" content={artist} />
        ))}

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={getRemoteAssetURLSync(`/music/${query.id}`)}
        />
        <meta
          property="twitter:title"
          content={`${music.title} · セカイ Wiki`}
        />
        <meta
          property="twitter:description"
          content="Data explorer for Project Sekai Colorful Stage"
        />
      </HeadTitle>
      <MusicDetail {...props} />
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { sortBy, pick } = require('lodash')

  const { getMusics } = await import('../../core/services/getMusics')
  const { getMusicDifficulties } = await import(
    '../../core/services/getMusicDifficulties'
  )
  const { getMusicTags } = await import('../../core/services/getMusicTags')
  const { getMusicVocals } = await import('../../core/services/getMusicVocals')
  const { getUnitProfiles } = await import(
    '../../core/services/getUnitProfiles'
  )

  const { getTargetUnitProfile } = await import(
    '../../modules/music/services/getTargetUnitProfile'
  )

  const targetId = Number(context.params.id)

  const musics = await getMusics()
  const targetMusic = musics.find(music => music.id === targetId)

  // mass data grinding
  const [difficulties, tags, vocals, unitProfiles] = await Promise.all([
    getMusicDifficulties(),
    getMusicTags(),
    getMusicVocals(),
    getUnitProfiles(),
  ])

  // filter by music id
  const targetDifficulties = difficulties.filter(
    difficulty => difficulty.musicId === targetId
  )
  const targetTags = tags.filter(tag => tag.musicId === targetId)
  const targetVocals = vocals.filter(vocal => vocal.musicId === targetId)
  const targetUnitProfiles: UnitProfile[] = sortBy(
    getTargetUnitProfile(targetTags, unitProfiles),
    'seq'
  )

  return {
    props: {
      music: pick(targetMusic, [
        'id',
        'categories',
        'title',
        'composer',
        'assetbundleName',
        'lyricist',
        'arranger',
        'publishedAt',
      ]),
      difficulties: targetDifficulties.map(o =>
        pick(o, ['id', 'musicDifficulty', 'playLevel', 'noteCount'])
      ),
      vocals: [
        ...targetVocals.filter(o => o.musicVocalType === 'sekai'),
        ...targetVocals.filter(o => o.musicVocalType !== 'sekai'),
      ].map(o => pick(o, ['id', 'caption', 'characters', 'assetbundleName'])),
      unitProfiles: targetUnitProfiles.map(unitProfile => unitProfile.unit),
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getMusics } = await import('../../core/services/getMusics')

  const musics = await getMusics()

  return {
    paths: musics.map(music => ({
      params: {
        id: music.id.toString(),
      },
    })),
    fallback: false,
  }
}

export default Page
