import ownerModal from "../../../../../models/owner";
import dbConnection from "../../../../../utils/Connections";
import { failedResponse, successReponseWithData } from "../../../../../utils/responseHandler";

await dbConnection()

export const GET = async (req, { params }) => {
    const { id } = params;
    if (!id) return failedResponse("Invalid request");
    const user = await ownerModal.findById(id);
    if (!user) return failedResponse("user not exists");
    const payload = {
        name: user.name || '',
        email: user.email,
        createdAt: user.createdAt,
        imageUrl: user.imageUrl || '',
    }
    return successReponseWithData(payload, 'user profile fetched successfully');
}

export const PATCH = async (req, { params }) => {
    const { id } = params;
    const { name } = await req.json();
    if (!id || !name) return failedResponse("Invalid request");
    const user = await ownerModal.findByIdAndUpdate(id, { name: name });
    if (!user) return failedResponse("error while updating user");
    const payload = {
        name: user.name || '',
        email: user.email,
        createdAt: user.createdAt,
    }
    return successReponseWithData(payload, 'user profile fetched successfully');
}