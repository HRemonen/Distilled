/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'

import { enqueueSnackbar } from 'notistack'
import { registerService } from '../../services/authService'

import LoginInput from '../form/LoginInput'
import LoadingSpinner from '../common/Loading'

import { APIFailure } from '../../types'
import { RegisterZod, RegisterUser } from '../../validators/user_validator'

import login_illustration_image from '../../assets/alembic.svg'

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterUser>({
    mode: 'onBlur',
    resolver: zodResolver(RegisterZod),
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onRegister = (registerInput: RegisterUser) => {
    setLoading(true)
    registerService(registerInput)
      .then((response) => {
        navigate('/login')
        enqueueSnackbar(`Registered user ${response.data.username}`, {
          variant: 'success',
        })
      })
      .catch((err: Error | AxiosError) => {
        if (!axios.isAxiosError(err)) {
          enqueueSnackbar('Could not register new user at the moment', {
            variant: 'error',
          })
          return
        }
        const { response } = err
        const responseData: APIFailure = response?.data

        if (responseData.message === 'username already exists') {
          setError('username', {
            type: 'custom',
            message: 'Username already in use.',
          })
        }
      })
      .finally(() => setLoading(false))
  }

  return (
    <section className='bg-gray-700 text-center md:grid md:grid-cols-2'>
      <div className='hidden flex-col justify-center md:flex '>
        <img className='scale-75' src={login_illustration_image} alt='' />
      </div>
      <div className='flex h-screen flex-col items-center justify-center p-12 text-center'>
        <form
          onSubmit={handleSubmit(onRegister)}
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

          <LoginInput
            id='passwordConfirm'
            type='password'
            placeholder='Password confirmation'
            name='passwordConfirm'
            label='Password confirmation'
            register={register}
            error={errors.passwordConfirm}
          />

          {!loading ? (
            <button
              id='register-button'
              data-cy='register-form-button'
              type='submit'
              className='mb-2 mr-2 inline-block items-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50'
            >
              Register
            </button>
          ) : (
            <div className='inline-flex flex-col items-center'>
              <LoadingSpinner />
            </div>
          )}
        </form>

        <p className='mt-4 text-gray-500'>
          Already have an account?
          <Link
            to='/login'
            className='ml-2 inline-flex items-center font-medium text-blue-500 hover:underline'
          >
            Login here
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Register
