import { getRemoteAssetURLSync } from '../../../core/services/apiInstance'

export const getCharacterBanner = (characterId: number) =>
  getRemoteAssetURLSync(
    `character/character_select_rip/chr_tl_${characterId}.webp`,
    undefined,
    'minio'
  )
