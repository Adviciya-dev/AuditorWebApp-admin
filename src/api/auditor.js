import { axiosInstance } from '../lib/axios';
import { API_CONFIG, ENDPOINTS } from '../config';
import axios from 'axios';
import { url } from '../constants/apiUrls';
import { ApiCall } from '../service/apiCall';

export const auditorsApi = {
  getAuditors: async (params = {}) => {
    console.log("getAuditors called with params:", params);
    try {
        const { auditorId } = params;
        const endpoint = auditorId 
            ? `${API_CONFIG.BASE_URL}${ENDPOINTS.AUDITORS.BASE}/${auditorId}` 
            : `${API_CONFIG.BASE_URL}${ENDPOINTS.AUDITORS.BASE}`;

        const response = await axios.get(endpoint);
        console.log("API Response:", response);
        return response.data;
    } catch (error) {
        console.error("Error fetching auditors:", error.message);
        throw error;
    }
},



 
  
  // getAuditor: async (id) => {
  //   const { data } = await axiosInstance.get(ENDPOINTS.AUDITORS.DETAIL(id));
  //   return data;
  // },
  
  createAuditor: async (auditorData) => {
    const { data } = await axiosInstance.post(ENDPOINTS.AUDITORS.BASE, auditorData);
    return data;
  },
  
  updateAuditor: async (updateData) => {
    const { data } = await axiosInstance.put(ENDPOINTS.AUDITORS.BASE, updateData);
    return data;
  },
  
  deleteAuditor: async (id) => {
    const { data } = await axiosInstance.delete(ENDPOINTS.AUDITORS.DETAIL(id));
    return data;
  },
};



export const resetAuditorPassword = async (auditorId, newPassword) => {
  const response = await ApiCall(
    API_CONFIG.BASE_URL,
    "PUT",
    `${ENDPOINTS.AUDITORS.UPDATE_PASSWORD}/${auditorId}`,
    { newPassword }
  );
  return response;
}

// new
export const fetchAuditor = async (params,id) =>{
  console.log(id);
  console.log(params);
  
  
  const response = await ApiCall(API_CONFIG.BASE_URL,"GET",`${id ? `${ENDPOINTS.AUDITORS.BASE}/${id}` : ENDPOINTS.AUDITORS.BASE}`,null,params);
  if(response?.status){
    return response.data
  }
  else{
    return []
  }
}