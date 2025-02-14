'use client'

// --> url --> /login    

const LOGIN_URL = "http://127.0.0.1:8001/api/token/pair"

export default function Login() {

    async function handleClick(event) {
        event.preventDefault()
        console.log(event, event.target);
        const formData = new FormData(event.target)
        const objectFromForm = Object.fromEntries(formData)
        const jsonData = JSON.stringify(objectFromForm)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData
        }
        const response  = await fetch(LOGIN_URL, requestOptions)
        const data = await response.json()
        console.log(data)
        if (response.ok) {
            console.log(" Logged In")
        }

    }

    return <div className="h-[95vh]"> 
                <div className=" max-w-md mx-auto py-5">
                    <h1>Login Here</h1>
                    <form onSubmit={handleClick}>
                        <input type="text" required name="username" placeholder="enter your name here" />
                        <input type="text" required name="password" placeholder="enter your password here" />

                        <button type="submit"> Login  </button>
                    </form>
                </div>
            </div>
    }