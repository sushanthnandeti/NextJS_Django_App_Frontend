const { cookies } = require("next/headers");

const TOKEN_AGE = 3600;
const TOKEN_NAME = "auth-token";
const TOKEN_REFRESH_NAME = "auth-refresh-token";

// Get the access token
export async function getToken() {
  const cookieStore = await cookies(); // Await cookies() before use
  return cookieStore.get(TOKEN_NAME)?.value;
}

// Get the refresh token
export async function getRefreshToken() {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_REFRESH_NAME)?.value;
}

// Set the access token
export async function setToken(authToken) {
  const cookieStore = await cookies();
  return cookieStore.set({
    name: TOKEN_NAME,
    value: authToken,
    httpOnly: true, // limit client-side JavaScript
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: TOKEN_AGE,
  });
}

// Set the refresh token
export async function setRefreshToken(authRefreshToken) {
  const cookieStore = await cookies();
  return cookieStore.set({
    name: TOKEN_REFRESH_NAME,
    value: authRefreshToken,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: TOKEN_AGE,
  });
}

// Delete both tokens
export async function deleteTokens() {
  const cookieStore = await cookies();
  await cookieStore.delete(TOKEN_REFRESH_NAME);
  return await cookieStore.delete(TOKEN_NAME);
}