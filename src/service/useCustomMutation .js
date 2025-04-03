import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiCall } from "./apiCall";
import { ShowToast } from "../components/ShowToast";


export const useCustomMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({baseUrl,method, url, values, key, next, resetForm }) => {
      console.log(key, "---key");
      console.log(values);

      const response = await ApiCall(baseUrl,method, url, values);
      console.log(response);

      if (response?.status) {
         console.log("success");
         
          ShowToast(response?.data?.message, "success");

          queryClient.invalidateQueries({ queryKey: [key] });

          next(response.data);
          // resetForm();
          return response.data;
        
      } else {
        if (response?.statusCode === 500) {
          ShowToast("Internal Server Error", "error");
          throw new Error("Internal Server Error"); // Ensure error is thrown
        }
        // console.log("error",response)
        
        ShowToast(response?.data, "error");
        

        throw new Error(`HTTP status ${response.status}`);
      }
    },
  });

  return { mutation };
};
