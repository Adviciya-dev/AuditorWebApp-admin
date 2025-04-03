

import axios from "axios";
import { API_CONFIG } from "../config";

export const ApiCall = async (url,method, endPoint,data, params, is_formdata) => {
  var headers = {
    "Content-Type": is_formdata ? "multipart/form-data" : "application/json",
    Authorization: "Bearer " + localStorage.getItem("access"),
    platform: "web",
  };
  var url = url + endPoint;
  try {
    const res = await axios({
      method,
      url,
      params,
      data,
      headers,
    });
    var response = { status: true, data: res.data , statusCode:res?.status };
    return response;
  } catch (error) {
    // console.log(error);
    
    if (error?.response?.status === 401) {
    //   if (localStorage.getItem("access")) {
    //     localStorage.clear();
    //     window.location.href = "/login";
    //   }
  }
    
    // ShowToast(error?.response?.data?.message, false);
    return {
      status: false,
      data: error?.response?.data?.message ?? "something went wrong",
      statusCode:error?.status
    };
  }
};