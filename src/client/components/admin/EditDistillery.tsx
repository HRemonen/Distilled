/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'

import {
  useDeleteDistillery,
  useDistilleries,
} from '../../services/distilleryService'

import { Distillery } from '../../validators/distillery_validator'

type DistilleryCardProps = {
  distillery: Distillery
}

const DistilleryCard = ({ distillery }: DistilleryCardProps) => {
  const navigate = useNavigate()
  const deleteDistillery = useDeleteDistillery()

  const handleEdit = () => console.log('edit')

  const handleDelete = () =>
    deleteDistillery
      .mutateAsync(distillery.id)
      .then(() => {
        navigate('/admin/modify-distilleries')
        enqueueSnackbar('Distillery deletion successful', {
          variant: 'success',
        })
      })
      .catch((error) => {
        enqueueSnackbar(`Distillery deletion failed: ${error.message}`, {
          variant: 'error',
        })
      })

  return (
    <div className='mt-6 rounded-lg border border-gray-300 bg-white p-4'>
      <h2 className='text-2xl font-bold text-gray-800'>{distillery.name}</h2>
      <p className='text-gray-600'>Location: {distillery.location}</p>
      <p className='text-gray-600'>Country: {distillery.country}</p>
      <p className='text-gray-600'>
        Year Established: {distillery.year_established}
      </p>
      <p className='text-gray-600'>Website: {distillery.website}</p>
      <div className='mt-4 flex justify-end'>
        <button
          type='button'
          className='mr-2 rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300'
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          type='button'
          className='rounded bg-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-300'
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

const EditDistillery = () => {
  const { distilleryData, isLoading } = useDistilleries()
  const [selectedDistillery, setSelectedDistillery] = useState<Distillery>()

  if (isLoading || !distilleryData?.data) return null

  const distilleries = distilleryData.data

  const handleDistilleryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const distilleryId = event.target.value
    const selected = distilleries.find(
      (distillery) => distillery.id === distilleryId
    )
    setSelectedDistillery(selected)
  }

  return (
    <div className='my-6'>
      <div className='flex items-center'>
        <div>
          <label
            htmlFor='distillery-select'
            className='mb-2 block text-sm font-medium text-gray-900'
          >
            Select a Distillery:
          </label>
          <select
            id='distillery-select'
            className='block w-[50vw] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
            onChange={handleDistilleryChange}
            value={selectedDistillery ? selectedDistillery.id : ''}
          >
            <option value=''>-- Select a Distillery --</option>
            {distilleries.map((distillery) => (
              <option key={distillery.id} value={distillery.id}>
                {distillery.name}
              </option>
            ))}
          </select>
        </div>
        <Link
          to='../new-distillery'
          className='absolute right-4 rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700'
        >
          Create New Distillery
        </Link>
      </div>

      {selectedDistillery && <DistilleryCard distillery={selectedDistillery} />}
    </div>
  )
}

export default EditDistillery
