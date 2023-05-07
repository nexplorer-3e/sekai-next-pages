import { getRemoteAssetURLSync } from '../../../core/services/apiInstance'

export const getNameLabelHorizontal = (characterId: string | number) =>
  getRemoteAssetURLSync(
    `character/label_rip/chr_h_lb_${characterId}.webp`,
    undefined,
    'minio'
  )
export const getNameLabelVertical = (characterId: string | number) =>
  getRemoteAssetURLSync(
    `character/label_vertical_rip/chr_v_lb_${characterId}.webp`,
    undefined,
    'minio'
  )
