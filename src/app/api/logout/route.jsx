
import { NextResponse } from 'next/server';
import { deleteTokens } from '../../../lib/auth';


export async function POST(request) { 
    const response = deleteTokens()
    console.log(response)
    return NextResponse.json({}, { status: 200})
}