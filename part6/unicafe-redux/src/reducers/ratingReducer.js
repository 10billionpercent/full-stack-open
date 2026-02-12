const initialState = {
    good: 0,
    neutral: 0,
    bad: 0
}

const ratingReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'GOOD':
            return state
        case 'BAD':
            return state
        case 'NEUTRAL':
            return state
        case 'RESET':
            return state
        default:
            return state
    }
}

export default ratingReducer