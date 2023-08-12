import axios from "axios"
import { BASE_API } from "../../config/api"
import { CREATE_COMMENT, GET_POST_COMMENT, LIKE_COMMENT, UN_LIKE_COMMENT } from "./ActionType"

export const createCommentAction=(data)=>async(dispatch)=>{
    try {
        const res= await axios(
            {
                method: 'POST',
                baseURL: `${BASE_API}/api/comments/`,
                url: `post/${data.postId}`,
                data: data.data,
                headers: {
                    "Authorization": /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${data.jwt}`,
                    "Content-Type": "application/json" 
                },
            }
        )
        const resData=await res.data
        console.log("create comment", resData)
        dispatch({
            type: CREATE_COMMENT,
            payload: resData
        })
    } catch (error) {
        console.log("catch error", error)
    }
}
export const findPostCommentAction=(data)=>async(dispatch)=>{
    try {
        const res= await axios(
            {
                method: 'GET',
                baseURL: `${BASE_API}/api/comments/`,
                url: `post/${data.postId}`,
                headers: {
                    "Authorization": /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${data.jwt}`,
                    "Content-Type": "application/json" 
                },
            }
        )
        const resData=await res.data
        console.log("search comment", resData)
        dispatch({
            type: GET_POST_COMMENT,
            payload: resData
        })
    } catch (error) {
        console.log("catch error", error)
    }
}
export const likeCommentAction=(data)=>async(dispatch)=>{
    try {
        const res= await axios(
            {
                method: 'POST',
                baseURL: `${BASE_API}/api/comments/`,
                url: `like/${data.commentId}`,
                headers: {
                    "Authorization": /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${data.jwt}`,
                    "Content-Type": "application/json" 
                },
            }
        )
        const resData=await res.data
        console.log("like-----------comment-------------", resData)
        dispatch({
            type: LIKE_COMMENT,
            payload: resData
        })
    } catch (error) {
        console.log("catch error", error)
    }
}
export const unLikeCommentAction=(data)=>async(dispatch)=>{
    try {
        const res= await axios(
            {
                method: 'DELETE',
                baseURL: `${BASE_API}/api/comments/`,
                url: `unlike/${data.commentId}`,
                headers: {
                    "Authorization": /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${data.jwt}`,
                    "Content-Type": "application/json" 
                },
            }
        )
        const resData=await res.data
        console.log("searchData", resData)
        dispatch({
            type: UN_LIKE_COMMENT,
            payload: resData
        })
    } catch (error) {
        console.log("catch error", error)
    }
}