'use server'

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'


export async function POST(request) {

      const data = await request.json()
      console.log(data)
      const cookieStore = await cookies(); // Call cookies() function
      const authToken =  await cookieStore.get('auth-token')

      await cookieStore.set({
        name: 'auth-token',
        value: 'abc',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 3600,
        secure: process.env.NODE_ENV !== 'development', 
      })
      
      return NextResponse.json({ "message": 'Hello World', "cookie" : authToken })
}