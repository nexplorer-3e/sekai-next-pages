import { getRemoteAssetURLSync } from '../../../core/services/apiInstance'
// used in mustache expression, for convenience we use sync version
export const getMusicCover = (musicAssetbundleName: string) =>
  getRemoteAssetURLSync(
    `music/jacket/${musicAssetbundleName}_rip/${musicAssetbundleName}.webp`,
    undefined,
    'minio'
  )
