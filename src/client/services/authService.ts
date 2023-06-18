import apiClient from '../util/apiClient'

import { LoginUser, RegisterUser } from '../validators/user_validator'
import { APIResponse, PrivateUser, LoginUserSuccess } from '../types'

const setToken = (newToken: string) => sessionStorage.setItem('token', newToken)

export const loginService = async ({ username, password }: LoginUser) => {
  const { data }: { data: APIResponse<LoginUserSuccess> } =
    await apiClient.post('/user/login', {
      username,
      password,
    })

  setToken(data.data.token)

  return data
}

export const registerService = async ({
  username,
  password,
  passwordConfirm,
}: RegisterUser) => {
  const { data }: { data: APIResponse<PrivateUser> } = await apiClient.post(
    '/user/register',
    {
      username,
      password,
      passwordConfirm,
    }
  )

  return data
}
