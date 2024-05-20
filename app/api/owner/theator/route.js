import ownerModal from "@/models/owner";
import theatorModal from "@/models/theator";
import dbConnection from "@/utils/Connections";
import { failedResponse, InternalServerError, successReponse, successReponseWithData } from "@/utils/responseHandler"
await dbConnection();
export const POST = async (req) => {
    try {
        const { name, ownerId, lat, lng } = await req.json();
        if (!name || !ownerId || !lat || !lng) return failedResponse("Invalid request");
        const user = await ownerModal.findById(ownerId);
        if (!user) return failedResponse("user not exists");

        const newTheator = new theatorModal({
            owner: ownerId,
            name,
            lat,
            lng
        });

        newTheator.save();
        return successReponse("congrats new theator created")
    } catch (e) {
        return InternalServerError(e)
    }
}

export const PATCH = async (req, res) => {
    try {
        const { ownerId, theatorId, name, lat, lng } = await req.json();
        if (!name || !ownerId || !theatorId || !lat || !lng) return failedResponse("Invalid request");
        const user = await ownerModal.findById(ownerId);
        if (!user) return failedResponse("user not exists");
        await theatorModal.findOneAndUpdate({ owner: ownerId, _id: theatorId }, { name: name, lat: lat, lng: lng });
        return successReponse("Theator updated successfully")
    } catch (e) {
        return InternalServerError(e)
    }
}

export const DELETE = async (req, res) => {
    try {
        const theatorId = req.nextUrl.searchParams.get("theatorId");
        const ownerId = req.nextUrl.searchParams.get("ownerId");
        if (!theatorId || !ownerId) return failedResponse("Invalid request");
        if (!ownerId || !theatorId) return failedResponse("Invalid request");
        const user = await ownerModal.findById(ownerId);
        if (!user) return failedResponse("user not exists");
        await theatorModal.findOneAndDelete({ owner: ownerId, _id: theatorId });
        return successReponse("Theator deleted successfully")
    } catch (e) {
        return InternalServerError(e)
    }
}

export const GET = async (req) => {
    try {
        const theatorId = req.nextUrl.searchParams.get("theatorId");
        if (!theatorId) return failedResponse("Invalid request");
        const theator = await theatorModal.findOne({ _id: theatorId }).select("name lat lng");
        return successReponseWithData(theator, "theator fetched successfully")
    } catch (e) {
        return InternalServerError(e)
    }
}