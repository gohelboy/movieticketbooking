import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
export const GET = async (req, res) => {
    return NextResponse.json({ data: "test" }, { status: 200 });
}