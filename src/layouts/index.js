import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import './all.sass'

import 'prismjs/themes/prism-okaidia.css'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="FPGA Pro" />
    <Navbar />
    <div>{children()}</div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
