import React, {Component} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'

import Admin from './containers/admin'
import Login from './containers/login'

export default class App extends Component {
  constructor(props) {
    super(props);
    console.log("init");
  }
  render () {
    return (
     <Switch>
       <Route path='/login' component={Login} />
       <Route path='/admin' component={Admin} />

       <Redirect to='/login'/>
     </Switch>
    )
  }
}