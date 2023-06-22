/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'

import { useDeleteDistillery } from '../../../services/distilleryService'

import DistillerySelect from '../DistillerySelect'

import { Distillery } from '../../../validators/distillery_validator'

type DistilleryCardProps = {
  distillery: Distillery
  onDelete: () => void
}

const DistilleryCard = ({ distillery, onDelete }: DistilleryCardProps) => (
  <div className='mt-6 rounded-lg border border-gray-300 bg-white p-4'>
    <h2 className='text-2xl font-bold text-gray-800'>{distillery.name}</h2>
    <p className='text-gray-600'>Location: {distillery.location}</p>
    <p className='text-gray-600'>Country: {distillery.country}</p>
    <p className='text-gray-600'>
      Year Established: {distillery.year_established}
    </p>
    <p className='text-gray-600'>Website: {distillery.website}</p>
    <div className='mt-4 flex justify-end'>
      <Link
        to={`../edit-distillery/${distillery.id}`}
        className='mr-2 rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300'
      >
        Edit
      </Link>
      <button
        type='button'
        className='rounded bg-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-300'
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  </div>
)

const EditDistillery = () => {
  const [searchParams] = useSearchParams()
  const deleteDistillery = useDeleteDistillery()
  const [selectedDistillery, setSelectedDistillery] =
    useState<Distillery | null>()

  useEffect(() => {
    const distillery = searchParams.get('distillery')
    if (!distillery) return

    try {
      const parsedDistillery = JSON.parse(distillery)
      setSelectedDistillery(parsedDistillery)
    } catch (error) {
      setSelectedDistillery(null)
    }
  }, [searchParams])

  const handleDistilleryDelete = () =>
    deleteDistillery
      .mutateAsync(selectedDistillery?.id)
      .then(() => {
        setSelectedDistillery(null)
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
    <div className='my-6'>
      <div className='flex items-center'>
        <DistillerySelect
          value={selectedDistillery}
          setValue={setSelectedDistillery}
        />
        <Link
          to='../new-distillery'
          className='absolute right-4 rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700'
        >
          Create New Distillery
        </Link>
      </div>

      {selectedDistillery && (
        <DistilleryCard
          distillery={selectedDistillery}
          onDelete={handleDistilleryDelete}
        />
      )}
    </div>
  )
}

export default EditDistillery
