import { useMutation, useQuery } from 'react-query'

import { useAuthenticatedUser } from '../contexts/AuthContext'

import apiClient from '../util/apiClient'
import queryClient from '../util/queryClient'

import { Distillery, NewDistillery } from '../validators/distillery_validator'
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

export const useCreateDistillery = () => {
  const { config } = useAuthenticatedUser()

  const mutationFn = async (data: NewDistillery) => {
    await apiClient.post('/distillery', data, config)
  }

  const mutation = useMutation(mutationFn, {
    onSuccess: () => queryClient.invalidateQueries('distilleries'),
  })

  return mutation
}

export const useDeleteDistillery = () => {
  const { config } = useAuthenticatedUser()

  const mutationFn = async (distilleryID: string | undefined) => {
    await apiClient.delete(`/distillery/${distilleryID}`, config)
  }

  const mutation = useMutation(mutationFn, {
    onSuccess: () => queryClient.invalidateQueries('distilleries'),
  })

  return mutation
}
