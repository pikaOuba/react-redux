import React, { useEffect } from 'react'
import styles from './App.scss'
import wrap from '../../utils/wrap'
import { connect } from 'react-redux'
import { getOne } from '../../store/common'

let App = (props) => {
  const { dispatch } = props
  
  useEffect(()=>{
    dispatch(getOne())
  })

  console.log('---', props)
  return (
    <div className={styles.app}>
      hello world!
    </div>
  )
}

App = wrap()(App)
App = connect(state=>{
  return {
    one: state.common.one
  }
})(App)
export default App
