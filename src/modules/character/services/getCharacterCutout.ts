import { getRemoteAssetURLSync } from '../../../core/services/apiInstance'

export const getCharacterCutout = (characterId: string | number) =>
  getRemoteAssetURLSync(
    `character/trim_rip/chr_trim_${characterId}.webp`,
    undefined,
    'minio'
  )
