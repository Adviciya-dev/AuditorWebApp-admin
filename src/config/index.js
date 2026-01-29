export const API_CONFIG = {
    BASE_URL: "https://login.pimins.ai/api/auth/",
    DOC_URL:"https://doc.pimins.ai/api/"
  };


  export const ENDPOINTS = {

    AUDITORS: {
      BASE: 'auditor',
      LOGIN:"auditor/login",
      UPDATE_PASSWORD:'update-password'
    },
    CUSTOMER: {
      BASE: 'customer',
      CREATE:'customer/register'
      
    },
    DOCUMENT:{
      DOC:'documents',
      BASE:"documents/count",
      LIST:"documents/getDocumentsByDate",
      FOLDER:"documents/folder",
      DOCBYDATE:"documents/getDocumentsByDate"
    }

   
  };