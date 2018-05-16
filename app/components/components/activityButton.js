import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ActivityButton extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.props.onClick(this.props.type)
  }
  render() {
    return (
      <button className="activity-button" onClick={this.handleClick}>
        {this.props.type}
      </button>
    )
  }
}

ActivityButton.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}
