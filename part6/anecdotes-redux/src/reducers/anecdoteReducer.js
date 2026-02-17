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
            const anecdoteUpdatedInServer = action.payload
            return state.map(a => a.id === anecdoteUpdatedInServer.id 
                ? anecdoteUpdatedInServer : a)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

const { setAnecdotes, createAnecdote, voteAnecdote } = anecdoteSlice.actions

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

export const increaseVotes = (anecdote) => {
   return async (dispatch) => {
        const votedAnecdote = {
                ...anecdote,
                votes: anecdote.votes + 1
            }
        const updatedAnecdote = await anecdoteService.updateVotes(votedAnecdote)
        dispatch(voteAnecdote(updatedAnecdote))
   }
}

export default anecdoteSlice.reducer