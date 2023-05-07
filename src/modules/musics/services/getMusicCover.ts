import { getRemoteAssetURLSync } from '../../../core/services/apiInstance'

export const getMusicCover = (musicAssetbundleName: string) =>
  getRemoteAssetURLSync(
    `music/jacket/${musicAssetbundleName}_rip/${musicAssetbundleName}.webp`,
    undefined,
    'minio'
  )
