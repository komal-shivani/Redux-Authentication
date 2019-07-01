import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import App from './App'
import {Provider} from 'react-redux'

import { setUser } from './actions/a-users'
import { setPosts } from './actions/a-posts'

import configureStore from './store/configureStore'
const store=configureStore()

store.subscribe(()=>{
    console.log('redux store state',store.getState())
})

//user reloaded page access, handle through redux

if(localStorage.getItem('userAuthToken')){
    axios.get(`http://dct-user-auth.herokuapp.com/user/account`,{
        headers:{
            'x-auth':localStorage.getItem('userAuthToken')
        }
    })
    .then(response=>{
        store.dispatch(setUser(response.data))
    })

    axios.get('http://dct-user-auth.herokuapp.com/posts',{
        headers:{
            'x-auth':localStorage.getItem('userAuthToken')
        }
    }) 
    .then(response=>{
        const posts=response.data
        store.dispatch(setPosts(posts))
    })
  
}


const jsx= (
   <Provider store={store}>
       <App/>
   </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'))