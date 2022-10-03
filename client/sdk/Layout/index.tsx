import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  BoxProps,
  createTheme,
  CssBaseline,
  Drawer,
  IconButton,
  ThemeProvider,
  Toolbar,
  useMediaQuery
} from '@mui/material'
import { useRef, useState } from 'react'
import { Header } from '../Header'
import { SideMenu } from '../SideMenu/SideMenu'
import { PageHeading, PageHeadingProps } from './PageHeading'
import styles from './style.module.scss'

const drawerWidth = 260

const theme = createTheme({ typography: { fontFamily: 'Readex Pro' } })

interface Props extends BoxProps {}

export declare type HeaderProps = PageHeadingProps & {
  title?: string
  src?: string
  username?: string
}

export function Layout(props: Props & HeaderProps): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false)
  const matches = useMediaQuery('(min-width: 900px')
  const { current: container } = useRef(document.getElementsByTagName('body')[0])
  const drawer = <SideMenu />
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  return (
    <ThemeProvider theme={theme}>
      <Box className={styles.AppLayout}>
        <CssBaseline />
        <AppBar
          className={styles.Appbar}
          position='fixed'
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px`, md: `${drawerWidth}px` }
          }}>
          <Toolbar className={styles.Toolbar}>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { md: 'none' }
              }}>
              <MenuIcon />
            </IconButton>
            <Header {...props} />
          </Toolbar>
        </AppBar>
        <Box
          component='nav'
          sx={{ width: { sm: drawerWidth, md: drawerWidth }, flexShrink: { sm: 0, md: 0 } }}
          aria-label='mailbox folders'>
          <Drawer
            container={container}
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}>
            {drawer}
          </Drawer>
          <Drawer
            variant='permanent'
            sx={{
              display: { xs: 'none', sm: 'none', md: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
            open>
            {drawer}
          </Drawer>
        </Box>
        <Box
          component='main'
          sx={{
            padding: '15px',
            marginLeft: `${matches ? drawerWidth : 0}px`,
            width: `calc(100% - ${matches ? drawerWidth : 0}px)`
          }}>
          <Toolbar />
          <PageHeading {...props} />
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}
