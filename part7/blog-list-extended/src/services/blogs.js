import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null
let config = {}

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const getBlogs = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const addBlog = async (newBlog) => {
  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const deleteBlog = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, config)
}

const updateBlog = async (id, updatedBlog) => {
  const res = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return res.data
}

export default { setToken, getBlogs, addBlog, deleteBlog, updateBlog }
