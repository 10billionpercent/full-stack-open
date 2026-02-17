import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        createAnecdote(state, action) {
            state.push(action.payload)
        },
        voteAnecdote(state, action) {
            const id = action.payload
            const anecdoteToVote = state.find(a => a.id === id)
            const votedAnecdote = {
                ...anecdoteToVote,
                votes: anecdoteToVote.votes + 1
            }
            return state.map(a => (a.id !== id ? a : votedAnecdote))
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

const { setAnecdotes, createAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async (dispatch) => {
   const anecdotes = await anecdoteService.getAll()
   dispatch(setAnecdotes(anecdotes))
    }
}

export const appendAnecdote = (content) => {
   return async (dispatch) => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
   }
}

export const { voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer