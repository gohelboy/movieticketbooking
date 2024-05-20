import theatorModal from "@/models/theator";
import { failedResponse, InternalServerError, successReponseWithData } from "@/utils/responseHandler"

export const GET = async (req, { params }) => {
    try {
        const { ownerId } = params;
        if (!ownerId) return failedResponse("Invalid request");
        const theators = await theatorModal.find({ owner: ownerId }).select('owner name lat lng');
        return successReponseWithData(theators, "theators fetched successfully")
    } catch (error) {
        return InternalServerError(error)
    }
}