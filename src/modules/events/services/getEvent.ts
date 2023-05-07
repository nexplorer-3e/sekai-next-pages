import { getRemoteAssetURLSync } from '../../../core/services/apiInstance'

export const getEventBackground = (eventAssetbundleName: string) =>
  getRemoteAssetURLSync(
    `event/${eventAssetbundleName}/screen_rip/bg.webp`,
    undefined,
    'minio'
  )
export const getEventLogo = (eventAssetbundleName: string) =>
  getRemoteAssetURLSync(
    `event/${eventAssetbundleName}/logo_rip/logo.webp`,
    undefined,
    'minio'
  )
export const getEventBanner = (eventAssetbundleName: string) =>
  getRemoteAssetURLSync(
    `home/banner/${eventAssetbundleName}_rip/${eventAssetbundleName}.webp`,
    undefined,
    'minio'
  )
export const getEventCharacter = (eventAssetbundleName: string) =>
  getRemoteAssetURLSync(
    `event/${eventAssetbundleName}/screen_rip/character.webp`,
    undefined,
    'minio'
  )
