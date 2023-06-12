import { useQuery } from 'react-query'

import apiClient from '../util/apiClient'

import { APIResponse } from '../types'
import { Whiskey } from '../validators/whiskey_validator'

export const useWhiskeys = () => {
  const queryKey = ['whiskeys']

  const query = async (): Promise<APIResponse<Whiskey[]>> => {
    const { data } = await apiClient.get(`/whiskey`)

    return data
  }

  const { data: whiskeyData, ...rest } = useQuery(queryKey, query)

  return { whiskeyData, ...rest }
}

export const useWhiskey = (whiskeyID: string | undefined) => {
  const queryKey = ['whiskey', whiskeyID]

  const query = async (): Promise<APIResponse<Whiskey>> => {
    const { data } = await apiClient.get(`/whiskey/${whiskeyID}`)

    return data
  }

  const { data: whiskeyInfo, ...rest } = useQuery(queryKey, query, {
    enabled: !!whiskeyID,
  })

  return { whiskeyInfo, ...rest }
}

export const useDistilleryWhiskeys = (distilleryID: string | undefined) => {
  const queryKey = ['distillery-whiskeys', distilleryID]

  const query = async (): Promise<APIResponse<Whiskey[]>> => {
    const { data } = await apiClient.get(`/whiskey/distillery/${distilleryID}`)

    return data
  }

  const { data: whiskeyInfo, ...rest } = useQuery(queryKey, query, {
    enabled: !!distilleryID,
  })

  return { whiskeyInfo, ...rest }
}
