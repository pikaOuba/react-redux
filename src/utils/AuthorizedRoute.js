import React, { Component } from 'react'
import { Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { getMe, setSigning} from '../../stores/user'
import './AuthorizedRoute.css'

class AuthorizedRoute extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  UNSAFE_componentWillMount() {
    const token = localStorage.getItem('TOKEN')
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIzMSwiZ3JvdXBJZCI6MTAsInVzZXJBZ2VudCI6Ik1vemlsbGEvNS4wIChNYWNpbnRvc2g7IEludGVsIE1hYyBPUyBYIDEwXzEzXzYpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS83MS4wLjM1NzguOTggU2FmYXJpLzUzNy4zNiIsInJlbmV3VGltZSI6MTU0NzYxNDYyNiwiaWF0IjoxNTQ3NjExMDI2LCJleHAiOjE1NDgyMTU4MjZ9.2todPrZow5Rsv1YL5JKX2TNtbyf3_rfXXOooVY4FNPo'
    if (token) {
      return this.props.dispatch(getMe(true))
    }
    this.props.dispatch(setSigning(false))
  }

  render() {
    const { component: Component, ...rest } = this.props
    const { signing, me } = this.props
    const isAuthenticated = me && me.id 
    return (
      <Route {...rest} render={props => {
        if (signing) {
          return null
        }

        // return (
        //   <Component {...props} />
        // )
        if (isAuthenticated) {
          //默认设置 localStorage给搜索页面，防止一等页面就报错
          return (
            <Component {...props} />
          )
        }

        return (
          <Redirect to='/login' />
        )
      }} />
    )
  }
}

AuthorizedRoute = connect((state) => {
  return {
    me: state.user.me,
    signing: state.user.signing
  }
})(AuthorizedRoute)

export default AuthorizedRoute
