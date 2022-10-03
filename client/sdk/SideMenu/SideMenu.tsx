import { ArrowDropDownRounded, ArrowDropUpRounded, TripOrigin } from '@mui/icons-material'
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar'
import { Box, Collapse, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import clsx from 'clsx'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { menus } from './Data'
import logo from './image/Frame_1.png'
import styles from './style.module.scss'

export const SideMenu = () => {
  const [selected, setSelected] = useState('');
  const router = useLocation()
  const path = router.pathname

  const handleClick = (title: string) => {
    title !== selected ? setSelected(title) : setSelected('')
  }

  return (
    <div className={styles.SideMenu}>
      <div className={styles.logo}>
        <img className={styles.img} src={logo} alt={logo} />
      </div>
      <List className={styles.list} component='nav'>
        {menus.map((item, index) => {
          if (item.children && item.children.length) {
            return (
              <>
                <ListItem button key={index} onClick={() => handleClick(item.title)} className={styles.MenuItem}>
                  <ListItemIcon className={clsx(styles.ListItemIcon, path.includes(item.title.toLowerCase()) && styles.active)}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} className={clsx(styles.Button, styles.ListText, path.includes(item.title.toLowerCase()) && styles.active)} />
                  <Box className={clsx(styles.ListIcon, path.includes(item.title.toLowerCase()) && styles.active)}>
                    {item.title === selected ? <ArrowDropUpRounded /> : <ArrowDropDownRounded />}
                  </Box>
                </ListItem>
                <Collapse in={item.title === selected} timeout="auto" unmountOnExit>
                  {item.children.map((sub, index) => <ListItem className={styles.ListItemSub} key={index}>
                    <NavLink
                      to={sub.path}
                      key={index}
                      className={styles.linkSub}
                    >
                      <Box className={styles.iconData}>
                        {path === sub.path && <TripOrigin />}
                      </Box>
                      <ListItemText primary={sub.title} className={clsx(styles.listItemButton, path === sub.path && styles.subActive)} />
                    </NavLink>
                  </ListItem>
                  )}
                </Collapse>
              </>
            )
          } else {
            return (
              <ListItem button className={styles.MenuItem}>
                <NavLink
                  className={styles.link}
                  to={item.path}
                >
                  <ListItemIcon className={clsx(styles.ListItemIcon, path === item.path && styles.active)}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} className={clsx(styles.Button, styles.ListText, path === item.path && styles.active)} />
                </NavLink>
              </ListItem>
            )
          }
        })}
      </List>
      <footer className={styles.footer}>
        <ViewSidebarIcon className={styles.IconToggle} />
        <span className={styles.text}>Toggle sidebar</span>
      </footer>
    </div>
  )
}