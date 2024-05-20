import { useMutation, useQuery } from "@tanstack/react-query"
import { createTheator, deleteTheator, getOwnerTheators, getTheator, updateTheator } from "./theatorAPI"
import { queryKey } from "@/utils/CONSTANTS"
import { queryClient } from "@/app/_components/QueryProviderWrapper"

export const useCreateTheator = () => {
    return useMutation({
        mutationKey: [queryKey.createTheator],
        mutationFn: (data) => createTheator(data),
    })
}

export const useUpdateTheator = () => {
    return useMutation({
        mutationKey: [queryKey.updateTheator],
        mutationFn: (data) => updateTheator(data),
    })
}

export const useDeleteTheator = () => {
    return useMutation({
        mutationKey: [queryKey.deleteTheator],
        mutationFn: (data) => deleteTheator(data),
        onSuccess: () => queryClient.invalidateQueries(queryKey.getTheators)
    })
}

export const useGetTheator = (id) => {
    return useQuery({
        queryKey: [queryKey.getTheator],
        queryFn: () => getTheator(id),
        enabled: !!id,
        select: data => data?.data
    })
}

export const useGetOwnerTheators = (id) => {
    return useQuery({
        queryKey: [queryKey.getTheators],
        queryFn: () => getOwnerTheators(id),
        enabled: !!id,
        select: data => data?.data
    })
}