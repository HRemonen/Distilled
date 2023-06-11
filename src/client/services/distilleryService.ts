import { useMutation, useQuery } from 'react-query'

import apiClient from '../util/apiClient'
import queryClient from '../util/queryClient'

const useDistilleries = () => {
  const queryKey = ['distilleries']

  const query = async () => {
    const { data } = await apiClient.get(`distillery`)

    return data
  }
}

export default useDistilleries
