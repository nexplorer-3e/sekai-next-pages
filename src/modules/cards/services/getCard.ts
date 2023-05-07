import { getRemoteAssetURLSync } from '../../../core/services/apiInstance'

export const getCard = (
  cardAssetbundleName: string,
  afterTraining?: boolean,
  birthday?: boolean
) =>
  getRemoteAssetURLSync(
    `character/member/${cardAssetbundleName}_rip/card_${
      afterTraining && !birthday ? 'after_training' : 'normal'
    }.webp`,
    undefined,
    'minio'
  )
export const getCardCutout = (
  cardAssetbundleName: string,
  afterTraining?: boolean,
  birthday?: boolean
) =>
  getRemoteAssetURLSync(
    `character/member_cutout_trm/${cardAssetbundleName}_rip/${
      afterTraining && !birthday ? 'after_training' : 'normal'
    }.webp`,
    undefined,
    'minio'
  )
export const getCardIcon = (
  cardAssetbundleName: string,
  afterTraining?: boolean,
  birthday?: boolean
) =>
  getRemoteAssetURLSync(
    `thumbnail/chara_rip/${cardAssetbundleName}_${
      afterTraining && !birthday ? 'after_training' : 'normal'
    }.webp`,
    undefined,
    'minio'
  )
