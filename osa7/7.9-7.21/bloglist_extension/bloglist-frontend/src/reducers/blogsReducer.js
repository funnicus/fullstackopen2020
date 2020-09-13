import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_BLOG':
      return state.concat(action.data)
    case 'LIKE_BLOG':
      const id = action.id
      console.log(action.updatedBlog)
      return state.map(b =>
        b.id !== id ? b : action.updatedBlog
      )
    case 'REMOVE_BLOG':
        console.log('Nyt jumalauta')
        const index = state.map(b => b.id).indexOf(action.id)
        const head = state.slice(0, index)
        console.log(head)
        const tail = state.slice(index + 1, state.length)
        console.log(tail)
        const newBlogList = [ ...head, ...tail ]
        console.log(newBlogList)
        return newBlogList
    case 'COMMENT_ON_BLOG':
        return state.map(b =>
            b.id !== action.id ? b : { ...b, comments: b.comments.concat(action.comment) }
          )
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export const likeOneBlog = id => {
  return async dispatch => {
    const oldBlog = await blogService.getOne(id)
    const newBlog = { ...oldBlog }
    newBlog.likes++
    const updatedBlog = await blogService.update(id, newBlog)
    dispatch({
      type: 'LIKE_BLOG',
      id,
      updatedBlog
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    console.log(newBlog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const deleteBlog = id => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
          type: 'REMOVE_BLOG',
          id
        })
      }
  }

  export const commentOnBlog = (id, comment) => {
    return async dispatch => {
        await blogService.commentBlog(id, { comment })
        dispatch({
          type: 'COMMENT_ON_BLOG',
          id,
          comment
        })
      }
  }

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export default blogsReducer