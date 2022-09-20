import styles from './style.module.scss'
import { CircularProgress, Fade } from '@mui/material'
import { useTableStore } from '../../store/table-store'
import { useEffect, useRef } from 'react'

export const TableRowLoading = (props: { id: string }) => {
  const { id } = props
  const isFetching = useTableStore((store) => store.tableMap?.get(id)?.isFetching)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (loaderRef.current) {
      if (isFetching) {
        loaderRef.current.classList.add(`${styles.Active}`)
      } else {
        loaderRef.current.classList.remove(`${styles.Active}`)
      }
    }
  }, [isFetching])

  return (
    <div className={styles.TableRowLoading} ref={loaderRef}>
      <Fade in={true} className={styles.Item}>
        <CircularProgress />
      </Fade>
    </div>
  )
}
