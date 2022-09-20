import styles from './style.module.scss'
import { Pagination as MUIPagination, TablePagination } from '@mui/material'
import { useState } from 'react'
import { useTableStore } from '../../store/table-store'
import clsx from 'clsx'

type PaginationProps = {
  id: string
  count: number
}

export const PaginationAction = (props: PaginationProps) => {
  const { id, count } = props
  const onPageChange = useTableStore((store) => store.onPageChange)
  const [page, setPage] = useState(0)

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    event.stopPropagation()
    setPage(newPage)
    onPageChange(id, newPage)
  }

  return (
    <MUIPagination
      count={count}
      page={page}
      color='primary'
      siblingCount={1}
      defaultPage={6}
      onChange={handleChangePage}
      className={styles.Pagination}
      classes={{ root: styles.PaginationRoot, ul: styles.ul }}
    />
  )
}

export const Pagination = (props: PaginationProps) => {
  const { id, count } = props
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const onPageSizeChange = useTableStore((store) => store.onPageSizeChange)
  const TotalPage = count % rowsPerPage !== 0 ? Math.floor(count / rowsPerPage) + 1 : count / rowsPerPage

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const pageSize = parseInt(event.target.value, 10)
    onPageSizeChange(id, pageSize)
    setRowsPerPage(pageSize)
  }
  return (
    <TablePagination
      component='div'
      ActionsComponent={() => <PaginationAction count={TotalPage} id={id} />}
      labelRowsPerPage='Rows per page'
      count={count}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      page={0}
      onPageChange={() => undefined}
      className={styles.Pagination}
      classes={{
        select: styles.Select,
        selectLabel: styles.Body2,
        displayedRows: clsx(styles.displayedRows, styles.Body2),
      }}
    />
  )
}
