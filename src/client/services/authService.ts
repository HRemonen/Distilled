import apiClient from '../util/apiClient'

import { LoginUser } from '../validators/user_validator'
import { APIResponse, LoginUserSuccess } from '../types'

const setToken = (newToken: string) => sessionStorage.setItem('token', newToken)

const loginService = async ({ username, password }: LoginUser) => {
  const { data }: { data: APIResponse<LoginUserSuccess> } =
    await apiClient.post('/user/login', {
      username,
      password,
    })

  setToken(data.data.token)

  return data
}

export default loginService
