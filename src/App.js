import React, {Component} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'

import Admin from './pages/admin/index.jsx'
import Login from './pages/login'

export default class App extends Component {
  render () {
    return (
     <Switch>
       <Route path='/admin' component={Admin} />
       <Route path='/login' component={Login} />
       <Redirect to='/login'/>
     </Switch>
    )
  }
}