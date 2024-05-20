import { cookies } from "next/headers";
import { InternalServerError, successReponse } from "../../../../../utils/responseHandler";

export const GET = async (req, res) => {
    try {
        cookies().delete('token');
        return successReponse('logged out')

    } catch (error) {
        return InternalServerError(error)
    }
} 