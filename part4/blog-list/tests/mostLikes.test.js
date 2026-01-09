const { test, describe } = require('node:test')
const assert = require('node:assert')
const mostLikes = require('../utils/list_helper').mostLikes

describe('author with most likes', () => {
  test('of empty list is none', () => {
  const result = mostLikes([])
  assert.deepStrictEqual(result, 'No authors')
})

  const oneLike = [{
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Hange Zoë",
    url: "https://titansrwonderful.com/",
    likes: 7,
    __v: 0
  }]

  test('when list has only one blog is the same author', () => {
  const result = mostLikes(oneLike)
  assert.deepStrictEqual(result, { author: 'Hange Zoë', likes: 7 })
})

  const manyLikes = [
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
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Edward Elric",
    url: "https://alwaitforme.com",
    likes: 0,
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
  const result = mostLikes(manyLikes)
  assert.deepStrictEqual(result, { author: 'Orange Cat', likes: 22 })
})
})