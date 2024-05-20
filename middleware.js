import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import JWT from "jsonwebtoken"
import { InternalServerError } from "@/utils/responseHandler";

export default middleware = async (request) => {
    try {
        const token = cookies().get('token')?.value;
        if (!token) return NextResponse.redirect(new URL('/login', request.url));
        const decode = JWT.decode(token, process.env.JWT_SECRET);
        if (!decode) return NextResponse.redirect(new URL('/login', request.url))
        if (decode && !decode.verified) return NextResponse.redirect(new URL('/login', request.url))
    } catch (error) {
        return InternalServerError(error)
    }
}

export const config = {
    matcher: [
        '/api/profile',
        '/home',
        '/settings/:path*'
    ]
}