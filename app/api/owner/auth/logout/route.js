import { InternalServerError, successReponse } from "../../../../../utils/responseHandler";
import { cookies } from "next/headers";

export const GET = async (req, res) => {
    try {
        cookies().delete('token');
        return successReponse('logged out')

    } catch (error) {
        return InternalServerError(error)
    }
} 