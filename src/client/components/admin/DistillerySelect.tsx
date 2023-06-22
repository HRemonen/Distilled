/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent } from 'react'

import { useDistilleries } from '../../services/distilleryService'

import { Distillery } from '../../validators/distillery_validator'

type DistillerySelectProps = {
  value: Distillery | null | undefined
  setValue: React.Dispatch<React.SetStateAction<Distillery | null | undefined>>
}

const DistillerySelect = ({ value, setValue }: DistillerySelectProps) => {
  const { distilleryData, isLoading } = useDistilleries()

  if (isLoading || !distilleryData?.data) return null

  const distilleries = distilleryData.data

  const handleDistilleryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const distilleryId = event.target.value
    const selected = distilleries.find(
      (distillery) => distillery.id === distilleryId
    )
    setValue(selected)
  }

  return (
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
        value={value ? value.id : ''}
      >
        <option value=''>-- Select a Distillery --</option>
        {distilleries.map((distillery) => (
          <option key={distillery.id} value={distillery.id}>
            {distillery.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DistillerySelect
