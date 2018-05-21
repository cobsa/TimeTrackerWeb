import React, { Component } from 'react'
import moment from 'moment'
import { Pie } from '@nivo/pie'
/* import PropTypes from 'prop-types' */

export default class Today extends Component {
  // Show
  render() {
    const { records } = this.props
    const today = moment()
    const array = [
      {
        id: 'Workout',
        label: 'Workout',
        value: 0
      },
      {
        id: 'Work',
        label: 'Work',
        value: 0
      },
      {
        id: 'Sleep',
        label: 'Sleep',
        value: 0
      },
      {
        id: 'Free time',
        label: 'Free time',
        value: 0
      }
    ]

    // Filter to only record from today
    records.forEach(record => {
      if (record.done && today.isSame(record.end, 'day')) {
        let duration = 0
        if (today.isSame(record.start, 'day')) {
          duration = moment(record.start).diff(record.end)
        } else {
          duration = today.startOf('day').diff(record.end)
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
      <div className="today">
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
      </div>
    )
  }
}

Today.propTypes = {}
