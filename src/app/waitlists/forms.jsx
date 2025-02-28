'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"


const LOGIN_URL = "/api/waitlists/"

export function WaitlistForm({
  className,
  ...props
}) 
{
        const [message, setMessage] = useState("");
        const [error, setError] = useState("");

        async function handleClick(event) {

        event.preventDefault()
        console.log(event, event.target);
        const formData = new FormData(event.target)
        const objectFromForm = Object.fromEntries(formData)
        const jsonData = JSON.stringify(objectFromForm)
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData
        }
        const response  = await fetch(LOGIN_URL, requestOptions)
        
        const data = await response.json()
     
        if (response.ok) {
            setMessage(" Thank you for joining")
        }
        else {
            setError("There was some Error, Please try again")
        }

    }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Waitlist</CardTitle>
          <CardDescription>
            Enter your email below to join the waitlist
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleClick}>
            <div> {message && message} </div>
            <div> {error && error} </div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name= "email"
                  placeholder="Your email"
                  required
                />
              </div>
        
              <Button type="submit" className="w-full">
                Join Waitlist
              </Button>
            
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
