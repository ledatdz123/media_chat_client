import { REQUEST_CREATE_POST, REQUEST_DELETE_POST, REQUEST_RESET } from "./ActionType"

export const PostReducer=(store={postItem: []}, action)=>{
    switch(action.type){
        case 'REQUEST_POST':
            return {
                ...store,
                postItem: action.payload
            }
        case 'REQUEST_CREATE_POST':
            const item=action.payload
            return{
                ...store,
                postItem: [...store.postItem, item]
            }
        case REQUEST_DELETE_POST:
            return{
                ...store,
                postItem: store.postItem.filter(x=>x!==x.action.payload)
            }
        case REQUEST_RESET:
            return{
                postItem:[]
            }
        default:
            return store;
    }
}