'use client'

import { useAuth } from "../components/authProvider";
// --> url --> /login    

const LOGOUT_URL = "/api/logout/"

export default function Page() {

    const auth = useAuth()

    async function handleClick(event) {
        event.preventDefault()
   
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: ""
        }
        const response  = await fetch(LOGOUT_URL, requestOptions)
        
        const data = await response.json()
     
        if (response.ok) {
            console.log(" Logged Out")
            auth.logout()
        }
    }

    return <div className="h-[95vh]"> 
                <div className=" max-w-md mx-auto py-5">
                    <h1>Are you sure you want to logout?</h1>
                    <button className="bg-red-500 text-white px-3 py-2 hover:bg-red-300"
                            onClick={handleClick}> Yes, Logout  </button>

                </div>
            </div>
    }