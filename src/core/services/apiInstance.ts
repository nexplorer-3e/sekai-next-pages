import axios from 'axios'
import moize from 'moize'
import { AssetDomainKey, ServerRegion } from '../../@types/Assets'

export const assetUrl = {
  cn: {
    cn: 'https://sekai-cn-assets-1258184166.file.myqcloud.com',
    comic: 'https://sekai-comics-1258184166.file.myqcloud.com',
    en: 'https://sekai-en-assets-1258184166.file.myqcloud.com',
    jp: 'https://sekai-assets-1258184166.file.myqcloud.com',
    kr: 'https://sekai-kr-assets-1258184166.cos.ap-shanghai.myqcloud.com',
    musicChart: 'https://sekai-music-charts-1258184166.file.myqcloud.com',
    tw: 'https://sekai-tc-assets-1258184166.file.myqcloud.com',
  },
  minio: {
    cn: 'https://storage.sekai.best' + '/sekai-cn-assets',
    comic: 'https://storage.sekai.best' + '/sekai-comics',
    en: 'https://storage.sekai.best' + '/sekai-en-assets',
    jp: 'https://storage.sekai.best' + '/sekai-assets',
    kr: 'https://storage.sekai.best' + '/sekai-kr-assets',
    musicChart: 'https://storage.sekai.best' + '/sekai-music-charts',
    tw: 'https://storage.sekai.best' + '/sekai-tc-assets',
  },
}

export const apiInstance =
  <T = unknown>(url: string) =>
  async () => {
    const instance = axios.create({
      baseURL:
        'https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master',
    })
    const res = await instance.get<T>(url)
    return res.data
  }

export async function getRemoteAssetURL(
  endpoint: string,
  setFunc?: CallableFunction,
  domainKey: AssetDomainKey = 'minio',
  server: ServerRegion | 'comic' | 'musicChart' = 'jp'
): Promise<string> {
  if (!endpoint) return ''
  const url = `${assetUrl[domainKey][server]}/${endpoint}`
  if (setFunc) setFunc(url)
  return url
}
export function getRemoteAssetURLSync(
  endpoint: string,
  setFunc?: CallableFunction,
  domainKey: AssetDomainKey = 'minio',
  server: ServerRegion | 'comic' | 'musicChart' = 'jp'
): string {
  if (!endpoint) return ''
  const url = `${assetUrl[domainKey][server]}/${endpoint}`
  if (setFunc) setFunc(url)
  return url
}
// export const apiInstance = moize(api)

// console.log(apiInstance.getStats())
