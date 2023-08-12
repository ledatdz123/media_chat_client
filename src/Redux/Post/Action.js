import { CREATE_NEW_POST, DELETE_POST, GET_SINGLE_POST, GET_USER_POST, LIKE_POST, REQ_USER_POST, SAVE_POST, UN_LIKE_POST, UN_SAVE_POST } from "./ActionType"
import { BASE_API } from '../../config/api'
import axios from "axios"
export const createPostAction=(data)=>async(dispatch)=>{
    try {
        const res= await axios(
            {
                method: 'POST',
                baseURL: `${BASE_API}/api/posts/`,
                url: `create`,
                data: data.data,
                headers: {
                    "Authorization": /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${data.jwt}`,
                    "Content-Type": "application/json" 
                },
            }
        )
        const resData=await res.data
        console.log("CREATE---NEW---POST---------", resData)
        dispatch({
            type: CREATE_NEW_POST,
            payload: resData
        })
    } catch (error) {
        console.log("catch error", error)
    }
}
export const findUserPostAction=(data)=>async(dispatch)=>{
    console.log('data----------sssssssssssd-------------', data.userIds)
    try {
        const res= await axios(
            {
                method: 'GET',
                baseURL: `${BASE_API}/api/posts/`,
                url: `follow/${data.userIds}`,
                headers: {
                    "Authorization": /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${data.jwt}`,
                    "Content-Type": "application/json" 
                },
            }
        )
        const resData=await res.data
        console.log("searchData", resData)
        dispatch({
            type: GET_USER_POST,
            payload: resData
        })
    } catch (error) {
        console.log("catch error", error)
    }
}
export const reqUserPostAction=(data)=>async(dispatch)=>{
    try {
        const res= await axios(
            {
                method: 'GET',
                baseURL: `${BASE_API}/api/posts/`,
                url: `user/${data.userId}`,
                headers: {
                    "Authorization": /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${data.token}`,
                    "Content-Type": "application/json" 
                },
            }
        )
        const resData=await res.data
        console.log("searchData", resData)
        dispatch({
            type: REQ_USER_POST,
            payload: resData
        })
    } catch (error) {
        console.log("catch error", error)
    }
}
export const likePostAction=(data)=>async(dispatch)=>{
    try {
        const res= await axios(
            {
                method: 'POST',
                baseURL: `${BASE_API}/api/posts/`,
                url: `like/${data.postId}`,
                headers: {
                    "Authorization": /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${data.jwt}`,
                    "Content-Type": "application/json" 
                },
            }
        )
        const resData=await res.data
        console.log("like post", resData)
        dispatch({
            type: LIKE_POST,
            payload: resData
        })
    } catch (error) {
        console.log("catch error", error)
    }
}
export const unLikePostAction=(data)=>async(dispatch)=>{
    try {
        const res= await axios(
            {
                method: 'DELETE',
                baseURL: `${BASE_API}/api/posts/`,
                url: `unlike/${data.postId}`,
                headers: {
                    "Authorization": /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${data.jwt}`,
                    "Content-Type": "application/json" 
                },
            }
        )
        const resData=await res.data
        console.log("unlike post", resData)
        dispatch({
            type: UN_LIKE_POST,
            payload: resData
        })
    } catch (error) {
        console.log("catch error", error)
    }
}
export const savePostAction=(data)=>async(dispatch)=>{
    try {
        const res= await axios(
            {
                method: 'POST',
                baseURL: `${BASE_API}/api/users/`,
                url: `savePost/${data.postId}`,
                headers: {
                    "Authorization": /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${data.jwt}`,
                    "Content-Type": "application/json" 
                },
            }
        )
        const resData=await res.data
        console.log("save Post", resData)
        dispatch({
            type: SAVE_POST,
            payload: resData
        })
    } catch (error) {
        console.log("catch error", error)
    }
}
export const unSavePostAction=(data)=>async(dispatch)=>{
    try {
        const res= await axios(
            {
                method: 'DELETE',
                baseURL: `${BASE_API}/api/users/`,
                url: `unSavePost/${data.postId}`,
                headers: {
                    "Authorization": /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${data.jwt}`,
                    "Content-Type": "application/json" 
                },
            }
        )
        const resData=await res.data
        console.log("un save Post", resData)
        dispatch({
            type: UN_SAVE_POST,
            payload: resData
        })
    } catch (error) {
        console.log("catch error", error)
    }
}
export const findPostByIdAction=(data)=>async(dispatch)=>{
    try {
        const res= await axios(
            {
                method: 'GET',
                baseURL: `${BASE_API}/api/posts/`,
                url: `${data.postId}`,
                headers: {
                    "Authorization": /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${data.jwt}`,
                    "Content-Type": "application/json" 
                },
            }
        )
        const resData=await res.data
        console.log("get single post", resData)
        dispatch({
            type: GET_SINGLE_POST,
            payload: resData
        })
    } catch (error) {
        console.log("catch error", error)
    }
}
export const deletePostAction=(data)=>async(dispatch)=>{
    try {
        const res= await axios(
            {
                method: 'DELETE',
                baseURL: `${BASE_API}/api/posts/`,
                url: `delete/${data.postId}`,
                headers: {
                    "Authorization": /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${data.token}`,
                    "Content-Type": "application/json" 
                },
            }
        )
        const resData=await res.data
        console.log("delete post", resData)
        dispatch({
            type: DELETE_POST,
            payload: resData
        })
    } catch (error) {
        console.log("catch error", error)
    }
}