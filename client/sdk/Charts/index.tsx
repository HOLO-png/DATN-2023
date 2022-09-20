import { Animation } from '@devexpress/dx-react-chart'
import { ArgumentAxis, Chart, Legend, LineSeries, Title, ValueAxis } from '@devexpress/dx-react-chart-material-ui'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import dayjs from 'dayjs'
import * as React from 'react'
import styles from './style.module.scss'
const PREFIX = 'Demo'

const classes = {
  chart: `${PREFIX}-chart`
}

const format = () => (tick) => tick

const Root = (props) => <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
const Label = (props) => <Legend.Label sx={{ pt: 1, whiteSpace: 'nowrap' }} {...props} />
const Item = (props) => <Legend.Item sx={{ flexDirection: 'column' }} {...props} />

const ValueLabel = (props) => {
  console.log(props)

  const { text } = props
  return <ValueAxis.Label {...props} text={`${text}%`} className={styles.AxitLabel} />
}

const ArgumentLable = (props) => {
  console.log(props)

  const { text } = props
  return <ArgumentAxis.Label {...props} text={`${text}`} className={styles.AxitLabel} />
}
const TitleText = (props) => <Title.Text {...props} sx={{ whiteSpace: 'pre' }} />

const StyledChart = styled(Chart)(() => ({
  [`&.${classes.chart}`]: {
    paddingRight: '20px',
    backgroundColor: '#1C1C21',
    color: 'white'
  }
}))
export const CoreChart = (props: any) => {
  const { dataChart } = props
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    const dataCustom = dataChart[0]?.data.map((coretempItem: any) => {
      const dataModernSelectByTime = dataChart[1]?.data.find((modemItem: any) => modemItem.time === coretempItem.time)
      return {
        time: dayjs(coretempItem.time).format('HH:MM:ss'),
        coretemp: coretempItem.value,
        mordernPctemp: dataModernSelectByTime.value ?? 0
      }
    })
    setData(dataCustom)
  }, [dataChart])

  console.log(data)

  return (
    <Paper className={styles.PaperChart}>
      <StyledChart data={dataChart} className={classes.chart} height={360}>
        <ArgumentAxis labelComponent={ValueLabel} tickFormat={format} />
        <ValueAxis labelComponent={ValueLabel} tickFormat={format} />
        <LineSeries name={dataCoretemp?.label} valueField='coretemp' argumentField='time' color='yellow' />
        <LineSeries name={dataModern?.label} valueField='mordernPctemp' argumentField='time' color='green' />
        <Legend position='bottom' rootComponent={Root} itemComponent={Item} labelComponent={Label} />
        <Title text={'Core Temp'} textComponent={TitleText} />
        <Animation />
      </StyledChart>
    </Paper>
  )
}
export class CoreChart extends React.PureComponent {
  constructor(props) {
    const { apiData } = props
    super(props)
    console.log(apiData)
    console.log(this)
    const dataChart = apiData[0]?.data.map((item) => {
      const dataModernSelectByTime = apiData[1]?.data.find((data) => data.time === item.time)
      return {
        time: dayjs(item.time).format('HH:MM:ss'),
        coretemp: item.value,
        mordernPctemp: dataModernSelectByTime.value ?? 0
      }
    })
    this.state = {
      dataCoretemp: apiData[0],
      dataModern: apiData[1],
      data: dataChart
    }
  }

  render() {
    const { data: dataChart, dataCoretemp, dataModern } = this.state

    return (
      <Paper className={styles.PaperChart}>
        <StyledChart data={dataChart} className={classes.chart} height={360}>
          <ArgumentAxis labelComponent={ValueLabel} tickFormat={format} />
          <ValueAxis labelComponent={ValueLabel} tickFormat={format} />
          <LineSeries name={dataCoretemp?.label} valueField='coretemp' argumentField='time' color='yellow' />
          <LineSeries name={dataModern?.label} valueField='mordernPctemp' argumentField='time' color='green' />
          <Legend position='bottom' rootComponent={Root} itemComponent={Item} labelComponent={Label} />
          <Title text={'Core Temp'} textComponent={TitleText} />
          <Animation />
        </StyledChart>
      </Paper>
    )
  }
}

////

export class SignalChart extends React.PureComponent {
  constructor(props) {
    const { dataSignal } = props
    super(props)
    console.log(dataSignal)
    console.log(this)
    const dataChartSignal = dataSignal?.data.map((item) => {
      return {
        time: dayjs(item.time).format('HH:MM:ss'),
        signal: item.value
      }
    })
    this.state = {
      dataSignall: dataSignal,
      data: dataChartSignal
    }
  }

  render() {
    const { data: dataChartSignal, dataSignall } = this.state

    return (
      <Paper>
        <StyledChart data={dataChartSignal} className={classes.chart} height={360}>
          <ArgumentAxis tickFormat={format} />
          <ValueAxis labelComponent={ValueLabel} tickFormat={format} />
          <LineSeries name={dataSignall?.label} valueField='signal' argumentField='time' color='yellow' />
          <Legend position='bottom' rootComponent={Root} itemComponent={Item} labelComponent={Label} />
          <Title text={'Core Temp'} textComponent={TitleText} />
          <Animation />
        </StyledChart>
      </Paper>
    )
  }
}
