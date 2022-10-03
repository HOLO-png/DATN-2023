import { Grid } from '@mui/material'
import { ReactNode } from 'react'
import { useListViewStore } from 'sdk'
import { Pagination } from '../Pagination'

export interface CardViewProps<T extends object = any> {
  id: string
  data?: any[]
  cardTemplate?: (args: Record<string, unknown>) => ReactNode
  className?: string
  pagination?: boolean
}

export const CardView = (props: CardViewProps) => {
  const { cardTemplate, id, className, pagination } = props
  const data = useListViewStore((store) => store.listViewMap?.get(id)?.data)

  if (cardTemplate)
    return (
      <>
        <Grid container className={className}>
          {data?.data.map((d) => cardTemplate(d as Record<string, unknown>))}
        </Grid>
        {pagination && <Pagination id={id} />}
      </>
    )
  return <></>
}
