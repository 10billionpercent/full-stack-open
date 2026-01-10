const { test, describe } = require('node:test')
const assert = require('node:assert')
const mostBlogs = require('../utils/list_helper').mostBlogs

describe('author with most blogs', () => {
  test('of empty list is none', () => {
  const result = mostBlogs([])
  assert.deepStrictEqual(result, 'No authors')
})

  const oneBlog = [{
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Hange Zoë",
    url: "https://titansrwonderful.com/",
    likes: 7,
    __v: 0
  }]

  test('when list has only one blog is the same author', () => {
  const result = mostBlogs(oneBlog)
    assert.deepStrictEqual(result, { author: 'Hange Zoë', blogs: 1 })
})

  const manyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Hange Zoë",
    url: "https://titansrwonderful.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Senku Ishigami",
    url: "https://10billionpercent.com",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Gen Asagiri",
    url: "https://mangandenchi.com",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Edward Elric",
    url: "https://alwaitforme.com",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Orange Cat",
    url: "https://meow.com",
    likes: 2,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d18fc",
    title: "Cat wars",
    author: "Orange Cat",
    url: "https://meow.com",
    likes: 20,
    __v: 0
  } 
]

test('of a bigger list is found correctly', () => {
  const result = mostBlogs(manyBlogs)
  assert.deepStrictEqual(result, { author: 'Orange Cat', blogs: 2 })
})
})