import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = () => {
  return { }
}

export default () => {
  return (WrappedComponent) => connect(mapStateToProps) ((props) => {
    return (<WrappedComponent {...props} />)
  }
  )
}
