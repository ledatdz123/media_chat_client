import { BASE_API } from "../../config/api";
import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionType";

export const createMessage=(messageData)=>async(dispatch)=>{
    try {
        const res=await fetch(`${BASE_API}/api/messages/create`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${messageData.token}`,
            },
            body: JSON.stringify(messageData.data)
        })
        const data=await res.json();
        dispatch({
            type: CREATE_NEW_MESSAGE,
            payload: data
        })
    } catch (error) {
        console.log("loi trycatch message", error)
    }
}

export const createMessageImage=(messageData)=>async(dispatch)=>{
    try {
        const res=await fetch(`${BASE_API}/api/messages/createImg`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${messageData.token}`,
            },
            body: JSON.stringify(messageData.data)
        })
        const data=await res.json();
        dispatch({
            type: CREATE_NEW_MESSAGE,
            payload: data
        })
    } catch (error) {
        console.log("loi trycatch message", error)
    }
}

export const getAllMessage=(reqData)=>async(dispatch)=>{
    try {
        const res=await fetch(`${BASE_API}/api/messages/chat/${reqData.chatId}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${reqData.token}`,
            },
        })
        const data=await res.json();
        dispatch({
            type: GET_ALL_MESSAGE,
            payload: data
        })
    } catch (error) {
        console.log("loi trycatch chat", error)
    }
}
