const anecdoteReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_ANECDOTE':
            return [...state, action.payload]
        case 'VOTE': {
            const id = action.payload.id
            const anecdoteToVote = state.find(a => a.id === id)
            const votedAnecdote = {
                ...anecdoteToVote,
                votes: anecdoteToVote.votes + 1
            }
            return state.map(a => (a.id !== id ? a : votedAnecdote))
        }
        default:
            return state
    }
}

const generateId = () => Number((Math.random() * 9876543210)).toFixed(0)

export const createAnecdote = content => {
    return {
        type: 'NEW_ANECDOTE',
        payload: {
            content, 
            votes: 0,
            id: generateId()
        }
    }
}

export const voteAnecdote = id => {
    return {
        type: 'VOTE',
        payload: { id }
    }
}

export default anecdoteReducer