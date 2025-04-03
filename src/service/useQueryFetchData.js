import { useQuery } from "@tanstack/react-query";


// Common query function
export function useCustomQuery(key, queryFn, params = {}, id){
   
    
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: [key, params],
        queryFn: () => queryFn(params,id),
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        cacheTime: 3600000,
        staleTime: 3600000,
        refetchInterval: 3600000,
    })

    return { data, error, isLoading, refetch }

};
