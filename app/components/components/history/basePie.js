import React, { Component } from 'react'
import PropTypes from 'prop-types'
import momentPropTypes from 'react-moment-proptypes'
import { Pie } from '@nivo/pie'
import moment from 'moment'

export default class BasePie extends Component {
  render() {
    const { records, types, day } = this.props
    const array = []

    types.forEach(type => {
      array.push({
        id: type.name,
        label: type.name,
        value: 0
      })
    })

    // Filter to only record from today
    records.forEach(record => {
      if (record.done && day.isSame(record.end, 'day')) {
        let duration = 0
        if (day.isSame(record.start, 'day')) {
          duration = moment(record.start).diff(record.end)
        } else {
          duration = day.startOf('day').diff(record.end)
        }
        array.forEach((savedDuration, index, originalArray) => {
          if (savedDuration.label === record.type) {
            originalArray[index].value += Math.round(Math.abs(duration / 60000)) // eslint-disable-line
          }
        })
      }
    })
    // Check that there is some data to show
    let totalDuration = 0
    array.forEach(element => {
      totalDuration += element.value
    })
    if (totalDuration === 0) {
      return <div>No data for today!</div>
    }
    return (
      <Pie
        width={450}
        height={450}
        margin={{
          top: 40,
          right: 80,
          bottom: 80,
          left: 80
        }}
        data={array}
        innerRadius={0.6}
        colors="paired"
        padAngle={1}
        cornerRadius={5}
        sliceLabel={e => `${e.value} min(s)`}
        slicesLabelsSkipAngle={5}
        radialLabelsSkipAngle={5}
        radialLabelsLinkDiagonalLength={10}
        radialLabelsLinkHorizontalLength={10}
        radialLabelsLinkOffset={5}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            translateY: 56,
            itemWidth: 100,
            itemHeight: 14,
            symbolSize: 14,
            symbolShape: 'circle'
          }
        ]}
      />
    )
  }
}

BasePie.propTypes = {
  types: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string
    })
  ).isRequired,
  records: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
      type: PropTypes.string,
      done: PropTypes.bool
    })
  ).isRequired,
  day: momentPropTypes.momentObj // eslint-disable-line
}
