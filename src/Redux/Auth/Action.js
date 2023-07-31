import axios from 'axios'
import { LOGOUT, REQ_USER, SEARCH_USER, SIGN_IN, SIGN_UP } from './ActionType'
import { BASE_API } from '../../config/api'
export const signinAction=(data)=>async(dispatch)=>{
    try {
        const res=await axios({
            method: 'POST',
            baseURL: 'https://media-chat-server.onrender.com/auth/',
            url: "login",
            data: data
        })
        console.log('jwtData', res.data.jwt)
        if(res.data.jwt) localStorage.setItem("tokenChat", res.data.jwt)
        if(res.status===200){
            dispatch({
                type: SIGN_IN,
                payload: res.data
            })
        }
    } catch (error) {
        console.log(error)
    }
}
export const signupAction=(data)=>async(dispatch)=>{
    try {
        const res=await axios({
            method: 'POST',
            baseURL: 'http://localhost:9110/auth/',
            url: "register",
            data: data
        })
        console.log(res)
        if(res.status===200){
            dispatch({
                type: SIGN_UP,
                payload: res.data
            })
        }
    } catch (error) {
        console.log(error)
    }
}
export const currentUserAction=(token)=>async(dispatch)=>{
    try {
        const res=await axios({
            method: 'GET',
            baseURL: `${BASE_API}/auth/`,
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
export const searchUser=(token, data)=>async(dispatch)=>{
    try {
        const res= await axios(
            {
                method: 'GET',
                baseURL: `http://localhost:9110/api/users/`,
                url: `search?name=${data}`,
                headers: {
                    "Authorization": /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${token}`,
                    "Content-Type": "application/json" 
                },
            }
        )
        const resData=await res.data
        console.log("searchData", resData)
        dispatch({
            type: SEARCH_USER,
            payload: resData
        })
    } catch (error) {
        console.log("catch error", error)
    }
}
export const handleLogoutUser=()=>async(dispatch)=>{
    localStorage.removeItem("tokenChat")
    dispatch({type: LOGOUT, payload:null})
    dispatch({type: REQ_USER, payload:null})
}