import { Grid, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { BreadcrumbsNavigation, capitalizeFirstLetter } from 'sdk'
import styles from './style.module.scss'

export type PageHeadingProps = {
  extraBreadcrumbs?: ReactNode
}

export const PageHeading = (props: PageHeadingProps) => {
  const { extraBreadcrumbs } = props
  const { pathname } = useLocation()
  const pathnames = pathname.split('/').filter((item) => item)
  const title = pathnames[pathnames.length - 1]

  return (
    <Grid container className={styles.PageHeading}>
      <>
        <Grid item xs={8}>
          {title && <Typography className={styles.Headline5}>{capitalizeFirstLetter(title)}</Typography>}
          <BreadcrumbsNavigation pathnames={pathnames} />
        </Grid>
        {extraBreadcrumbs}
      </>
    </Grid>
  )
}
