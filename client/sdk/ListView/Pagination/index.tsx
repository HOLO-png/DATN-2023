import { UsePaginationProps } from '@mui/lab'
import { Pagination as MUIPagination, PaginationItem, TablePagination } from '@mui/material'
import clsx from 'clsx'
import { useState } from 'react'
import { useListViewStore } from 'sdk'
import styles from './style.module.scss'

export const PaginationAction = (props: UsePaginationProps) => {
  return (
    <MUIPagination
      {...props}
      siblingCount={1}
      defaultPage={6}
      className={styles.Pagination}
      renderItem={(item) => (
        <PaginationItem {...item} classes={{ selected: styles.PageActive, disabled: styles.Disabled }} />
      )}
      classes={{ root: styles.PaginationRoot, ul: styles.ul }}
    />
  )
}

export const Pagination = (props: Partial<UsePaginationProps> & { id: string }) => {
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(1)

  const data = useListViewStore((store) => store.listViewMap?.get(props.id)?.data)
  const onQuery = useListViewStore((store) => store.onQuery)

  const count = data?.totalRecords || 0
  const totalPages = count % rowsPerPage !== 0 ? Math.floor(count / rowsPerPage) + 1 : count / rowsPerPage

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const pageSize = parseInt(event.target.value, 10)
    setPage(1)
    onQuery(props.id, { size: pageSize, page: 1 })
    setRowsPerPage(pageSize)
  }

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage)
    onQuery(props.id, { page: newPage })
  }

  return (
    <TablePagination
      component='div'
      ActionsComponent={() => <PaginationAction count={totalPages} onChange={handleChangePage} page={page} />}
      labelRowsPerPage=''
      labelDisplayedRows={({ from, to, count }) => `${from}-${to} trong số ${count}`}
      count={count}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      page={0}
      onPageChange={() => undefined}
      className={styles.Pagination}
      classes={{
        select: styles.Select,
        selectLabel: styles.Body2,
        displayedRows: clsx(styles.displayedRows, styles.Body2)
      }}
    />
  )
}
