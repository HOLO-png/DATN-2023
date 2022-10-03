import { useAPI, useWindowSize } from 'hooks/index'
import { ReactNode } from 'react'
import { Data, useListViewStore } from 'sdk'
import { BreakPoints } from '../../constants/AppConstant'
import { CardView } from './CardView'
import { ListHeaderProps, Type } from './decorator'
import { ListHeader } from './ListHeader'
import { TableView } from './TableView'

export { Column } from './decorator'
export * from './ListHeader'
export * from './ListViewSearch'

type Props<T> = {
  model?: Type<T>
  id: string
  baseURL?: string
  cardTemplate?: (args: Record<string, unknown>) => ReactNode
  listViewClasses?: { listHeader?: string; cardView?: string }
}

export const ListView = <T extends object>(props: Props<T> & ListHeaderProps) => {
  const windowSize = useWindowSize()
  const onLoading = useListViewStore((store) => store.onLoading)
  const onData = useListViewStore((store) => store.onData)
  const { cardTemplate, model, id, baseURL = '', listViewClasses } = props

  if (windowSize[0] <= BreakPoints.mobile) {
    // TODO render list as card view
    console.log('Mobile')
  } else if (windowSize[0] <= BreakPoints.tablet) {
    // TODO render as table view
    console.log('Tablet')
  } else {
    console.log('Laptop or Desktop')
  }

  const onShowLoading = () => onLoading(id)

  const onSuccess = (data: Data) => onData(id, data, baseURL)

  useAPI({ baseURL, onShowLoading, onSuccess })

  return (
    <>
      <ListHeader {...props} className={listViewClasses?.listHeader} />
      {model && <TableView {...props} id={id} model={model} pagination />}
      {cardTemplate && <CardView {...props} id={id} pagination className={listViewClasses?.cardView} />}
    </>
  )
}
