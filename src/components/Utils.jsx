import React from 'react';
import excel from "../assets/svg/Icon (2).svg"
import word from "../assets/svg/Icon (4).svg"
import doc from "../assets/svg/Icon (3).svg"

export function getFileIcon(type) {
  switch (type) {
    case 'excel':
      return (
        <img src={excel} alt="" />
      );
    case 'word':
      return (
        <img src={word} alt="" />
      );
    default:
      return (
        <img src={doc} alt="" />
      );
  }
}

export const getFileType = (filepath) => {
  const extension = filepath.split('.').pop().toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) {
    return 'image';
  } else if (['doc', 'docx'].includes(extension)) {
    return 'word';
  } else if (['xls', 'xlsx'].includes(extension)) {
    return 'excel';
  } else if (['pdf'].includes(extension)) {
    return 'pdf';
  } else {
    return 'unknown';
  }
};



export const openDocument = (type) => {
  switch (type) {
    case 'word':
      // In a real application, this would integrate with Microsoft Office API
      // or use a web-based document viewer
      window.open('https://www.office.com/launch/word', '_blank');
      break;
    case 'excel':
      window.open('https://www.office.com/launch/excel', '_blank');
      break;
    case 'text':
      // Handle text documents
      console.log('Opening text document:', doc.name);
      break;
    default:
      console.log('Unknown document type:', doc.type);
  }
};