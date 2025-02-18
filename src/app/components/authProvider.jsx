'use client'

import { usePathname, useRouter } from "next/navigation";

const { createContext, useContext, useState, useEffect} = require("react");

const AuthContext = createContext(null);

const LOCAL_STORAGE_KEY = 'token-item'
const LOGIN_REDIRECT_URL = '/'
const LOGOUT_REDIRECT_URL = '/logout'
const LOGIN_REQUIRED_URL = '/login'

export function AuthProvider({children}) {
    
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const storedAuthStatus = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (storedAuthStatus) {
            const storedAuthStatusInt = parseInt(storedAuthStatus)
            setIsAuthenticated(storedAuthStatusInt === 1 )
        }
}, [])

    const login = () => {
        setIsAuthenticated(true)
        localStorage.setItem(LOCAL_STORAGE_KEY, "1")
        router.replace(LOGIN_REDIRECT_URL)
    }

    const logout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem(LOCAL_STORAGE_KEY, "0")
        router.replace(LOGOUT_REDIRECT_URL)
        }

    const loginRequiredRedirect = () => {
            // the user is not authenticated via the api

            setIsAuthenticated(false)
            localStorage.removeItem(LOCAL_STORAGE_KEY, "0")
            let loginWithNextUrl = `${LOGIN_REQUIRED_URL}?next=${pathname}`
            if (LOGIN_REQUIRED_URl === pathname) {
                loginWithNextUrl = `${LOGIN_REQUIRED_URL}`
            }
            router.replace(loginWithNextUrl)
            }

    return <AuthContext.Provider value = {{isAuthenticated, login, logout, loginRequiredRedirect}}>
        {children}
    </AuthContext.Provider>
}

export function useAuth(){
    return useContext(AuthContext)
}