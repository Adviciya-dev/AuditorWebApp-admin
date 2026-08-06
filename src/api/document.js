import { ApiCall } from "../service/apiCall";
import {API_CONFIG, ENDPOINTS } from '../config';


export const documentCountByStatus= async (params,id)=>{
    const response = await ApiCall(API_CONFIG.DOC_URL,"GET",`${id ? `${ENDPOINTS.DOCUMENT.BASE}/${id}` : ENDPOINTS.DOCUMENT.BASE}`,null,params);
    if(response?.status){
      return response.data
    }
    else{
      return []
    }
}

export const getDocuments = async (params,id)=>{
    const response = await ApiCall(API_CONFIG.DOC_URL,"GET",`${id ? `${ENDPOINTS.DOCUMENT.LIST}/${id}` : ENDPOINTS.DOCUMENT.LIST}`,null,params);
    if(response?.status){
      return response.data
    }
    else{
      return []
    }
}

export const getFolder = async (params,id)=>{
  const response = await ApiCall(API_CONFIG.DOC_URL,"GET",`${id ? `${ENDPOINTS.DOCUMENT.FOLDER}/${id}` : ENDPOINTS.DOCUMENT.FOLDER}`,null,params);
  if(response?.status){
    return response.data
  }
  else{
    return []
  }
}

export const getDocumentDetails = async (params,id)=>{
  const response = await ApiCall(API_CONFIG.DOC_URL,"GET",`${id ? `${ENDPOINTS.DOCUMENT.DOCBYDATE}/${id}` : ENDPOINTS.DOCUMENT.DOCBYDATE}`,null,params);
  if(response?.status){
    return response.data
  }
  else{
    return []
  }
}

export const fetchDocumentCustomers = async (params)=>{
  const response = await ApiCall(API_CONFIG.DOC_URL,"GET",ENDPOINTS.DOCUMENT.CUSTOMERS,null,params);
  if(response?.status){
    return response.data
  }
  else{
    return { customers: [], pagination: { currentPage: 1, totalPages: 0, totalCount: 0, limit: params?.limit ?? 10 }, resetsOn: null }
  }
}