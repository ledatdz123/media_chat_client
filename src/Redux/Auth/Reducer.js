import { ERROR_USER, FOLLOW_USER, GET_USER_BY_IDS, REQ_USER, SEARCH_USER, SIGN_IN, SIGN_UP, UN_FOLLOW_USER, UPDATE_USER } from "./ActionType";
const initialValues={
    signup: null,
    signin: null,
    reqUser: null,
    findUsersByIds: [],
    followUser: null,
    unFollowUser: null,
    updateUser: null,
    errorUser: null,
}
export const AuthReducer=(store=initialValues, {type, payload})=>{
    if(type===SIGN_IN){
        return {...store, signin:payload}
    }
    if(type===SIGN_UP){
        return {...store, signup:payload}
    }
    if(type===REQ_USER){
        return {...store, reqUser:payload}
    }
    if(type===SEARCH_USER){
        return {...store, searchUser:payload}
    }
    if(type===UPDATE_USER){
        return {...store, updateUser:payload}
    }
    if(type===GET_USER_BY_IDS){
        return {...store, findUsersByIds:payload}
    }
    if(type===FOLLOW_USER){
        return {...store, followUser:payload}
    }
    if(type===UN_FOLLOW_USER){
        return {...store, unFollowUser:payload}
    }
    if(type===ERROR_USER){
        return {...store, errorUser:payload}
    }
    return store;
}