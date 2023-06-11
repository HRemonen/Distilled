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

export interface DistilleryInfo extends Distillery {
  comments: string[]
  rating: string
}
