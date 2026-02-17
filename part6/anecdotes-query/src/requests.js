const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const res = await fetch(baseUrl)

    if (!res.ok) {
        throw new Error('failed to fetch anecdotes')
    }

    return await res.json()
}

export const createAnecdote = async (anecdote) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdote)
    }

    const res = await fetch(baseUrl, options)

    if (!res.ok) {
        throw new Error('failed to add anecdote')
    }

    return await res.json()
}