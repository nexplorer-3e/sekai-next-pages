import { getRemoteAssetURLSync } from '../../../core/services/apiInstance'
// used in mustache expression, for convenience we use sync version
export const getAudioShort = (musicVocalAssetbundleName: string) =>
  getRemoteAssetURLSync(
    `music/short/${musicVocalAssetbundleName}_rip/${musicVocalAssetbundleName}_short.mp3`,
    undefined
  )
export const getAudioFull = (musicVocalAssetbundleName: string) =>
  getRemoteAssetURLSync(
    `music/long/${musicVocalAssetbundleName}_rip/${musicVocalAssetbundleName}.mp3`,
    undefined
  )
