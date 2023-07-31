import axios from "axios"
import { REQUEST_CREATE_POST } from "./ActionType"
export const postAction=(data)=>(dispatch, getState)=>{
    try {
        dispatch({
            type: 'REQUEST_CREATE_POST',
            payload: data
        })
        localStorage.setItem("post", JSON.stringify(getState().post.postItem))
    } catch (error) {
        console.log(error)
    }
}
export const reqAction=(data)=>(dispatch, getState)=>{
    try {
        dispatch({
            type: 'REQUEST_POST',
            payload: data
        })
        localStorage.setItem("post", JSON.stringify(getState().post.postItem))
    } catch (error) {
        console.log(error)
    }
}