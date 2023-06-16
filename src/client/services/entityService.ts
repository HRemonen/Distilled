import { useMutation, useQuery } from 'react-query'

import { useAuthenticatedUser } from '../contexts/AuthContext'

import apiClient from '../util/apiClient'
import queryClient from '../util/queryClient'

import { APIResponse, EntityReview } from '../types'
import { Review } from '../validators/entity_validator'

export const useEntityReviews = (entityID: string | undefined) => {
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

export const useCreateReview = () => {
  const { config } = useAuthenticatedUser()

  const mutationFn = async ({
    entityId,
    review,
  }: {
    entityId: string
    review: Review
  }) => {
    await apiClient.post(
      `/entity/rate/${entityId}`,
      { rating: review.rating },
      config
    )
    if (review.comment) {
      await apiClient.post(
        `/entity/comment/${entityId}`,
        { comment: review.comment },
        config
      )
    }
  }

  const mutation = useMutation(mutationFn, {
    onSuccess: () => queryClient.invalidateQueries('reviews'),
  })

  return mutation
}
