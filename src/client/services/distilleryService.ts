import { useMutation, useQuery } from 'react-query'

import apiClient from '../util/apiClient'
import queryClient from '../util/queryClient'

import { Distillery } from '../validators/distillery_validator'
import { APIResponse } from '../types'

const useDistilleries = () => {
  const queryKey = ['distilleries']

  const query = async (): Promise<APIResponse<Distillery>> => {
    const { data } = await apiClient.get(`/distillery`)

    return data
  }

  const { data: distilleryData, ...rest } = useQuery(queryKey, query)

  return { distilleryData, ...rest }
}

export default useDistilleries
