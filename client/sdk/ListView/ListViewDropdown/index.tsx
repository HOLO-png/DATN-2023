import { MenuItem as MUIMenuItem } from '@mui/material'
import { DataDropdown, DropdownContained, useListViewStore } from 'sdk'
import styles from './style.module.scss'

type ListViewDropdownProps = {
  labelDropdown?: string
  dropdownItem: Array<DataDropdown>
  id: string
}

export const ListViewDropdown = (props: ListViewDropdownProps) => {
  const { id, labelDropdown, dropdownItem } = props
  const onQuery = useListViewStore((store) => store.onQuery)

  const onChange = (sortKey: any, sortOrder: any) => {
    onQuery(id, { sortKey, sortOrder })
  }
  return (
    <DropdownContained label={labelDropdown} className={styles.ListViewDropdown}>
      <MUIMenuItem value='' onClick={() => onChange(undefined, undefined)}>
        <em>Không</em>
      </MUIMenuItem>
      {dropdownItem.map((item) => (
        <MUIMenuItem onClick={() => onChange(item.code, item.sortOrder)} value={item.code}>
          {item.label}
        </MUIMenuItem>
      ))}
    </DropdownContained>
  )
}
