import { CREATE_CHAT, CREATE_GROUP_CHAT, GET_USERS_CHAT } from "./ActionType"

const initialState={
     chats:[],
     createGroup: null,
     createChat: null,
}
export const ChatReducer=(store=initialState, {type, payload})=>{
    switch(type){
        case CREATE_CHAT:
            return {
                ...store,
                createChat: payload
            }
        case CREATE_GROUP_CHAT:
            return{
                ...store,
                createGroup: payload
            }
        case GET_USERS_CHAT:
            return{
                ...store,
                chats: payload
            }
        default:
            return store;
    }
}
