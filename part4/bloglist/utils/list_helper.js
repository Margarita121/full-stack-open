const _ = require('lodash');

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
      }
    
      return blogs.length === 0
      ? 0
      : blogs.reduce(reducer, 0)
  }

const favoriteBlog = (blogs) => {
    const reducer = (max, item) => {
        return max.likes > item.likes ? max : item
      }

      return blogs.length === 0
      ? 0
      : blogs.reduce(reducer, 0)
  }

function mostBlogs(blogs) {
    let freq = _.countBy(blogs, 'author');
    let objArr = [] 
    for (const element of Object.entries(freq)) {
        objArr.push( {author:element[0], blogs:element[1]} );
      }
    //   console.log("objarr")
    //   console.log(objArr)
    let maxval = _.maxBy(objArr, 'author' );
    // console.log("maxval")
    // console.log(maxval)
    return maxval
  }

function mostLikes(blogs) {
    let maxLikesBlog = _.maxBy(blogs, 'likes' );
    // console.log("max")
    // console.log(maxLikesBlog)

    return {author: maxLikesBlog.author, likes: maxLikesBlog.likes}
  }
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }