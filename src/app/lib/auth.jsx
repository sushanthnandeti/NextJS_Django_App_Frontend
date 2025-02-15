const { cookies } = require("next/headers");

const TOKEN_AGE = 3600
const ACCESS_TOKEN = 'auth-token'
const REFRESH_TOKEN = 'auth-refresh-token'

export function getToken() {
    // API requests to the backend
    const myAuthToken = cookieStore.get(ACCESS_TOKEN)
    return myAuthToken?.value
}   

export function getRefreshToken() {
    // API requests to the backend
    const myAuthToken = cookieStore.get(REFRESH_TOKEN)
    return myAuthToken?.value
}   

export function setToken(authToken) {    
    // login
        cookieStore.set({
        name: ACCESS_TOKEN,
        value: authToken,
        httpOnly: true,
        sameSite: 'strict',
        maxAge: TOKEN_AGE,
        secure: process.env.NODE_ENV !== 'development', 
      })
}

export function setRefreshToken(authRefreshToken) {    
    // login
        cookieStore.set({
        name: REFRESH_TOKEN,
        value: authRefreshToken,
        httpOnly: true,
        sameSite: 'strict',
        maxAge: TOKEN_AGE,
        secure: process.env.NODE_ENV !== 'development', 
      })
}
export function deleteToken() {
    // logout
    cookieStore.delete(REFRESH_TOKEN)
    return cookieStore.delete(ACCESS_TOKEN)
    
}