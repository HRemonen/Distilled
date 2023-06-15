import { useQuery } from 'react-query'

import apiClient from '../util/apiClient'

import { APIResponse, EntityReview } from '../types'

const useEntityReviews = (entityID: string | undefined) => {
  const queryKey = ['reviews', entityID]

  const query = async (): Promise<APIResponse<EntityReview[]>> => {
    const { data } = await apiClient.get(`/entity/reviews/${entityID}`)

    return data
  }

  const { data: reviewsInfo, ...rest } = useQuery(queryKey, query, {
    enabled: !!entityID,
    retry: false,
  })

  return { reviewsInfo, ...rest }
}

export default useEntityReviews
