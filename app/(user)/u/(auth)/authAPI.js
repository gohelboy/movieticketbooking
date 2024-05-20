import { handelRequest, instance } from "../../../../utils/API";

export const Testing = async () => {
    return handelRequest(instance.get, "/")
}

export const PostRegister = async (data) => {
    return handelRequest(instance.post, "user/auth/register", data);
}
export const PostLogin = async (data) => {
    return handelRequest(instance.post, "user/auth/login", data);
}

export const GetLogout = async () => {
    return handelRequest(instance.get, "user/auth/logout");
}

export const postActivate = async (data) => {
    return handelRequest(instance.post, "user/auth/activate", data);
}

export const postSendResetPasswordLink = async (data) => {
    return handelRequest(instance.post, "user/auth/forget-password", data);
}

export const postResetPassword = async (data) => {
    return handelRequest(instance.patch, "user/auth/forget-password", data);
}