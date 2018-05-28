import React, { Component } from 'react'
import { PulseLoader } from 'react-spinners'

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <PulseLoader loading size={50} color="#3f88c5" />
      </div>
    )
  }
}
