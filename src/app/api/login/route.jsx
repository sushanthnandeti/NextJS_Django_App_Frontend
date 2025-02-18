'use server';

import { NextResponse } from 'next/server';
import { setToken, setRefreshToken } from '../../../lib/auth';

const DJANGO_API_LOGIN_URL = "http://127.0.0.1:8001/api/token/pair";

export async function POST(request) {

    const requestData = await request.json();
    const jsonData = JSON.stringify(requestData);
    const requestOptions = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    };

    const response = await fetch(DJANGO_API_LOGIN_URL, requestOptions);
    const responseData = await response.json();

    if (response.ok) {
      console.log("Logged In");
     
      const { access, refresh } = responseData;
      await setToken(access);
      await setRefreshToken(refresh);
      return NextResponse.json({"logged in" : true}, {status : 200})
    }
    return NextResponse.json({"logged In" : false, ...responseData}, {status:400})
  }