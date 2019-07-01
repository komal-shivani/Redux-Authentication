import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PostForm from './PostForm'
import {removePost} from '../../actions/a-posts'
import axios from 'axios'

const Profile=(props)=>{

    const handleRemove=(id)=>{
        const confirm=window.confirm('Are You Sure?')
        if(confirm){
            // props.dispatch(removePost(id))
            axios.delete(`http://dct-user-auth.herokuapp.com/posts/${id}`,{
                headers:{
                    'x-auth':localStorage.getItem('userAuthToken')
                }
            })
            .then(response=>{
                //   props.dispatch(removePost(response.data._id))
                //if(serverRejected) //props.dispatch(addPost())
                props.dispatch(removePost(id))
                console.log('response from server')
            })
          
        }
    }

    return(
        <div>
            Profile component
            <p>{props.user.username}</p>
            <h2>Total posts:{props.posts.length}</h2>
            <ul>
                {props.posts.map(post=>{
                    return <li key={post._id}>
                        <Link to={`/posts/${post._id}`}>{post.title}</Link>
                    <button onClick={()=>{handleRemove(post._id)}}>Remove</button>
                    </li>
                })}
            </ul>  
            <h4>Add Post</h4>
            <PostForm/>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        user:state.user,
        posts:state.posts
    }
}

export default connect(mapStateToProps)(Profile)