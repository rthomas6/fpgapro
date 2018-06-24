import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import './all.sass'

import 'prismjs/themes/prism-tomorrow.css'
import favicon from '../../static/img/favicon.ico'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet>
      <title>FPGA Pro</title>
      <link rel="shortcut icon" href={favicon} /> 
    </Helmet>
    <Navbar />
    <div>{children()}</div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
