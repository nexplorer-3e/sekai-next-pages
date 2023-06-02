import { getRemoteAssetURLSync } from '../../../core/services/apiInstance'
// used in mustache expression, for convenience we use sync version
export const getVoiceUrl = (mcId: string, voiceKey: string) =>
  getRemoteAssetURLSync(
    `virtual_live/mc/voice/${mcId}_rip/${voiceKey}.mp3`,
    undefined,
    'minio'
  )
