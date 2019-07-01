import React from 'react'
import { connect } from 'react-redux'

const ShowPost = (props) => {
    return (
        <div>
            {props.post && <h2> {props.post.title}</h2>}
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        post: state.posts.find(post => {
            return post._id === props.match.params.id
        })
    }
}

export default connect(mapStateToProps)(ShowPost)