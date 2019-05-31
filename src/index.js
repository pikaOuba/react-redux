import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './components/pages/App'
import store from './store'
import './assets/commonCss/reset.scss'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/' component={App}></Route>
      </Switch>
    </Router>
  </Provider>
  , document.getElementById('root'))

