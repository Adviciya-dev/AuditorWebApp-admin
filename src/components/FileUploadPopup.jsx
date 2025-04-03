import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import { X, Upload, Pause, Play, Trash, FileText } from "lucide-react";
import axios from "axios";

Modal.setAppElement("#root");

const FileUploadPopup = ({ isOpen, setIsOpen, uploadingFile, setUploadingFile, onNext }) => {
  const fileInputRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection
  const handleFileChange = async (event) => {
    const newFiles = Array.from(event.target.files);
    console.log(newFiles);

    if (newFiles.length > 0) {
      // Add new files to state with initial progress
      const newFileObjects = newFiles.map((file) => ({
        file: file, // Store the actual file object
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + "MB",
        progress: 0,
        apiData: null,
        status: "pending",
        error: null,
      }));

      setUploadingFile((prevFiles) => [...prevFiles, ...newFileObjects]);

      try {
        // Create individual progress handlers for each file
        const uploadPromises = newFileObjects?.map((fileObj, index) => {
          const handleProgress = (progress) => {
            setUploadingFile((prevFiles) =>
              prevFiles.map((file, i) => {
                // Only update progress for the specific file
                if (file.name === fileObj.name) {
                  return {
                    ...file,
                    progress: Math.round(progress),
                    status: progress === 100 ? "complete" : "uploading",
                  };
                }
                return file;
              })
            );
          };

          // Upload single file to API using axios
          return uploadFileToAPI(fileObj.file, handleProgress)
            .then((response) => {
              setUploadingFile((prevFiles) =>
                prevFiles.map((file) => {
                  if (file.name === fileObj.name) {
                    return {
                      ...file,
                      apiData: response,
                      status: "complete",
                      progress: 100,
                    };
                  }
                  return file;
                })
              );
              return response;
            })
            .catch((error) => {
              setUploadingFile((prevFiles) =>
                prevFiles.map((file) => {
                  if (file.name === fileObj.name) {
                    return {
                      ...file,
                      status: "failed",
                      error: error.message,
                      progress: file.progress, // Maintain the progress where it failed
                    };
                  }
                  return file;
                })
              );
              throw error;
            });
        });

        // Wait for all uploads to complete
        await Promise.allSettled(uploadPromises);
      } catch (error) {
        console.error("Some uploads failed:", error);
      }
    }
  };

  // Function to upload to API using axios with progress tracking
  const uploadFileToAPI = async (file, progressCallback) => {
    // Create form data
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://doc.pimins.ai/api/documents/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            progressCallback(percentCompleted);
          }
        }
      });
      
      return response.data;
    } catch (error) {
      let errorMessage = 'Upload failed';
      
      if (error.response) {
        errorMessage = `Server Error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'No response from server';
      } else {
        errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
    }
  };

  const handlePauseResume = (index) => {
    setUploadingFile((prevFiles) =>
      prevFiles.map((file, i) =>
        i === index
          ? {
              ...file,
              status: file.status === "paused" ? "uploading" : "paused",
            }
          : file
      )
    );
  };

  const handleCancelUpload = (index) => {
    setUploadingFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  console.log(uploadingFile);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-[500px]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">File Upload</h2>
        <button onClick={() => setIsOpen(false)}>
          <X size={20} className="text-gray-500 hover:text-gray-700" />
        </button>
      </div>

      <p className="text-[14px] text-gray-600 mb-4">
        Add your documents here, and you can upload up to 5 files max.
      </p>

      {/* Upload Area */}
      <div className="border-2 border-blue-500 border-dashed rounded-lg p-4 mb-4 flex flex-col items-center justify-center">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Upload className="text-blue-500" size={24} />
        </div>
        <p className="text-sm text-gray-600 mb-2">
          Drag your file(s) to start uploading
        </p>
        <p className="text-sm text-gray-500 mb-4">OR</p>
        <button
          onClick={handleBrowseClick}
          className="px-4 py-2 bg-white border border-blue-700 text-blue-700 rounded-md text-sm hover:bg-gray-50"
          disabled={uploadingFile.length >= 5}
        >
          Browse files
        </button>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept=".jpg,.png,.svg,.zip"
        />
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Only support .jpg, .png, .svg, and .zip files.
      </p>

      {/* Show Uploading File Progress */}
      <div className="max-h-60 overflow-y-auto">
        {uploadingFile.map((file, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-3 mb-2"
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                <FileText className="text-blue-500" size={20} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{file.name}</span>
                  <span className="text-sm text-gray-500">{file.size}</span>
                </div>
                <div className="h-1 bg-gray-200 rounded-full mt-2">
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      file.status === "failed" ? "bg-red-500" : "bg-blue-500"
                    }`}
                    style={{ width: `${file.progress}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>
                {file.progress}% •{" "}
                {file.status === "failed"
                  ? "Upload failed"
                  : file.status === "complete"
                  ? "Completed"
                  : file.status === "paused"
                  ? "Paused"
                  : "Uploading..."}
                {file.error && ` - ${file.error}`}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePauseResume(index)}
                  disabled={
                    file.status === "complete" || file.status === "failed"
                  }
                >
                  {file.status === "paused" ? (
                    <Play
                      className="text-gray-500 hover:text-gray-700"
                      size={18}
                    />
                  ) : (
                    <Pause
                      className="text-gray-500 hover:text-gray-700"
                      size={18}
                    />
                  )}
                </button>
                <button onClick={() => handleCancelUpload(index)}>
                  <Trash
                    className="text-red-500 hover:text-red-700"
                    size={18}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Footer */}
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
          disabled={!uploadingFile.every((file) => file.status === "complete")}
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </Modal>
  );
};

export default FileUploadPopup;