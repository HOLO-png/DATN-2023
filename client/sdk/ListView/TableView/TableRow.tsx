import { TableBody, TableCell as MUITableCell, TableRow as MUITableRow } from '@mui/material'
import { ReactNode } from 'react'
import { CheckBox } from '../../Controls'
import { useTableStore } from '../../store/table-store'
import { BaseOptions } from '../decorator'
import styles from './style.module.scss'

type CheckRow = (record: unknown, checked?: boolean, currentChecked?: Map<string | number, boolean>) => void
type Props = {
  id: string
  columns: BaseOptions[]
  data: unknown[]
  onCheckRow?: CheckRow
}

export const TableRow = (props: Props) => {
  const { columns, data, id, onCheckRow } = props
  const isFetching = useTableStore((store) => store.tableMap?.get(id)?.isFetching)

  return (
    <TableBody className={styles.TableBody}>
      {data.map((record, idx) => (
        <MUITableRow key={idx} className={styles.TableRow}>
          {CheckboxCell(id, record, onCheckRow)}
          {TableCell(columns, record as Record<string, unknown>)}
        </MUITableRow>
      ))}
    </TableBody>
  )
}

const TableCell = (columns: BaseOptions[], record: Record<string, unknown>) => {
  return columns.map(({ key = '' }, idx) => (
    <MUITableCell key={`${key}-${idx}`} className={styles.Body2} classes={{ root: styles.TableCell }}>
      {record[key] as ReactNode}
    </MUITableCell>
  ))
}

const CheckboxCell = (id: string, record: unknown, onCheckRow?: CheckRow) => {
  const { id: recordId } = record as { id: string | number }
  const tableMap = useTableStore((store) => store.tableMap?.get(id))
  const checked = tableMap?.selectedRows?.has(recordId) || false

  if (onCheckRow) {
    const onCheckRowInternal = (evt: React.ChangeEvent, checked?: boolean) => {
      evt.stopPropagation()
      onCheckRow(record, checked, tableMap?.selectedRows)
    }
    return (
      <MUITableCell className={styles.CheckboxCell}>
        <CheckBox checked={checked} onChange={onCheckRowInternal} />
      </MUITableCell>
    )
  } else return <></>
}
