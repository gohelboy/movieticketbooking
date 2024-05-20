import userModal from "../../../../../../models/user";
import { failedResponse, InternalServerError, successReponseWithData } from "../../../../../../utils/responseHandler";
import { uploadImage } from "../../../../../../utils/upload-images";

export const POST = async (req, { params }) => {
    try {
        const { id } = params;
        const files = await req.formData();
        const image = files.get('image')
        if (!id || !image) return failedResponse("Invalid request");
        const uploadedImage = await uploadImage(image, "pp");
        const imageUrl = uploadedImage.secure_url || uploadedImage.url
        const user = await userModal.findById(id);
        if (!user) failedResponse("User not found");
        user.imageUrl = imageUrl;
        await user.save();
        return successReponseWithData({ imageUrl }, 'Profile picture updated successfully');
    } catch (error) {
        return InternalServerError(error)
    }
} 