import React from 'react'
import Link from 'gatsby-link'

import logo from '../img/logo.svg'

const Navbar = () => (
  <nav className="navbar is-dark">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <object class="icon is-large" type="image/svg+xml" data={logo}></object>
          <h1 className="title has-text-white">
            FPGA PRO
          </h1>
        </Link>
      </div>
      <div className="navbar-start">
        <Link className="navbar-item has-text-white" to="/about">
          About
        </Link>
      </div>
      <div className="navbar-end">
      </div>
    </div>
  </nav>
)

export default Navbar
