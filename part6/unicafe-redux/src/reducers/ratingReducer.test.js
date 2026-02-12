import deepFreeze from 'deep-freeze'
import { describe, expect, test } from 'vitest'
import ratingReducer from './ratingReducer'

describe('unicafe reducer', () => {
    const initialState = {
    good: 0,
    neutral: 0,
    bad: 0
}

test('should return a proper initial state when called with undefined state', () => {
    const action ={
        type: 'MEOW'
    }

    const newState = ratingReducer(undefined, action)
    expect(newState).toEqual(initialState)
})

test('good is incremented', () => {
    const action ={
        type: 'GOOD'
    }

    const state = initialState

    deepFreeze(state)
    const newState = ratingReducer(state, action)
    expect(newState).toEqual({
        good: 1,
        neutral: 0,
        bad: 0
    })
})

test('neutral is incremented', () => {
    const action ={
        type: 'NEUTRAL'
    }

    const state = initialState

    deepFreeze(state)
    const newState = ratingReducer(state, action)
    expect(newState).toEqual({
        good: 0,
        neutral: 1,
        bad: 0
    })
})

test('bad is incremented', () => {
    const action ={
        type: 'BAD'
    }

    const state = initialState

    deepFreeze(state)
    const newState = ratingReducer(state, action)
    expect(newState).toEqual({
        good: 0,
        neutral: 0,
        bad: 1
    })
})
})