'use client'

const { createContext, useContext, useState, useEffect} = require("react");

const AuthContext = createContext(null);

const LOCAL_STORAGE_KEY = 'token-item'


export function AuthProvider({children}) {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false)

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
    }
    const logout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem(LOCAL_STORAGE_KEY, "0")
        }

    return <AuthContext.Provider value = {{isAuthenticated, login, logout}}>
        {children}
    </AuthContext.Provider>
}

export function useAuth(){
    return useContext(AuthContext)
}