import { handelRequest, instance } from "../../../../utils/API"

export const getProfile = async (id) => {
    return await handelRequest(instance.get, `/user/profile/${id}`);
}
export const updateProfile = async (data) => {
    return await handelRequest(instance.patch, `/user/profile/${data?.id}`, data?.payload);
}

export const updateProfilePicture = async (data) => {
    return await handelRequest(instance.post, `/user/profile/profile-picture/${data?.id}`, data?.payload);
}