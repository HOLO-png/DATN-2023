import { Search as IconSearch } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { ContainerInputField, useListViewStore } from 'sdk'
import { useDebounce } from 'use-debounce'
import styles from './style.module.scss'

export const ListViewSearch = (props: { id: string }) => {
  const [value, setValue] = useState<string>('')
  const [debouncedValue] = useDebounce<string>(value, 500)
  const onQuery = useListViewStore((store) => store.onQuery)

  useEffect(() => {
    onQuery(props.id, { keyword: debouncedValue, page: 1 })
  }, [debouncedValue])

  const onChangeSearch = (e: any) => {
    setValue(e.target.value)
  }

  return (
    <ContainerInputField
      placeholder='Tìm kiếm'
      className={styles.ListViewSearch}
      onChange={onChangeSearch}
      InputProps={{
        startAdornment: <IconSearch />
      }}
    />
  )
}
