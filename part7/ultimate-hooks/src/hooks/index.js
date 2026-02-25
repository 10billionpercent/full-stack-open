import { useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
   const allResources = await axios.get(baseUrl)
   setResources(allResources.data)
  }

  const create = async (resource) => {
    const createdResource = await axios.post(baseUrl, resource)
    setResources(prev => prev.concat(createdResource.data))
  }

  const service = {
    getAll,
    create
  }

  return [
    resources, service
  ]
}
