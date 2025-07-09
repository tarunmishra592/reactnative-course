
import { z } from 'zod'

export const SignUpSchema = z.object({
    first_name: z.string().trim().min(1, 'First name is required.'),
    last_name: z.string().trim().min(1, 'Last name is required.'),
    email: z.string().trim().email(1, 'Invalid email.'),
    password: z.string().min(6, 'Password must be at last 6 character.')
})


export const LoginSchema = z.object({
    email: z.string().trim().email(1, 'Invalid email.'),
    password: z.string().min(6, 'Password must be at last 6 character.')
})