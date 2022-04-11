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
        case 'DELCMT': {
            const cmtsArr = [...state.cmtsArray]
            let newArr = cmtsArr.filter(cmt => {
                return cmt.id !== action.payload
            })
            return {
                ...state,
                cmtsArray: newArr
            }
        }

        case 'EDITCMT': {
            let newArr = [...state.cmtsArray]
            const findIndex = newArr.findIndex(cmt => cmt.id === action.payload.id)
            newArr[findIndex].msg = action.payload.msg
            return {
                ...state,
                cmtsArr: newArr
            }
        }

    }

    return state
}

export default cmtReducer
