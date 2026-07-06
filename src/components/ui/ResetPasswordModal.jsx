import React, { useState } from "react";
import Modal from "react-modal";
import { X, Eye, EyeOff } from "lucide-react";
import { resetAuditorPassword } from "../../api/auditor";
import { ShowToast } from "../ShowToast";

Modal.setAppElement("#root");

const ResetPasswordModal = ({ isOpen, onClose, auditorId }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      ShowToast("Please fill in both fields", "error");
      return;
    }
    if (newPassword.length < 6) {
      ShowToast("Password must be at least 6 characters", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      ShowToast("Passwords do not match", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await resetAuditorPassword(auditorId, newPassword);
      if (response?.status) {
        ShowToast(response?.data?.message || "Password updated successfully", "success");
        handleClose();
      } else {
        ShowToast(response?.data || "Failed to update password", "error");
      }
    } catch (error) {
      ShowToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setNewPassword("");
    setConfirmPassword("");
    setShowNew(false);
    setShowConfirm(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-xl p-8 max-w-md w-full mx-auto relative"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50"
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        <X size={20} />
      </button>

      <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
        Reset Auditor Password
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleClose}
          className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-shadow shadow-md hover:shadow-lg disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </Modal>
  );
};

export default ResetPasswordModal;
