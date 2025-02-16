const { cookies } = require("next/headers")


const TOKEN_AGE = 3600
const ACCESS_TOKEN = 'auth-token'
const REFRESH_TOKEN = 'auth-refresh-token'

export async function getToken() {
    // API requests to the backend
    const myAuthToken = await cookies().get(ACCESS_TOKEN)
    return myAuthToken?.value
}   

export async function getRefreshToken() {
    // API requests to the backend
    const myAuthToken = await cookies().get(REFRESH_TOKEN)
    return myAuthToken?.value
}   

export async function setToken(authToken) {    
    // login
        await cookies().set({
        name: ACCESS_TOKEN,
        value: authToken,
        httpOnly: true,
        sameSite: 'strict',
        maxAge: TOKEN_AGE,
        secure: process.env.NODE_ENV !== 'development', 
      })
}

export async function setRefreshToken(authRefreshToken) {    
    // login
        await cookies().set({
        name: REFRESH_TOKEN,
        value: authRefreshToken,
        httpOnly: true,
        sameSite: 'strict',
        maxAge: TOKEN_AGE,
        secure: process.env.NODE_ENV !== 'development', 
      })
}
export async function deleteToken() {
    // logout
    await cookies().delete(REFRESH_TOKEN)
    return await cookies().delete(ACCESS_TOKEN)
    
}