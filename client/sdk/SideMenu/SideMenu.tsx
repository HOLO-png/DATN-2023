import { List, ListItemButton, ListItemText } from '@mui/material'
import { DataMenu } from './Data'
import styles from './style.module.scss'

export const SideMenu = () => {
  return (
    <div className={styles.SideMenu}>
      <div className={styles.logo}>
        <h4>Dashboard Kit</h4>
      </div>
      <List className={styles.list} component='nav'>
        {DataMenu.map((data, index) => {
          return (
            <div key={index}>
              <ListItemButton className={styles.ListItemButton}>
                {data.icon}
                <ListItemText className={styles.text} primary={data.title} />
              </ListItemButton>
            </div>
          )
        })}
      </List>
    </div>
  )
}
