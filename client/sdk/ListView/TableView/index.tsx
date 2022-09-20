import { Table, TablePagination } from '@mui/material'
import { useMemo } from 'react'
import { useTableStore } from '../../store/table-store'
import { getMetadataColumns, Type } from '../decorator'
import { TableHead } from './TableHead'
import { TableRow } from './TableRow'
import { Pagination } from '../Pagination'
import { TableRowLoading } from '../TableRowLoading'
import styles from './style.module.scss'

export interface TableProps<T extends object = any> {
  model: Type<T>
  id: string
  /** Base URL to fetch data. */
  baseURL?: string
  pagination?: boolean
}

export const TableView = (props: TableProps) => {
  const { id, model, baseURL, pagination } = props
  const onSelectAll = useTableStore((store) => store.onSelectAll)
  const onSelectRow = useTableStore((store) => store.onSelectRow)
  const onPageSizeChange = useTableStore((store) => store.onPageSizeChange)

  const columns = useMemo(() => getMetadataColumns({ key: model.name }), [model.name])
  const dataSample = [
    { id: 1, name: 'Sample 1' },
    { id: 2, name: 'Sample 2' },
  ]

  const onCheckOrUncheckAll = (checked?: boolean) => {
    onSelectAll(id, checked ? dataSample.map((x) => x.id) : [])
  }

  const onCheckRow = (record: unknown, checked?: boolean, currentChecked?: Map<string | number, boolean>) => {
    const { id: recordId } = record as { id: string | number }
    const checkedAll = currentChecked && checked && currentChecked.size + 1 === dataSample.length
    onSelectRow(id, recordId, checked, checkedAll)
  }

  return (
    <div className={styles.Container}>
      <Table>
        <TableHead id={id} columns={columns} onCheckAll={onCheckOrUncheckAll} />
        <TableRow id={id} columns={columns} data={dataSample} onCheckRow={onCheckRow} />
      </Table>
      {pagination && <Pagination id={id} count={dataSample.length} />}
      <TableRowLoading id={id} />
    </div>
  )
}
