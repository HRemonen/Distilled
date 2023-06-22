import { useMutation, useQuery } from 'react-query'

import { useAuthenticatedUser } from '../contexts/AuthContext'

import apiClient from '../util/apiClient'
import queryClient from '../util/queryClient'

import { APIResponse } from '../types'
import { NewWhiskey, Whiskey } from '../validators/whiskey_validator'

export const useWhiskeys = () => {
  const queryKey = ['whiskeys']

  const query = async (): Promise<APIResponse<Whiskey[]>> => {
    const { data } = await apiClient.get(`/whiskey`)

    return data
  }

  const { data: whiskeyData, ...rest } = useQuery(queryKey, query)

  return { whiskeyData, ...rest }
}

export const useWhiskey = (whiskeyId: string | undefined) => {
  const queryKey = ['whiskey', whiskeyId]

  const query = async (): Promise<APIResponse<Whiskey>> => {
    const { data } = await apiClient.get(`/whiskey/${whiskeyId}`)

    return data
  }

  const { data: whiskeyInfo, ...rest } = useQuery(queryKey, query, {
    enabled: !!whiskeyId,
  })

  return { whiskeyInfo, ...rest }
}

export const useDistilleryWhiskeys = (distilleryId: string | undefined) => {
  const queryKey = ['distillery-whiskeys', distilleryId]

  const query = async (): Promise<APIResponse<Whiskey[]>> => {
    const { data } = await apiClient.get(`/whiskey/distillery/${distilleryId}`)

    return data
  }

  const { data: whiskeyInfo, ...rest } = useQuery(queryKey, query, {
    enabled: !!distilleryId,
    retry: false,
  })

  return { whiskeyInfo, ...rest }
}

export const useCreateWhiskey = (distilleryId: string | undefined) => {
  const { config } = useAuthenticatedUser()

  const mutationFn = async (data: NewWhiskey) => {
    await apiClient.post('/whiskey', data, config)
  }

  const mutation = useMutation(mutationFn, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['distillery-whiskeys', distilleryId],
      }),
  })

  return mutation
}

export const useDeleteWhiskey = (distilleryId: string | undefined) => {
  const { config } = useAuthenticatedUser()

  const mutationFn = async (whiskeyId: string | undefined) => {
    await apiClient.delete(`/whiskey/${whiskeyId}`, config)
  }

  const mutation = useMutation(mutationFn, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['distillery-whiskeys', distilleryId],
      }),
  })

  return mutation
}
