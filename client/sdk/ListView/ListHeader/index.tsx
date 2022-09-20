import { KeyboardArrowDown, Search } from '@mui/icons-material'
import { Grid, MenuItem as MUIMenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import clsx from 'clsx'
import { useState } from 'react'
import { ContainerInputField } from '../../../sdk'
import { useTableStore } from '../../store/table-store'
import { ListHeaderProps } from '../decorator'
import styles from './style.module.scss'

export const ListHeader = (props: ListHeaderProps) => {
  const { title, search, sort, extraHeader } = props
  const onSearch = useTableStore((store) => store.onSearch)
  const [selected, setSelected] = useState('')

  const handleChangeSelected = (event: SelectChangeEvent) => {
    setSelected(event.target.value)
  }

  return (
    <Grid container className={styles.ListHeader}>
      <Grid item xs={3}>
        <Typography className={styles.Subhead1}>{title}</Typography>
      </Grid>
      <Grid item xs={9} className={styles.Item}>
        {sort && (
          <div className={styles.Sort}>
            <Typography className={clsx(styles.Caption, styles.Text)}>Sắp xếp</Typography>
            <Select
              value={selected}
              IconComponent={KeyboardArrowDown}
              onChange={handleChangeSelected}
              className={styles.Select}
              classes={{
                outlined: styles.Outlined,
                icon: styles.Icon,
              }}
              displayEmpty>
              {sort.map((item) => (
                <MUIMenuItem value={item}>{item}</MUIMenuItem>
              ))}
            </Select>
          </div>
        )}

        {search && (
          <ContainerInputField
            placeholder='Tìm kiếm'
            className={styles.Search}
            onChange={() => onSearch}
            InputProps={{
              startAdornment: <Search />,
            }}></ContainerInputField>
        )}

        {extraHeader}
      </Grid>
    </Grid>
  )
}
