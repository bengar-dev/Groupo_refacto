const INITIAL_STATE = {
    postsArray: []
}

function postReducer(state = INITIAL_STATE, action) {

    switch(action.type) {
        case 'GETPOST': {
            return {
                ...state,
                postsArray: action.payload
            }
        }

        case 'NEWPOST' : {
            const newArr = [...state.postsArray]
            newArr.unshift(action.payload)
            return {
                ...state,
                postsArray: newArr
            }
        }
    }

    return state
}

export default postReducer