import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ActiveRecordDetails extends Component {
  constructor(props) {
    super(props)
    const startDate = new Date(props.start)
    this.state = {
      startTime: startDate,
      timeElapsed: this.timeSince(startDate)
    }
    this.displayTime = this.displayTime.bind(this)
    this.timeSince = this.timeSince.bind(this)
    this.timer = undefined
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        timeElapsed: this.timeSince(this.state.startTime)
      })
    }, 1000)
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
      <div className="record-details">
        <div>Since starting: {this.displayTime()}</div>
        <br />
        <div>Type: {this.props.type}</div>
      </div>
    )
  }
}

ActiveRecordDetails.propTypes = {
  start: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}
