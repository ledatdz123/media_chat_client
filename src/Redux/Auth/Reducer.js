import { REQ_USER, SEARCH_USER, SIGN_IN, SIGN_UP } from "./ActionType";
const initialValues={
    signup: null,
    signin: null,
    reqUser:null,
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
    return store;
}