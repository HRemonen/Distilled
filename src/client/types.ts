/* eslint-disable import/no-extraneous-dependencies */
import { InputHTMLAttributes, SelectHTMLAttributes } from 'react'
import {
  FieldError,
  UseFormRegister,
  FieldValues,
  UseFormRegisterReturn,
} from 'react-hook-form'

import { Distillery } from './validators/distillery_validator'

// GENERAL API RELATED TYPES

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

// RATING RELATED TYPES
export type RatingType = {
  0: number
  1: number
  2: number
  3: number
  4: number
  5: number
}

// ENTITY RELATED TYPES
export interface EntityReview {
  rating_id: string
  comment: string
  rating: number
  username: string
  created_at: string
}

// DISTILLERY RELATED TYPES

export interface DistilleryInfo extends Distillery {
  rating: RatingType
}

// USER RELATED TYPES

export interface PrivateUser {
  id: string
  role: 'user' | 'admin'
  username: string
}

export interface LoginUserSuccess {
  token: string
  user: PrivateUser
}

// FORM RELATED TYPES

export interface InputType extends InputHTMLAttributes<HTMLInputElement> {
  register:
    | UseFormRegister<FieldValues>
    | UseFormRegister<any>
    | UseFormRegisterReturn<any>
  error?: FieldError | undefined
  label?: string
  id: string
}

export interface SelectType extends SelectHTMLAttributes<HTMLSelectElement> {
  register:
    | UseFormRegister<FieldValues>
    | UseFormRegister<any>
    | UseFormRegisterReturn<any>
  error?: FieldError | undefined
  label?: string
  id: string
}

export interface TextareaType extends InputHTMLAttributes<HTMLTextAreaElement> {
  register: UseFormRegister<FieldValues> | UseFormRegister<any>
  error: FieldError | undefined
  label?: string
  id: string
}
