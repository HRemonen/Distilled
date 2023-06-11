import { useQuery } from 'react-query'

import apiClient from '../util/apiClient'

import { Distillery } from '../validators/distillery_validator'
import { APIResponse, DistilleryInfo } from '../types'

export const useDistilleries = () => {
  const queryKey = ['distilleries']

  const query = async (): Promise<APIResponse<Distillery[]>> => {
    const { data } = await apiClient.get(`/distillery`)

    return data
  }

  const { data: distilleryData, ...rest } = useQuery(queryKey, query)

  return { distilleryData, ...rest }
}

export const useDistillery = (distilleryID: string | undefined) => {
  const queryKey = ['distillery', distilleryID]

  const query = async (): Promise<APIResponse<DistilleryInfo>> => {
    const { data } = await apiClient.get(`/distillery/${distilleryID}`)

    return data
  }

  const { data: distilleryInfo, ...rest } = useQuery(queryKey, query, {
    enabled: !!distilleryID,
  })

  return { distilleryInfo, ...rest }
}
