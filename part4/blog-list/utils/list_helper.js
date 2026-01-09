const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.length === 0 
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(blog => blog.likes) 
    return blogs.length === 0
    ? 'No blogs'
    : blogs[likes.indexOf(Math.max(...likes))].title
}

const mostBlogs = (blogs) => {
    const blogCounts = new Map()
    blogs.forEach(blog => {
        const author = blog.author
        const count = blogCounts.get(author)
        if(blogCounts.has(author)){
           blogCounts.set(author, count + 1)
        }
        else {
            blogCounts.set(author, 1)
        }
    })
    let maxBlogs = 0
    let topAuthor = ''
    blogCounts.forEach((count, author) => {
        if(count > maxBlogs) {
            maxBlogs = count
            topAuthor = author
        }
    })
    if (maxBlogs === 0) {
        return 'No authors'
    }
    return { author: topAuthor, 
        blogs: maxBlogs
    }
}

const mostLikes = (blogs) => {
    const likeCounts = new Map()
    blogs.forEach(blog => {
        const author = blog.author
        const likes = likeCounts.get(author)
        if(likeCounts.has(author)){
           likeCounts.set(author, likes + blog.likes)
        }
        else {
            likeCounts.set(author, blog.likes)
        }
    })
    let maxLikes = 0
    let topAuthor = ''
    likeCounts.forEach((count, author) => {
        if(count > maxLikes) {
            maxLikes = count
            topAuthor = author
        }
    })
    if (maxLikes === 0) {
        return 'No authors'
    }
    return { author: topAuthor, 
        likes: maxLikes
    }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }