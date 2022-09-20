import { BreakPoints } from '../../constants/AppConstant'
import { useWindowSize } from '../../hook'
import { ListHeaderProps, Type } from './decorator'
import { ListHeader } from './ListHeader'
import { TableView } from './TableView'

export { Column } from './decorator'

type Props<T> = {
  model: Type<T>
  id: string
  baseURL?: string
}

export const ListView = <T extends object>(props: Props<T> & ListHeaderProps) => {
  const windowSize = useWindowSize()

  if (windowSize[0] <= BreakPoints.mobile) {
    // TODO render list as card view
    console.log('Mobile')
  } else if (windowSize[0] <= BreakPoints.tablet) {
    // TODO render as table view
    console.log('Tablet')
  } else {
    console.log('Laptop or Desktop')
  }
  return (
    <>
      <ListHeader {...props}></ListHeader>
      <TableView {...props} pagination />
    </>
  )
}
