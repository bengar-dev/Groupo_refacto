const INITIAL_STATE = {
    cmtsArray: []
}

function cmtReducer(state = INITIAL_STATE, action) {

    switch(action.type) {
        case 'GETCMT': {
            return {
                ...state,
                cmtsArray: action.payload
            }
        }
        case 'POSTCMT': {
          const newArr = [...state.cmtsArray]
          newArr.unshift(action.payload)
            return {
                ...state,
                cmtsArray: newArr
            }
        }

    }

    return state
}

export default cmtReducer
