const initialState={
    status: false
}
const GlobalLoadingReducer=(state=initialState, action)=>{
    switch(action.type){
        case "CONTROL_LOADING":
            state={
                status: action.status
            }
            return state
        default:
            return state
    }
}
export default GlobalLoadingReducer