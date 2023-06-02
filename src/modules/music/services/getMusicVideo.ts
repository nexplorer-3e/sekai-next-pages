import { MusicCategory } from '../../../@types/MusicCategory'
import { getRemoteAssetURLSync } from '../../../core/services/apiInstance'
// used in mustache expression, for convenience we use sync version
export const getMusicVideo = (
  musicId: number,
  musicCategories: MusicCategory
) => {
  const mode =
    musicCategories === 'original'
      ? 'original_mv'
      : musicCategories === 'mv_2d'
      ? 'sekai_mv'
      : ''
  const paddedMusicId = String(musicId).padStart(4, '0')

  return getRemoteAssetURLSync(
    `live/2dmode/${mode}/${paddedMusicId}_rip/${paddedMusicId}.mp4`,
    undefined
  )
}
