import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { auditorsApi } from '../../api/auditor';
import { useNavigate } from 'react-router-dom';


export function useAuditors() {
  const navigate = useNavigate()
  const queryClient = useQueryClient();

//   const { data: auditors, isLoading } = useQuery({
//     queryKey: ['auditors'],
//     queryFn: auditorsApi.getAuditors,
//   });

  const createAuditorMutation = useMutation({
    mutationFn: auditorsApi.createAuditor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auditors'] });
      navigate("/")
    },
  });

  const updateAuditorMutation = useMutation({
    mutationFn: auditorsApi.updateAuditor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auditors'] });
      navigate("/")
    },
  });

  const deleteAuditorMutation = useMutation({
    mutationFn: auditorsApi.deleteAuditor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auditors'] });
    },
  });

  return {
    // auditors,
    // isLoading,
    createAuditor: createAuditorMutation.mutate,
    isCreating: createAuditorMutation.isPending,
    updateAuditor: updateAuditorMutation.mutate,
    isUpdating: updateAuditorMutation.isPending,
    deleteAuditor: deleteAuditorMutation.mutate,
    isDeleting: deleteAuditorMutation.isPending,
  };
}