import { handelRequest, instance } from "../../../../utils/API"

export const getProfile = async (id) => {
    return await handelRequest(instance.get, `/owner/profile/${id}`);
}
export const updateProfile = async (data) => {
    return await handelRequest(instance.patch, `/owner/profile/${data?.id}`, data?.payload);
}

export const updateProfilePicture = async (data) => {
    return await handelRequest(instance.post, `/owner/profile/profile-picture/${data?.id}`, data?.payload);
}