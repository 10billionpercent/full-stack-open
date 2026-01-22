import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    console.log('set token', token)
    token = `Bearer ${newToken}`
}

const getBlogs = async () => {
    const config = {
        headers: { Authorization: token }
    }
    const res = await axios.get(`${baseUrl}/my`, config)
    return res.data
}

const addBlog = async (newBlog) => {
    const res = await axios.post(baseUrl, newBlog)
    return res.data
}

const deleteBlog = async (id) => {
    await axios.delete(`${baseUrl}/${id}`)
}

const updateBlog = async (id, updatedBlog) => {
    const res = await axios.put(`${baseUrl}/${id}`, updatedBlog)
    return res.data
}

export default { setToken, getBlogs, addBlog, deleteBlog, updateBlog }