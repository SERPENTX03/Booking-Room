import React from 'react'
import {SubmitLogot} from './SubmitButton'
import { signOutAction } from '@/actions/authAction'

const SignOutBtn = () => {
  return (
        <form action={signOutAction}>
            <SubmitLogot/>
        </form>
    
  )
}

export default SignOutBtn