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
    }

    return state
}

export default postReducer