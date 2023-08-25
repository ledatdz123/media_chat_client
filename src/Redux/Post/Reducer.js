import { CREATE_NEW_POST, DELETE_POST, GET_SINGLE_POST, GET_USER_POST, LIKE_POST, REQ_USER_POST, SAVE_POST, UN_LIKE_POST, UN_SAVE_POST } from "./ActionType"

const initialValue={
    createPost: null,
    usersPost: [],
    deletePost: null,
    likePost:null,
    unlikePost:null,
    savedPost:null,
    unSavedPost:null,
    singlePost:null,
    reqUserPost:null,
}
export const PostReducer=(store=initialValue, {type, payload})=>{
    if(type===CREATE_NEW_POST){
        return {...store, createPost: payload}
    }else if(type===GET_USER_POST){
        return {...store, usersPost: payload}
    }else if(type===DELETE_POST){
        return {...store, deletePost: payload}
    }else if(type===LIKE_POST){
        return {...store, likePost: payload}
    }else if(type===UN_LIKE_POST){
        return {...store, unlikePost: payload}
    }else if(type===SAVE_POST){
        return {...store, savedPost: payload}
    }else if(type===UN_SAVE_POST){
        return {...store, unSavedPost: payload}
    }else if(type===GET_SINGLE_POST){
        return {...store, singlePost: payload}
    }else if(type===REQ_USER_POST){
        return {...store, reqUserPost: payload}
    }
    return store
}