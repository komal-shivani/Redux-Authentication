export const setPosts=(posts)=>{
    return {type:'SET_POSTS', payload:posts}
}

export const addPosts=(posts)=>{
    return { type:'ADD_POSTS', payload:posts}
}

export const removePost=(id)=>{
    return {type:'REMOVE_POST',payload:id}
}