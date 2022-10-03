import { Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import { ListViewSearch, Tabs } from 'sdk'
import { ListHeaderProps } from '../decorator'
import { ListViewDropdown } from '../ListViewDropdown'
import styles from './style.module.scss'

export const ListHeader = (props: ListHeaderProps) => {
  const { className, title, subheader, search, dropdown, tab, extraHeader, id = '', labelDropdown } = props
  return (
    <>
      <Grid container className={clsx(styles.ListHeader, className)}>
        <Grid item xs={4}>
          <Typography className={styles.Subhead1}>{title}</Typography>
          <Typography className={clsx(styles.Caption, styles.Subheader)}>{subheader}</Typography>
        </Grid>
        <Grid item xs={8} className={styles.Item}>
          {dropdown && <ListViewDropdown dropdownItem={dropdown} id={id} labelDropdown={labelDropdown} />}
          {search && <ListViewSearch id={id} />}
          {extraHeader}
        </Grid>
      </Grid>
      {tab && (
        <Grid container className={clsx(styles.Tabs, tab.className)}>
          <Grid item xs={6}>
            <Tabs tabs={tab.tabs} />
          </Grid>
          <Grid item xs={6} className={styles.Item}>
            {tab.dropdown && <ListViewDropdown dropdownItem={tab.dropdown} id={id} labelDropdown={labelDropdown} />}
            {tab.search && <ListViewSearch id={id} />}
          </Grid>
        </Grid>
      )}
    </>
  )
}
