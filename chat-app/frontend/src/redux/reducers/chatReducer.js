const initialState={
    messages:[],
}

const chatReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'LOAD_MESSAGES_SUCCESS':
            return {...state,messages:action.payload}
        case 'NEW_MESSAGE':
            return {...state,messages:[...state.messages,action.payload]};
        default:
            return state;
    }
}

export default chatReducer