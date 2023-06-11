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
