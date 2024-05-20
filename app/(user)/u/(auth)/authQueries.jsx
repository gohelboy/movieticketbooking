import { useMutation, useQuery } from "@tanstack/react-query"
import { GetLogout, postActivate, PostLogin, PostRegister, postResetPassword, postSendResetPasswordLink } from "./authAPI"
import { queryKey } from "../../../../utils/CONSTANTS"

export const useRegister = () => {
    return useMutation({
        mutationKey: [queryKey.register],
        mutationFn: (data) => PostRegister(data),
    })
}
export const useLogin = () => {
    return useMutation({
        mutationKey: [queryKey.login],
        mutationFn: (data) => PostLogin(data),
    })
}
export const useLogout = () => {
    return useQuery({
        queryKey: [queryKey.logout],
        queryFn: () => GetLogout(),
        enabled: false,
        gcTime: 1000,
    })
}

export const useActivateUser = () => {
    return useMutation({
        mutationKey: [queryKey.activate],
        mutationFn: (data) => postActivate(data),
    })
}

export const useForgetPasswordLink = () => {
    return useMutation({
        mutationKey: [queryKey.forgetPasswordLink],
        mutationFn: (data) => postSendResetPasswordLink(data),
    })
}

export const useResetPassword = () => {
    return useMutation({
        mutationKey: [queryKey.forgetPassword],
        mutationFn: (data) => postResetPassword(data),
    })
}