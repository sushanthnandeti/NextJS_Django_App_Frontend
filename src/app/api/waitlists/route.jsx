
import { NextResponse } from 'next/server';
import {getToken} from '../../../lib/auth';

const DJANGO_API_WAITLIST_URL = "http://127.0.0.1:8001/api/waitlists/";


export async function GET(request){

    const authToken = await getToken()

    if(!authToken) {
        return NextResponse.json({},{status:401})
    }
    
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'Accept' : "application/json"
        },
    }

    const response = await fetch(DJANGO_API_WAITLIST_URL, options);
    console.log(response)
    let status = 200
    if (!response.ok) {
        status = 401
    }
     const result = await response.json();
    return NextResponse.json({result}, { status: status})
} 