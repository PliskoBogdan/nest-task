import { Document } from 'mongoose'

export interface User
    extends Document{
        
        username: string,
        first_name: string,
        last_name: string,
        password: string
    }