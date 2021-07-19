import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'

import { getMusicCover } from '../../../modules/musics/services/getMusicCover'

import { Music } from '../../../@types/Music'
import { MusicDifficulty } from '../../../@types/MusicDifficulty'
import { MusicTag } from '../../../@types/MusicTag'
import { MusicVocal } from '../../../@types/MusicVocal'
import { Unit } from '../../../@types/Unit'
import { UnitProfile } from '../../../@types/UnitProfile'
import { Difficulty } from '../../../@types/Difficulty'
import { getUnitBanner } from '../../../modules/characters/services/getUnitBanner'
import { CharacterStack } from '../../../core/components/characterStack'

interface Props {
  music: Music
  difficulties: MusicDifficulty[]
  tags: MusicTag[]
  vocals: MusicVocal[]
  unitProfiles: Unit[]
}

const getDifficultyActiveColor = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'easy':
      return 'text-green-700 bg-green-100'
    case 'normal':
      return 'text-indigo-700 bg-indigo-100'
    case 'hard':
      return 'text-yellow-700 bg-yellow-100'
    case 'expert':
      return 'text-red-700 bg-red-100'
    case 'master':
      return 'text-purple-700 bg-purple-100'
  }
}

const Page: NextPage<Props> = props => {
  const { music, difficulties, unitProfiles, vocals } = props

  return (
    <div className="flex flex-col h-full">
      <div className="h-full flex items-center">
        <div className="grid grid-cols-5 gap-8 px-10">
          <div className="col-span-2">
            <Image
              src={getMusicCover(music.assetbundleName)}
              className="rounded-lg"
              width={429}
              height={429}
            />
          </div>
          <div className="col-span-3 space-y-2 pt-4 md:pt-0">
            <h1 className="text-5xl font-bold text-gray-900 font-noto">{music.title}</h1>
            <div className="flex space-x-4 flex-wrap py-4">
              {unitProfiles.map(unit => (
                <div key={`music-unit-${unit}`} className="w-36">
                  <Image src={getUnitBanner(unit)} width={620} height={260} />
                </div>
              ))}
            </div>
            <div className="flex space-x-4">
              {vocals.map(vocal => (
                <div className="border border-gray-300 bg-gray-100 rounded-md px-4 py-2" key={`vocal-${vocal.id}`}>
                  <CharacterStack characterIds={vocal.characters.map(o => o.characterId)} size='lg' />
                </div>
              ))}
            </div>
            <div className="py-4">
              <h2 className="text-xl text-gray-900 font-noto"><span className="font-semibold">Composer:</span> {music.composer}</h2>
              <h2 className="text-xl text-gray-900 font-noto"><span className="font-semibold">Arranger:</span> {music.arranger}</h2>
              <h2 className="text-xl text-gray-900 font-noto"><span className="font-semibold">Lyricist:</span> {music.lyricist}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="h-32 flex justify-evenly">
        {difficulties.map(difficulty => (
          <div className="flex items-center align-center" key={`music-difficulty-${difficulty.id}`}>
          <div
            className={`${getDifficultyActiveColor(
              difficulty.musicDifficulty
            )} text-center px-6 py-3 font-medium leading-5 rounded-md`}
            key={`music-difficulty-${difficulty.id}`}
          >
            <p className="font-bold font-noto">{difficulty.musicDifficulty.toLocaleUpperCase()}</p>
            <p className="text-md text-lg font-noto">{difficulty.playLevel}</p>
          </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const { sortBy } = require('lodash')

  const { getMusics } = await import('../../../core/services/getMusics')
  const { getMusicDifficulties } = await import(
    '../../../core/services/getMusicDifficulties'
  )
  const { getMusicTags } = await import('../../../core/services/getMusicTags')
  const { getMusicVocals } = await import(
    '../../../core/services/getMusicVocals'
  )
  const { getUnitProfiles } = await import(
    '../../../core/services/getUnitProfiles'
  )

  const { getTargetUnitProfile } = await import(
    '../../../modules/music/services/getTargetUnitProfile'
  )

  // const { uniq } = require('lodash')

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
      music: targetMusic,
      difficulties: targetDifficulties,
      tags: targetTags,
      vocals: targetVocals,
      unitProfiles: targetUnitProfiles.map(unitProfile => unitProfile.unit),
    },
  }
}

export default Page