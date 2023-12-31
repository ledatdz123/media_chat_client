import { BASE_API } from "../../config/api"
import { CREATE_CHAT, CREATE_GROUP_CHAT, GET_USERS_CHAT } from "./ActionType"

export const createChat=(chatData)=>async(dispatch)=>{
    console.log(chatData.data)
    try {
        // const res=await axios({
        //     method: 'POST',
        //     baseURL: `${BASE_API}/auth/`,
        //     url: "login",
        //     data: chatData
        // })
        const res=await fetch(`${BASE_API}/api/chats/single`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${chatData.token}`,
            },
            body: JSON.stringify(chatData.data)
        })
        const data=await res.json();
        console.log("create chat", data)
        dispatch({
            type: CREATE_CHAT,
            payload: data
        })
    } catch (error) {
        console.log("loi trycatch chat", error)
    }
}
export const createGroupChat=(chatData)=>async(dispatch)=>{
    try {
        // const res=await axios({
        //     method: 'POST',
        //     baseURL: `${BASE_API}/auth/`,
        //     url: "login",
        //     data: chatData
        // })
        const res=await fetch(`${BASE_API}/api/chats/group`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${chatData.token}`,
            },
            body: JSON.stringify(chatData.group)
        })
        const data=await res.json();
        console.log("create------- chat-------------", data)
        dispatch({
            type: CREATE_GROUP_CHAT,
            payload: data
        })
    } catch (error) {
        console.log("loi trycatch chat", error)
    }
}
export const getAllChat=(token)=>async(dispatch)=>{
    try {
        // const res=await axios({
        //     method: 'POST',
        //     baseURL: `${BASE_API}/auth/`,
        //     url: "login",
        //     data: chatData
        // })
        const res=await fetch(`${BASE_API}/api/chats/user`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        const data=await res.json();
        console.log("user chat", data)
        dispatch({
            type: GET_USERS_CHAT,
            payload: data
        })
    } catch (error) {
        console.log("loi trycatch chat", error)
    }
}