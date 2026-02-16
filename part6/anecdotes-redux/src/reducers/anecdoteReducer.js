import { createSlice } from "@reduxjs/toolkit"

const generateId = () => Number((Math.random() * 9876543210)).toFixed(0)

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        createAnecdote(state, action) {
            const content = action.payload
            state.push({
            content, 
            votes: 0,
            id: generateId()
        })
        },
        voteAnecdote(state, action) {
            const id = action.payload
            const anecdoteToVote = state.find(a => a.id === id)
            const votedAnecdote = {
                ...anecdoteToVote,
                votes: anecdoteToVote.votes + 1
            }
            return state.map(a => (a.id !== id ? a : votedAnecdote))
        }
    }
})

export const { createAnecdote, voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer