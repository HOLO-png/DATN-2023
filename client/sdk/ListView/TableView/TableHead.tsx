import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import { Grid, TableCell, TableHead as MUITableHead, TableRow, TableSortLabel } from '@mui/material'
import clsx from 'clsx'
import { CheckBox } from '../../Controls'
import { useTableStore } from '../../store/table-store'
import { BaseOptions } from '../decorator'
import styles from './style.module.scss'

type Props = {
  id: string
  columns: BaseOptions[]
  onCheckAll?: (checked?: boolean) => void
}
export const TableHead = (props: Props) => {
  const { columns, id, onCheckAll } = props
  const onColumnSort = useTableStore((store) => store.onColumnSort)
  const columnSort = useTableStore((store) => store.tableMap?.get(id)?.columnSort)

  return (
    <MUITableHead className={styles.TableHeader}>
      <TableRow className={styles.TableRow}>
        {onCheckAll && HeaderCheckAllCell(id, onCheckAll)}
        {columns.map((col) => (
          <TableCell key={col.key} className={clsx(styles.Subhead2, styles.TableCell)}>
            <Grid className={styles.Item}>
              {col.title}
              {col.sort && (
                <TableSortLabel
                  onClick={() => {
                    onColumnSort(id, col.key || '')
                  }}
                  IconComponent={() => (
                    <Grid className={styles.SortIcon}>
                      <ArrowDropUp
                        className={clsx(styles.Icon, `${columnSort?.get(col.key || '') === 'asc' && styles.Active}`)}
                      />
                      <ArrowDropDown className={`${columnSort?.get(col.key || '') === 'desc' && styles.Active}`} />
                    </Grid>
                  )}
                />
              )}
            </Grid>
          </TableCell>
        ))}
      </TableRow>
    </MUITableHead>
  )
}

const HeaderCheckAllCell = (id: string, onCheckAll?: (checked?: boolean) => void) => {
  const store = useTableStore((store) => store.tableMap?.get(id))

  return (
    <TableCell className={styles.TableRow}>
      <CheckBox checked={store?.selectedAll || false} onChange={(_, checked) => onCheckAll && onCheckAll(checked)} />
    </TableCell>
  )
}
