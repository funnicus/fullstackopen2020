const array = require('lodash/array')
const object = require('lodash/object')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if(blogs.length !== 0){
        return blogs.reduce((total, blog) => {
            return total + blog.likes
        }, 0)
    }
    return 0
}

const favoriteBlog = (blogs) => {
    if(blogs.length !== 0){
        return blogs.reduce((lastLargest, blog) => {
            if(blog.likes > lastLargest.likes){
                return blog
            }
            return lastLargest
        })
    }
    return "Blog list is empty!"
}

const mostBlogs = (blogs) => {
    let names = []
    let authors = []
    if(blogs.length !== 0){
        for(let i = 0; i < blogs.length; i++){
            if(names.indexOf(blogs[i].author) < 0){
                authors = authors.concat([{author: blogs[i].author, blogs: 1}])
                names = names.concat([blogs[i].author])
            }
            else{
                for(let j = 0; j < authors.length; j++){
                    if(blogs[i].author === authors[j].author){
                        authors[j].blogs++
                    }
                }
            }
        }
        return authors.reduce((lastAuthor, currentAuthor) => {
            if(currentAuthor.blogs > lastAuthor.blogs){
                return currentAuthor
            }
            return lastAuthor
        })

    }
    return "Blog list is empty!"
}

const mostLikes = (blogs) => {
    let names = []
    let authors = []
    if(blogs.length !== 0){
        for(let i = 0; i < blogs.length; i++){
            if(names.indexOf(blogs[i].author) < 0){
                authors = authors.concat([{author: blogs[i].author, likes: blogs[i].likes}])
                names = names.concat([blogs[i].author])
            }
            else{
                for(let j = 0; j < authors.length; j++){
                    if(blogs[i].author === authors[j].author){
                        authors[j].likes += blogs[i].likes
                    }
                }
            }
        }
        return authors.reduce((lastAuthor, currentAuthor) => {
            if(currentAuthor.likes > lastAuthor.likes){
                return currentAuthor
            }
            return lastAuthor
        })

    }
    return "Blog list is empty!"
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}