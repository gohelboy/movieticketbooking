import { useMutation, useQuery } from "@tanstack/react-query"
import { queryKey } from "../../../../utils/CONSTANTS"
import { getProfile, updateProfile, updateProfilePicture } from "./settingsAPI"
import { queryClient } from "../../../_components/QueryProviderWrapper"


export const useGetProfile = (id) => {
    return useQuery({
        queryKey: [queryKey.getProfile],
        queryFn: () => getProfile(id),
        enabled: !!id,
        select: data => data?.data,
    })
}

export const useUpdateProfile = () => {
    return useMutation({
        mutationKey: [queryKey.updateProfile],
        mutationFn: (data) => updateProfile(data),
        onSuccess: () => queryClient.invalidateQueries(queryKey.getProfile),
    })
}

export const useUpdateProfilePicture = (config) => {
    return useMutation({
        mutationKey: [queryKey.updateProfilePicture],
        mutationFn: (data) => updateProfilePicture(data),
        ...config
    })
}