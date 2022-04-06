const INITIAL_STATE = {
    userForm: [],
    msgForm : ''
}

function formReducer(state = INITIAL_STATE, action) {

    switch(action.type) {
        case 'REGISTER': {
            return {
                ...state,
                userForm: action.payload,
                msgForm: 'Vous êtes bien enregistré'
            }
        }
    }

    return state
}

export default formReducer