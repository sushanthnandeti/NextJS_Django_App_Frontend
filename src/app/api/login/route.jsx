'use server';

import { NextResponse } from 'next/server';
import { getToken, getRefreshToken, setToken, setRefreshToken } from '../../lib/auth';

const DJANGO_API_LOGIN_URL = "http://127.0.0.1:8001/api/token/pair";

export async function POST(request) {
  try {
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
      // Use tokens returned from the response (adjust as needed)
      const { access, refresh } = responseData;
      await setToken(access);
      await setRefreshToken(refresh);
      console.log("🔹 Tokens Set:", access, refresh);

      // Optionally, verify tokens by retrieving them
      const storedAccess = await getToken();
      const storedRefresh = await getRefreshToken();
      console.log("🔹 Retrieved Tokens:", storedAccess, storedRefresh);
    } else {
      console.log("Login Failed:", responseData);
    }

    return NextResponse.json({ message: 'Hello World' });
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}