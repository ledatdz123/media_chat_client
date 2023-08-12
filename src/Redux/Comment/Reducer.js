import { CREATE_COMMENT, GET_POST_COMMENT, LIKE_COMMENT, UN_LIKE_COMMENT } from "./ActionType"

const initialValue={
    createComment: null,
    postComment: null,
    likeComment: null,
    unlikeComment: null,
}
export const CommentReducer=(store=initialValue, {type, payload})=>{
    if(type===CREATE_COMMENT){
        return {...store, createComment: payload}
    }else if(type===GET_POST_COMMENT){
        return {...store, postComment: payload}
    }else if(type===LIKE_COMMENT){
        return {...store, likeComment: payload}
    }else if(type===UN_LIKE_COMMENT){
        return {...store, unlikeComment: payload}
    }
    return store;
}