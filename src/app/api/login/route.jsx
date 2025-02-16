'use server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getToken, getRefreshToken, setToken, setRefreshToken } from '../../lib/auth'

const DJANGO_API_LOGIN_URL = "http://127.0.0.1:8001/api/token/pair"

export async function POST(request) {

        // const myAuthToken = getToken()
        // const myRefreshToken = getRefreshToken()

        // console.log(myAuthToken, myRefreshToken)

        const requestData = await request.json()
        const jsonData = JSON.stringify(requestData)
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData
        }
        const response  = await fetch(DJANGO_API_LOGIN_URL, requestOptions)
        const responseData = await response.json()
        const authToken = responseData.access
     
        if (response.ok) {
            console.log(" Logged In")
            const {access, refresh } = requestData
            setToken(access)
            setRefreshToken(refresh)
            console.log(responseData)

            const myAuthToken = getToken()
            const myRefreshToken = getRefreshToken()

            console.log(myAuthToken, myRefreshToken)
        }
     // const cookieStore = await cookies(); // Call cookies() function
      
      // await cookies().set({
      //   name: 'auth-token',
      //   value: authToken,
      //   httpOnly: true,
      //   sameSite: 'strict',
      //   maxAge: 3600,
      //   secure: process.env.NODE_ENV !== 'development', 
      // })
     

      return NextResponse.json({ "message": 'Hello World'})
}