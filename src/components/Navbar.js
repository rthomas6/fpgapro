import React from 'react'
import Link from 'gatsby-link'

import logo from '../img/logo.svg'
import rss from '../img/rss-feed.svg'

const Navbar = () => (
  <nav className="navbar is-dark">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <object className="image is-48x48" type="image/svg+xml" data={logo}></object>
          <h1 className="title has-text-white">
            FPGA Pro
          </h1>
        </Link>
      </div>
      <div className="navbar-start">
      </div>
      <div className="navbar-end">
        <Link className="navbar-item has-text-white" to="/about">
          About
        </Link>
        <span className="navbar-item">
          <a href="/rss.xml" className="">
              <img src={rss} className="image is-24x24" />
          </a>
        </span>
      </div>
    </div>
  </nav>
)

export default Navbar
