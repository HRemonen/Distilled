import { TextareaType } from '../../types'

const TextArea = ({
  register,
  error,
  label,
  id,
  ...inputProps
}: TextareaType) => (
  <div className='mb-8'>
    <label className='mb-2 block text-sm font-medium text-white' htmlFor={id}>
      {label}
    </label>
    <textarea
      className={`block w-full rounded-lg border border-gray-300 bg-gray-700 p-2.5 text-sm text-white focus:border-blue-500 focus:ring-blue-500
        ${error ? 'border-red-500 text-[#EA5555]' : 'border-[#f4f7fd]'}`}
      rows={10}
      id={id}
      {...register(id)}
      {...inputProps}
    />
    {error && <p className='mt-2 text-sm text-[#EA5555]'>{error.message}</p>}
  </div>
)

export default TextArea
