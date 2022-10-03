import { Breadcrumbs, BreadcrumbsProps as MUIBreadcrumbsProps, Link as MUILink, LinkProps } from '@mui/material'
import clsx from 'clsx'
import { capitalizeFirstLetter } from 'sdk'
import styles from './style.module.scss'

type CustomLinkProps = {
  href?: string
  text: string
}

type BreadcrumbsProps = MUIBreadcrumbsProps & {
  pathnames: string[]
}

export const Link = (props: LinkProps & CustomLinkProps) => {
  const { text, href, className, ...rest } = props
  return (
    <MUILink {...rest} className={clsx(styles.Link, styles.Body2, className)} href={href}>
      {text}
    </MUILink>
  )
}

export const BreadcrumbsNavigation = (props: BreadcrumbsProps) => {
  const { className, classes, pathnames, ...rest } = props

  return (
    <Breadcrumbs
      {...rest}
      className={clsx(styles.Breadcrumbs, className)}
      classes={{ li: styles.BreadcrumbsLi, ...classes }}>
      <Link href='/' text='Trang chủ' />

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
        const isLast = index === pathnames.length - 1

        return isLast ? (
          <Link text={capitalizeFirstLetter(name)} />
        ) : (
          <Link href={`${routeTo}`} text={capitalizeFirstLetter(name)} />
        )
      })}
    </Breadcrumbs>
  )
}
