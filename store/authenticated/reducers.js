const initialState = {
    isAuth: false,
}

export default (state = initialState, action) => {
    if(action.type === 'LOGIN'){
        return { 
            ...state,
            isAuth: true
        }
    }
    if(action.type === 'LOGOUT'){
        return { 
            ...state,
            isAuth: false
        }
    }

    return state
}