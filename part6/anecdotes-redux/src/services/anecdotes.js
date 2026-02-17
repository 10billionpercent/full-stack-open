const baseUrl = 'http://localhost:3002/anecdotes'

const getAll = async () => {
    const res = await fetch(baseUrl)

    if (!res.ok) {
        throw new Error('failed to fetch anecdotes')
    }

    return await res.json()
}

const createNew = async (content) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content, 
            votes: 0
        })
    }

    const res = await fetch(baseUrl, options)

    if (!res.ok) {
        throw new Error('failed to add anecdote')
    }

    return await res.json()
}

const updateVotes = async (anecdote) => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdote)
    }

    const res = await fetch(`${baseUrl}/${anecdote.id}`, options)

    if (!res.ok) {
        throw new Error('failed to vote anecdote')
    }

    return await res.json()
}

export default { getAll, createNew, updateVotes }