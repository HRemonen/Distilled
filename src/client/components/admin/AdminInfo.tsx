import React from 'react'

const AdminInfo = () => (
  <div className='rounded-lg bg-white p-6'>
    <h2 className='mb-4 text-3xl font-bold text-gray-800'>Information</h2>
    <p className='mb-6 text-gray-700'>
      This powerful tool empowers you, as an administrator, to manage and
      oversee all aspects of your distillery and its exquisite collection of
      whiskeys. With the admin panel, you have complete control over creating,
      updating, and deleting distilleries and their corresponding whiskeys.
      Here&lsquo;s a brief overview of the features available to you:
    </p>
    <h2 className='mb-2 text-2xl font-bold text-yellow-600'>
      Whiskey Management:
    </h2>
    <ul className='mb-4 list-disc pl-6 text-gray-700'>
      <li>
        <span role='img' aria-label='Whiskey'>
          🥃
        </span>{' '}
        Create new whiskeys: Add comprehensive information about each whiskey.
      </li>
      <li>
        <span role='img' aria-label='Whiskey'>
          🥃
        </span>{' '}
        Update existing whiskeys: Keep your whiskey listings current by making
        changes to their descriptions.
      </li>
      <li>
        <span role='img' aria-label='Whiskey'>
          🥃
        </span>{' '}
        Delete whiskeys: Remove whiskeys from the collection that have been
        discontinued or are no longer available.
      </li>
    </ul>

    <h2 className='mb-2 text-2xl font-bold text-indigo-500'>
      Distillery Management:
    </h2>
    <ul className='list-disc pl-6 text-gray-700'>
      <li>
        <span role='img' aria-label='Distillery'>
          ⚗️
        </span>{' '}
        Create new distilleries: Add information about each distillery.
      </li>
      <li>
        <span role='img' aria-label='Distillery'>
          ⚗️
        </span>{' '}
        Update existing distilleries: Modify distillery information whenever
        necessary, ensuring accurate and up-to-date records.
      </li>
      <li>
        <span role='img' aria-label='Distillery'>
          ⚗️
        </span>{' '}
        Delete distilleries: Safely remove distilleries that are no longer
        operational or relevant.
      </li>
    </ul>
  </div>
)

export default AdminInfo
