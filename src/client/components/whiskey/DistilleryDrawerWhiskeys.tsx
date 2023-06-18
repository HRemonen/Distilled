/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { ColumnDef } from '@tanstack/react-table'

import { useDistilleryWhiskeys } from '../../services/whiskeyService'

import Typography from '../typography/Typography'
import TableInstance from '../table/TableInstance'

import { Whiskey } from '../../validators/whiskey_validator'

type WhiskeyTable = Omit<Whiskey, 'id' | 'distillery_id'>

const DistilleryDrawerWhiskeys = () => {
  const { distilleryId } = useParams()
  const { whiskeyInfo, isLoading, isError } =
    useDistilleryWhiskeys(distilleryId)

  const columns = useMemo<ColumnDef<WhiskeyTable>[]>(
    () => [
      {
        header: 'Age',
        cell: (row) => row.renderValue(),
        accessorKey: 'age',
      },
      {
        header: 'Name',
        cell: (row) => row.renderValue(),
        accessorKey: 'name',
      },
      {
        header: 'Type',
        cell: (row) => row.renderValue(),
        accessorKey: 'type',
      },
      {
        header: 'Description',
        cell: (row) => row.renderValue(),
        accessorKey: 'description',
      },
    ],
    []
  )

  if (isLoading) return null

  if (isError || !whiskeyInfo?.data || whiskeyInfo.data.length === 0)
    return (
      <div className='m-4'>
        <Typography variant='h6'>
          Ahh bummer, looks like there is no whiskeys related to this
          distillery.
        </Typography>
        <Typography variant='body2' className='mt-4'>
          You could request your favorite whiskeys to be added to a certain
          distillery by sending in a{' '}
          <a
            className='text-blue-500 underline'
            href='mailto:requests@distilled.fi'
          >
            request
          </a>
          .
        </Typography>
      </div>
    )

  return (
    <div>
      <Typography variant='h6' className='mt-4'>
        Whiskeys
      </Typography>
      <TableInstance data={whiskeyInfo.data} columns={columns} />
    </div>
  )
}

export default DistilleryDrawerWhiskeys
