/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'

import WhiskeySelect from '../WhiskeySelect'
import DistillerySelect from '../DistillerySelect'

import { Distillery } from '../../../validators/distillery_validator'
import { Whiskey } from '../../../validators/whiskey_validator'
import { useDeleteWhiskey } from '../../../services/whiskeyService'

type WhiskeyCardProps = {
  whiskey: Whiskey
  onDelete: () => void
}

const WhiskeyCard = ({ whiskey, onDelete }: WhiskeyCardProps) => (
  <div className='mt-6 rounded-lg border border-gray-300 bg-white p-4'>
    <h2 className='text-2xl font-bold text-gray-800'>{whiskey.name}</h2>
    <p className='text-gray-600'>Distillery ID: {whiskey.distillery_id}</p>
    <p className='text-gray-600'>Type: {whiskey.type}</p>
    <p className='text-gray-600'>Age: {whiskey.age}</p>
    <p className='text-gray-600'>Description: {whiskey.description}</p>
    <div className='mt-4 flex justify-end'>
      <Link
        to={`../edit-whiskey/${whiskey.id}`}
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

const EditWhiskey = () => {
  const [searchParams] = useSearchParams()
  const [selectedDistillery, setSelectedDistillery] =
    useState<Distillery | null>()
  const [selectedWhiskey, setSelectedWhiskey] = useState<Whiskey | null>()
  const deleteWhiskey = useDeleteWhiskey(selectedDistillery?.id)

  console.log(searchParams)

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

  const handleWhiskeyDelete = () => {
    deleteWhiskey
      .mutateAsync(selectedWhiskey?.id)
      .then(() => {
        setSelectedWhiskey(null)
        enqueueSnackbar('Whiskey deletion successful', {
          variant: 'success',
        })
      })
      .catch((error) => {
        enqueueSnackbar(`Whiskey deletion failed: ${error.message}`, {
          variant: 'error',
        })
      })
  }

  return (
    <div className='my-6'>
      <div className='flex items-center'>
        <DistillerySelect
          value={selectedDistillery}
          setValue={setSelectedDistillery}
        />
        <WhiskeySelect
          distilleryId={selectedDistillery?.id}
          value={selectedWhiskey}
          setValue={setSelectedWhiskey}
        />
        {selectedDistillery && (
          <Link
            to={`../new-whiskey/${selectedDistillery.id}`}
            className='absolute right-4 rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700'
          >
            Create Whiskey For This Distillery
          </Link>
        )}
      </div>

      {selectedWhiskey && (
        <WhiskeyCard whiskey={selectedWhiskey} onDelete={handleWhiskeyDelete} />
      )}
    </div>
  )
}

export default EditWhiskey
