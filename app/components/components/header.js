import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class Header extends Component {
  render() {
    const { logged } = this.props
    return (
      <header>
        <div className="logo">TimeTracker</div>
        <nav>
          <ul>
            <li>
              <NavLink exact to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/history">History</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              {logged ? (
                <NavLink to="/signout">Sign Out</NavLink>
              ) : (
                <NavLink to="/login">Login</NavLink>
              )}
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

Header.propTypes = {
  logged: PropTypes.bool.isRequired
}
