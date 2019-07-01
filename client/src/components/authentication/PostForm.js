import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {addPosts} from '../../actions/a-posts'

class PostForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:''
        }
    }

    handleChange=(e)=>{
       e.persist()
        this.setState(()=>({
            title:e.target.value
        }))
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            title:this.state.title
        }
        console.log(formData)
        // this.props.dispatch(addPost(formData))
        axios.post('http://dct-user-auth.herokuapp.com/posts', formData,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            const posts=response.data
            this.props.dispatch(addPosts(posts))
            this.setState({
                title:' '
            })
        })
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Title:
                        <input type="text" value={this.state.title}
                        onChange={this.handleChange}/>
                    </label>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}


export default connect()(PostForm)