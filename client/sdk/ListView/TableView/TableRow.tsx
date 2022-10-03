import { TableBody, TableCell as MUITableCell, TableRow as MUITableRow } from '@mui/material'
import { ReactNode } from 'react'
import { useListViewStore } from 'sdk'
import { BaseOptions } from '../decorator'
import styles from './style.module.scss'

type Props = {
  id: string
  columns: BaseOptions[]
}

export const TableRow = (props: Props) => {
  const { columns, id } = props
  const data = useListViewStore((store) => store.listViewMap?.get(id)?.data)

  if (data)
    return (
      <TableBody className={styles.TableBody}>
        {data.data?.map((record, idx) => (
          <MUITableRow key={idx} className={styles.TableRow}>
            {TableCell(columns, record as Record<string, unknown>)}
          </MUITableRow>
        ))}
      </TableBody>
    )

  return <></>
}

const TableCell = (columns: BaseOptions[], record: Record<string, unknown>) => {
  return columns.map(({ key = '' }, idx) => (
    <MUITableCell
      key={`${key}-${idx}`}
      className={styles.Body2}
      classes={{ root: styles.TableCell }}
      align={columns[idx].align}
      width={columns[idx].width}>
      {columns[idx].render ? columns[idx].render?.(record) : (record[key] as ReactNode)}
    </MUITableCell>
  ))
}
