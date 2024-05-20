import { handelRequest, instance } from "@/utils/API";

export const createTheator = async (data) => {
    return await handelRequest(instance.post, "/owner/theator", data);
}
export const updateTheator = async (data) => {
    return await handelRequest(instance.patch, "/owner/theator", data);
}

export const deleteTheator = async (data) => {
    return await handelRequest(instance.delete, `/owner/theator?theatorId=${data?.theatorId}&ownerId=${data?.ownerId}`);
}

export const getTheator = async (id) => {
    return await handelRequest(instance.get, `/owner/theator?theatorId=${id}`);
}

export const getOwnerTheators = async (id) => {
    return await handelRequest(instance.get, `/owner/theators/${id}`);
}