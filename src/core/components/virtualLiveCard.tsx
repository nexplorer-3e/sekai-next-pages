import { FunctionComponent, memo } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { VirtualLive } from '../../@types/VirtualLive'
import { getRemoteAssetURLSync } from '../services/apiInstance'

interface Props {
  virtualLive: Pick<VirtualLive, 'id' | 'assetbundleName' | 'name'>
}

export const VirtualLiveCard: FunctionComponent<Props> = memo(props => {
  const { virtualLive } = props

  return (
    <div className="flex justify-center">
      <Link href={`/virtualLive/${virtualLive.id}`}>
        <Image
          width={790}
          height={243}
          src={getRemoteAssetURLSync(
            `virtual_live/select/banner/${virtualLive.assetbundleName}_rip/${virtualLive.assetbundleName}.png`,
            undefined,
            'minio'
          )}
          className="w-full h-auto"
          alt={virtualLive.name}
        />
      </Link>
    </div>
  )
})
