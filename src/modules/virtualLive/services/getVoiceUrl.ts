import { getRemoteAssetURLSync } from '../../../core/services/apiInstance'

export const getVoiceUrl = (mcId: string, voiceKey: string) =>
  getRemoteAssetURLSync(
    `sekai-assets/virtual_live/mc/voice/${mcId}_rip/${voiceKey}.mp3`,
    undefined,
    'minio'
  )
