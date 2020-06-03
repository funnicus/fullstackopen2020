import React from 'react'

const CreateBlogForm = ({ handleCreate, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange }) => (
    <div>
      <h2>Create a new Blog</h2>
      <form onSubmit={handleCreate}>
        <div>          
          title:            
            <input            
              type="text"            
              value={title}            
              name="Title"            
              onChange={e => handleTitleChange(e)}          
            />        
        </div>        
        <div>          
          author:           
          <input            
            type="text"            
            value={author}            
            name="Author"            
            onChange={e => handleAuthorChange(e)}          
          />        
        </div>        
        <div>          
          url:          
          <input            
            type="text"            
            value={url}            
            name="Url"            
            onChange={e => handleUrlChange(e)}          
          />        
        </div>        
        <button type="submit">create</button>      
      </form>
    </div>
    )

export default CreateBlogForm