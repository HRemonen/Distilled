/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { ColumnDef } from '@tanstack/react-table'

import { useDistilleryWhiskeys } from '../../services/whiskeyService'

import Typography from '../typography/Typography'

import { Whiskey } from '../../validators/whiskey_validator'
import TableInstance from './TableInstance'

type WhiskeyTable = Omit<Whiskey, 'id' | 'distillery_id'>

const DistilleryDrawerWhiskeys = () => {
  const { distilleryId } = useParams()
  const { whiskeyInfo, isLoading } = useDistilleryWhiskeys(distilleryId)

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

  if (isLoading || !whiskeyInfo) return null

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
