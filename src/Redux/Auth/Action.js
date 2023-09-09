import axios from "axios";
import {
  FOLLOW_USER,
  GET_USER_BY_IDS,
  GET_USER_BY_USERNAME,
  LOGOUT,
  POPULAR_USER,
  REQ_USER,
  SEARCH_USER,
  SIGN_IN,
  SIGN_UP,
  UN_FOLLOW_USER,
  UPDATE_USER,
} from "./ActionType";
import { BASE_API } from "../../config/api";
import { toast } from "react-toastify";
import { controllLoading } from "../Loading/Action";
export const signinAction = (data) => async (dispatch) => {
  try {
    dispatch(controllLoading(true))
    const res = await axios({
      method: "POST",
      baseURL: `${BASE_API}/auth/`,
      url: "login",
      data: data,
    });
    console.log("jwtData", res.data.jwt);
    if (res.data.jwt) localStorage.setItem("tokenChat", res.data.jwt);
    if (res.status === 200) {
      dispatch({
        type: SIGN_IN,
        payload: res.data,
      });
      toast.success('Login Successfull', { position: "top-right" });
      dispatch(controllLoading(false))
    }
  } catch (err) {
    dispatch(controllLoading(false))
    if(err.code==='ERR_NETWORK'){
        toast.error(err.message, { position: "top-right" });
    }
    if (err.response?.status !== "201") {
      toast.error(err.response?.data.message, { position: "top-right" });
    }
  }
};
export const signupAction = (data) => async (dispatch) => {
  try {
    dispatch(controllLoading(true))
    const res = await axios({
      method: "POST",
      baseURL: `${BASE_API}/account/`,
      url: "register",
      data: data,
    });
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: SIGN_UP,
        payload: res.data,
      });
      dispatch(controllLoading(false))
    }
  } catch (err) {
    console.log(err);
    dispatch(controllLoading(false))
    if(err.code==='ERR_NETWORK'){
        toast.error(err.message, { position: "top-right" });
    }
    if (err.response?.status !== "201") {
      toast.error(err.response?.data.message, { position: "top-right" });
    }
  }
};
export const currentUserAction = (token) => async (dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      baseURL: `${BASE_API}/api/users/`,
      url: "profile",
      headers: {
        Authorization: /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("current User", res.data);
    if (res.status === 200) {
      dispatch({
        type: REQ_USER,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = (data) => async (dispatch) => {
  try {
    const res = await axios({
      method: "PUT",
      baseURL: `${BASE_API}/api/users/`,
      url: `update`,
      data: data.data,
      headers: {
        Authorization: /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${data.jwt}`,
        "Content-Type": "application/json",
      },
    });
    const resData = await res.data;
    dispatch({
      type: UPDATE_USER,
      payload: resData,
    });
  } catch (error) {
    console.log("catch error", error);
  }
};
export const searchUser = (token, data) => async (dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      baseURL: `${BASE_API}/api/users/`,
      url: `search?name=${data}`,
      headers: {
        Authorization: /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const resData = await res.data;
    dispatch({
      type: SEARCH_USER,
      payload: resData,
    });
  } catch (error) {
    console.log("catch error", error);
  }
};
export const handleLogoutUser = () => async (dispatch) => {
  localStorage.removeItem("tokenChat");
  dispatch({ type: LOGOUT, payload: null });
  dispatch({ type: REQ_USER, payload: null });
};
export const findUserByUserIdsAction = (data) => async (dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      baseURL: `${BASE_API}/api/posts/`,
      url: `follow/${data.data}`,
      headers: {
        Authorization: /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${data.jwt}`,
        "Content-Type": "application/json",
      },
    });
    const resData = await res.data;
    console.log("searchData", resData);
    dispatch({
      type: GET_USER_BY_IDS,
      payload: resData,
    });
  } catch (error) {
    console.log("catch error", error);
  }
};
export const findUserByUserName = (data) => async (dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      baseURL: `${BASE_API}/api/users/`,
      url: `${data.data}`,
      headers: {
        Authorization: /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${data.jwt}`,
        "Content-Type": "application/json",
      },
    });
    const resData = await res.data;
    dispatch({
      type: GET_USER_BY_USERNAME,
      payload: resData,
    });
  } catch (error) {
    console.log("catch error", error);
  }
};
export const getPopularUserAction = (data) => async (dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      baseURL: `${BASE_API}/api/users/popular`,
      headers: {
        Authorization: /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${data.jwt}`,
        "Content-Type": "application/json",
      },
    });
    const resData = await res.data;
    dispatch({
      type: POPULAR_USER,
      payload: resData,
    });
  } catch (error) {
    console.log("catch error", error);
  }
};
export const followUserAction = (data, token) => async (dispatch) => {
  try {
    const res = await axios({
      method: "POST",
      baseURL: `${BASE_API}/api/userfollow`,
      url: `m/${data}`,
      headers: {
        Authorization: /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const resData = await res.data;
    dispatch({
      type: FOLLOW_USER,
      payload: resData,
    });
  } catch (error) {
    console.log("catch error", error);
  }
};
export const unFollowUserAction = (data, token) => async (dispatch) => {
  try {
    const res = await axios({
      method: "POST",
      baseURL: `${BASE_API}/api/userfollow`,
      url: `m/${data}`,
      headers: {
        Authorization: /*"Bearer " + localStorage.getItem("token")*/ `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const resData = await res.data;
    dispatch({
      type: UN_FOLLOW_USER,
      payload: resData,
    });
  } catch (error) {
    console.log("catch error", error);
  }
};
