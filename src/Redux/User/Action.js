import axios from "axios"
import { BASE_API } from "../../config/api"
import { REQ_USER } from "./ActionType"

export const getUserProfile=(token)=>async(dispatch)=>{
    try {
        const res=await axios({
            method: 'GET',
            baseURL: `${BASE_API}/api/users/`,
            url: "profile",
            headers: {
                "Authorization": /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${token}`,
                "Content-Type": "application/json" 
            },
        })
        console.log("current User", res.data)
        if(res.status===200){
            dispatch({
                type: REQ_USER,
                payload: res.data
            })
        }
    } catch (error) {
        console.log(error)
    }
}