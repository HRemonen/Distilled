/* eslint-disable import/no-extraneous-dependencies */
import { useContext, useState } from 'react'
import axios, { AxiosError } from 'axios'

import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { enqueueSnackbar } from 'notistack'
import { loginService } from '../../services/authService'
import { AuthContext } from '../../contexts/AuthContext'

import LoginInput from '../form/LoginInput'
import LoadingSpinner from '../common/Loading'

import { LoginUser } from '../../validators/user_validator'

import login_illustration_image from '../../assets/alembic.svg'

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginUser>({
    mode: 'onBlur',
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { login } = useContext(AuthContext)

  const onLogin = (loginInput: LoginUser) => {
    setLoading(true)
    loginService(loginInput)
      .then((response) => {
        login(response.data.token, response.data.user)
        navigate('/')
        enqueueSnackbar(`Login success ${response.data.user.username}`, {
          variant: 'success',
        })
      })
      .catch((err: Error | AxiosError) => {
        if (!axios.isAxiosError(err)) {
          enqueueSnackbar('Could not log in at the moment', {
            variant: 'error',
          })
          return
        }
        const { response } = err

        enqueueSnackbar(response?.data.message, {
          variant: 'error',
        })
        setError('username', {
          type: 'custom',
          message: 'Check username input',
        })
        setError('password', {
          type: 'custom',
          message: 'Check password input',
        })
      })
      .finally(() => setLoading(false))
  }

  return (
    <section className='bg-gray-700 text-center md:grid md:grid-cols-2'>
      <div className='flex h-screen flex-col items-center justify-center p-12 text-center'>
        <form
          onSubmit={handleSubmit(onLogin)}
          className='flex w-[80%] flex-col justify-center text-left'
        >
          <LoginInput
            id='username'
            type='username'
            placeholder='Username'
            name='username'
            label='Username'
            register={register}
            error={errors.username}
          />

          <LoginInput
            id='password'
            type='password'
            placeholder='Password'
            name='password'
            label='Password'
            register={register}
            error={errors.password}
          />

          {!loading ? (
            <button
              id='login-button'
              data-cy='login-form-button'
              type='submit'
              className='mb-2 mr-2 inline-block items-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50'
            >
              Login
            </button>
          ) : (
            <div className='inline-flex flex-col items-center'>
              <LoadingSpinner />
            </div>
          )}
        </form>

        <p className='mt-4 text-gray-500'>
          Don&lsquo;t have an account?
          <Link
            to='/register'
            className='ml-2 inline-flex items-center font-medium text-blue-500 hover:underline'
          >
            Register here
          </Link>
        </p>
      </div>

      <div className='hidden flex-col justify-center md:flex '>
        <img className='scale-75' src={login_illustration_image} alt='' />
      </div>
    </section>
  )
}

export default Login
