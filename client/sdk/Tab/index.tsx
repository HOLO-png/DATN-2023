import { Box, Tab as MUITab, Tabs as MUITabs, TabsProps } from '@mui/material'
import { useState } from 'react'
import styles from './style.module.scss'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

type CustomTabsProps = {
  tabs: {
    label: string
    component: JSX.Element
  }[]
}

export const Tabs = (props: TabsProps & CustomTabsProps) => {
  const { tabs, ...rest } = props
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box>
      <Box>
        <MUITabs
          {...rest}
          onChange={handleChange}
          value={value}
          className={styles.Tabs}
          classes={{
            flexContainer: styles.BasicContainer,
            indicator: styles.BasicIndicator
          }}>
          {tabs.map((item, i) => (
            <MUITab label={item.label} value={i} key={i} />
          ))}
        </MUITabs>
      </Box>
      {tabs.map((item, i) => (
        <TabPanel key={i} value={value} index={i}>
          {item.component}
        </TabPanel>
      ))}
    </Box>
  )
}
