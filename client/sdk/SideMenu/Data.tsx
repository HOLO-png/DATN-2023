import DashboardIcon from '@mui/icons-material/Dashboard'
import HouseSidingIcon from '@mui/icons-material/HouseSiding'
import RuleIcon from '@mui/icons-material/Rule'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import VideoSettingsIcon from '@mui/icons-material/VideoSettings'

export const menus = [
  {
    icon: <DashboardIcon />,
    title: 'Dashboard',
    path: '/',
  },
  {
    icon: <ShoppingBagIcon />,
    title: 'Packages',
    path: '',
    children: [
      {
        title: 'Youtube',
        path: '/packages/youtube',
      },
      {
        title: 'Facebook',
        path: '/packages/facebook',
      },
      {
        title: 'Spotify',
        path: '/packages/spotify',
      },
      {
        title: 'Website',
        path: '/packages/website',
      },
    ],
  },
  {
    icon: <VideoSettingsIcon />,
    title: 'Machines',
    path: '',
    children: [
      {
        title: 'Group',
        path: '/machines/group',
      },
      {
        title: 'Khách hàng',
        path: '/machines/customer',
      },
      {
        title: 'Server',
        path: '/machines/server',
      },
    ],
  },
  {
    icon: <HouseSidingIcon />,
    title: 'Warehouse',
    path: '',
    children: [
      {
        title: 'Proxy',
        path: '/warehouse/proxy',
      },
      {
        title: 'Device',
        path: '/warehouse/device',
      },
      {
        title: 'Account',
        path: '/warehouse/account',
      },
    ],
  },
  {
    icon: <RuleIcon />,
    title: 'Role',
    path: '/role',
  },
  {
    icon: <SupervisedUserCircleIcon />,
    title: 'User',
    path: '/user',
  },
]