import {createStore, combineReducers} from 'redux'
import usersReducer from '../reducers/r-users';
import postsReducer from '../reducers/r-posts'

const configureStore=()=>{
    const store=createStore(combineReducers({
        user:usersReducer,
        posts:postsReducer
    }))
    return store
}

export default configureStore