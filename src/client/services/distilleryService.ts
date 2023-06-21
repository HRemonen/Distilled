import { useMutation, useQuery } from 'react-query'

import { useAuthenticatedUser } from '../contexts/AuthContext'

import apiClient from '../util/apiClient'
import queryClient from '../util/queryClient'

import {
  Distillery,
  EditDistillery,
  NewDistillery,
} from '../validators/distillery_validator'
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

export const useDistillery = (distilleryId: string | undefined) => {
  const queryKey = ['distillery', distilleryId]

  const query = async (): Promise<APIResponse<DistilleryInfo>> => {
    const { data } = await apiClient.get(`/distillery/${distilleryId}`)

    return data
  }

  const { data: distilleryInfo, ...rest } = useQuery(queryKey, query, {
    enabled: !!distilleryId,
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

export const useEditDistillery = (distilleryId: string) => {
  const { config } = useAuthenticatedUser()

  const mutationFn = async (data: EditDistillery) => {
    await apiClient.put(`/distillery/${distilleryId}`, data, config)
  }

  const mutation = useMutation(mutationFn, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['distillery', distilleryId],
      }),
  })

  return mutation
}

export const useDeleteDistillery = () => {
  const { config } = useAuthenticatedUser()

  const mutationFn = async (distilleryId: string | undefined) => {
    await apiClient.delete(`/distillery/${distilleryId}`, config)
  }

  const mutation = useMutation(mutationFn, {
    onSuccess: () => queryClient.invalidateQueries('distilleries'),
  })

  return mutation
}
