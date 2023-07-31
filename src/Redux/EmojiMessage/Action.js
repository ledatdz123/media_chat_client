import { BASE_API } from "../../config/api";
import { CREATE_NEW_MESSAGE_EMOJI, GET_ALL_MESSAGE_EMOJI } from "./ActionType";

export const createMessageImageEmoji=(messageData)=>async(dispatch)=>{
    try {
        const res=await fetch(`${BASE_API}/api/react/message/${messageData.id}/reacts`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${messageData.token}`,
            },
            body: JSON.stringify(messageData.data)
        })
        const data=await res.json();
        dispatch({
            type: CREATE_NEW_MESSAGE_EMOJI,
            payload: data
        })
    } catch (error) {
        console.log("loi trycatch message", error)
    }
}

export const getAllMessageEmoji=(reqData)=>async(dispatch)=>{
    try {
        const res=await fetch(`${BASE_API}/api/react/message/${reqData.messageId}/reacts`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${reqData.token}`,
            },
        })
        const data=await res.json();
        dispatch({
            type: GET_ALL_MESSAGE_EMOJI,
            payload: data
        })
    } catch (error) {
        console.log("loi trycatch chat", error)
    }
}