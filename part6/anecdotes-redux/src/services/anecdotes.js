const baseUrl = 'http://localhost:3002/anecdotes'

const getAll = async () => {
    const res = await fetch(baseUrl)

    if (!res.ok) {
        throw new Error('failed to fetch anecdotes')
    }

    return await res.json()
}

export default { getAll }