"use client"
import { signIn } from 'next-auth/react'
import React from 'react'
import { Button } from '../ui/button'
import { cn } from '~/lib/utils'

const SignInButton = () => {
    const signInWithGoogle = async () => {
        const resp =  await signIn("google")
    
        console.log({resp})
        if (resp?.error) {
          console.error(resp.error)
        }
      }
  return (
    <Button onClick={() => signInWithGoogle()} className={cn(
        "text-xl font-semibold text-white"
      )} variant="default"  >
        Sign in with Google
      </Button>
  )
}

export default SignInButton