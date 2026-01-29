import React, { useState } from "react";
import { Button } from "../ui/Button";
import editIcon from "../../assets/edit-02.png";
import { Building2, KeyRound, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ResetPasswordModal from "../ui/ResetPasswordModal";
import { useAuditors } from "../../hooks/auditors/useAuditors";

export function AuditorProfile({
  name,
  company,
  department,
  role,
  imageUrl,
  id,
  type,
  onDelete
}) {
  const navigate = useNavigate();
  const { deleteAuditor, isDeleting } = useAuditors();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this auditor?")) {
      deleteAuditor(id, {
        onSuccess: () => {
          if (onDelete) onDelete();
        },
      });
    }
  };

  const handleEdit = () => {
    console.log(id);
    if(type === "auditor"){
      navigate(`/add-auditor/${id}`);
    }
    else{
      navigate(`/add-customer/${id}`);
    }

  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-inter font-medium text-lg leading-7">Profile</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsPasswordModalOpen(true)}
            variant="outline"
            className="text-sm px-4 bg-[#E8E0F0] text-[#7C3AED]"
          >
            <KeyRound size={16} className="mr-2" />
            Reset Password
          </Button>
          <Button
            onClick={handleEdit}
            variant="outline"
            className="text-sm px-4 bg-[#DBEEED] text-[#2F9089]"
          >
            <img src={editIcon} alt="" className="mr-2" />
            Edit Profile
          </Button>
          <Button
            onClick={handleDelete}
            variant="outline"
            className="text-sm px-4 bg-[#FDE8E8] text-[#DC2626]"
            disabled={isDeleting}
          >
            <Trash2 size={16} className="mr-2" />
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>

      <ResetPasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        auditorId={id}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#E0EFEE]">
            <img src={imageUrl} alt="" />
          </div>
          <div>
            <span className="block text-xs text-gray-500 mb-1">Full Name</span>
            <p className="text-sm font-medium">{name}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#E0EFEE]">
            <Building2 />
          </div>
          <div>
            <span className="block text-xs text-gray-500 mb-1">
              Office/Branch
            </span>
            <p className="text-sm font-medium">{company}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#E0EFEE]">
            <Building2 />
          </div>
          <div>
            <span className="block text-xs text-gray-500 mb-1">Department</span>
            <p className="text-sm font-medium">{department}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#E0EFEE]">
            <Building2 />
          </div>
          <div>
            <span className="block text-xs text-gray-500 mb-1">Role</span>
            <p className="text-sm font-medium">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
