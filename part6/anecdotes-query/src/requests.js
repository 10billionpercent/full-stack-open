const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const res = await fetch(baseUrl)

    if (!res.ok) {
        throw new Error('failed to fetch anecdotes')
    }

    return await res.json()
}