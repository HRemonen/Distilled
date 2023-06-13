import { Distillery } from './validators/distillery_validator'

export interface APIFailure {
  data: null
  message: string
  status: 'error'
}

export interface APIResponse<T> {
  data: T
  message: string
  status: 'success'
}

export type RatingType = {
  0: number
  1: number
  2: number
  3: number
  4: number
  5: number
}

export interface EntityReview {
  comment: string
  rating: number
  username: string
  created_at: string
}

export interface DistilleryInfo extends Distillery {
  reviews: EntityReview[]
  rating: RatingType
}
