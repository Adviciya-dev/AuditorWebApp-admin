import { ApiCall } from "../service/apiCall";
import {API_CONFIG, ENDPOINTS } from '../config';


export const fetchCustomer = async (params,id) =>{
    console.log(id);
    console.log(params);
    
    
    const response = await ApiCall(API_CONFIG.BASE_URL,"GET",`${id ? `${ENDPOINTS.CUSTOMER.BASE}/${id}` : ENDPOINTS.CUSTOMER.BASE}`,null,params);
    if(response?.status){
      const data = response.data;
      return Array.isArray(data) ? data : (data?.data ?? [])
    }
    else{
      return []
    }
  }