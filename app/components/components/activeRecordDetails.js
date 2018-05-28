import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ActivityButton from './activityButton'

export default class ActiveRecordDetails extends Component {
  constructor(props) {
    super(props)
    this.startDate = new Date(this.props.start)
    this.state = {
      timeElapsed: this.timeSince(this.startDate)
    }
    this.displayTime = this.displayTime.bind(this)
    this.timeSince = this.timeSince.bind(this)
    this.timer = undefined
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        timeElapsed: this.timeSince(this.startDate)
      })
    }, 1000)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.start !== nextProps.start) {
      this.startDate = new Date(nextProps.start)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  timeSince(startTime) {
    return Math.floor((new Date().getTime() - startTime.getTime()) / 1000)
  }

  displayTime() {
    /* eslint-disable prefer-template */
    const { timeElapsed } = this.state
    const hours = '00' + Math.floor((timeElapsed / 3600) % 24)
    const minutes = '00' + Math.floor((timeElapsed / 60) % 60)
    const seconds = '00' + timeElapsed % 60
    return hours.slice(-2) + ':' + minutes.slice(-2) + ':' + seconds.slice(-2)
    /* eslint-enable prefer-template */
  }
  
  render() {
    return (
      <div>
        <h2>Since starting: {this.displayTime()}</h2>
        <h3>Type: {this.props.type}</h3>
        <div className="center">
          <ActivityButton className="activity-button" onClick={this.props.onEnd} type="END" />
        </div>
      </div>
    )
  }
}

ActiveRecordDetails.propTypes = {
  start: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onEnd: PropTypes.func.isRequired
}
