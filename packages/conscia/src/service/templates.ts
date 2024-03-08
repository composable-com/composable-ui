import { ConsciaComponent, ConsciaTemplate } from '../types'
import { consciaClient } from './client'

export const getTemplateData = async <
  Components extends ConsciaComponent<any>
>({
  templateCode,
}: {
  templateCode: string
}) => {
  const response = await consciaClient.post<ConsciaTemplate<Components>>(
    '/experience/template/_query',
    {
      templateCode,
    }
  )
  return response.data
}
