import { NextResponse } from "next/server";


export const successReponse = (message) => {
    return NextResponse.json({ message, status: true }, { status: 200 });
}
export const successReponseWithData = (data, message) => {
    return NextResponse.json({ data, message, status: true }, { status: 200 });
}
export const failedResponse = (message) => {
    return NextResponse.json({ message, status: false }, { status: 400 });
}
export const InternalServerError = (error) => {
    return NextResponse.json({ error: error?.message, status: false }, { status: 500 });
}