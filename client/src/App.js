import React from 'react'
import {connect} from 'react-redux'
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import _ from 'lodash'

import Register from './components/authentication/register'
import Login from './components/authentication/login'
import Account from './components/authentication/account'
import Logout from './components/authentication/logout'
import Profile from './components/authentication/Profile'
import postShow from './components/authentication/showpost'

class App extends React.Component{
   
  render(){
    // console.log(this.state)
    return(
      <BrowserRouter>
      <div className="container">
          <h2>{this.props.msg}</h2>

        <ul>
            { _.isEmpty(this.props.user) ? ( 
            <div>
              <li><Link to ="/users/register">Register</Link></li>
              <li><Link to="/users/login">Login</Link></li>
            </div>
            ) : (
            <div>
              <li><Link to="/users/account">Account </Link></li>
              <li><Link to="/users/profile">Profile </Link></li>
              <li><Link to="/users/logout">Logout</Link></li>
            </div>
            ) }
        </ul>

        <Switch>
            <Route path="/users/account" component={Account}/>
            <Route path="/users/profile" component={Profile}/>
            <Route path="/users/logout" component={Logout}/>
            <Route path ="/users/register" component={Register}/>
            <Route path="/users/login" component={Login}/>
            <Route path="/posts/:id" component={postShow}/>
        </Switch>
      </div>
      </BrowserRouter>
    )
  }
}
const mapStateToProps=(state)=>{
    return{
        user:state.user,
        msg:'Redux User Authentication'
    }
}

export default connect(mapStateToProps)(App)
