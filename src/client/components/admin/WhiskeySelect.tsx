/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent } from 'react'

import { useDistilleryWhiskeys } from '../../services/whiskeyService'

import { Whiskey } from '../../validators/whiskey_validator'

type WhiskeySelectProps = {
  distilleryId: string | undefined
  value: Whiskey | null | undefined
  setValue: React.Dispatch<React.SetStateAction<Whiskey | null | undefined>>
}

const WhiskeySelect = ({
  distilleryId,
  value,
  setValue,
}: WhiskeySelectProps) => {
  const { whiskeyInfo, isLoading } = useDistilleryWhiskeys(distilleryId)

  if (isLoading || !whiskeyInfo?.data) return null

  const whiskeys = whiskeyInfo.data

  const handleWhiskeyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const whiskeyId = event.target.value
    const selected = whiskeys.find((whiskey) => whiskey.id === whiskeyId)
    setValue(selected)
  }

  return (
    <div>
      <label
        htmlFor='whiskey-select'
        className='mb-2 block text-sm font-medium text-gray-900'
      >
        Select a Whiskey:
      </label>
      <select
        id='whiskey-select'
        className='block w-[50vw] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
        onChange={handleWhiskeyChange}
        value={value ? value.id : ''}
      >
        <option value=''>-- Select a Whiskey --</option>
        {whiskeys.map((whiskey) => (
          <option key={whiskey.id} value={whiskey.id}>
            {whiskey.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default WhiskeySelect
