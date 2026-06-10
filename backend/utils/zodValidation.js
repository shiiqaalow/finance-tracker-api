import { z } from 'zod'
// signup validation
export const createUserSchema = z.object({
    name: z.string().min(1,'Name is required.'),
    email: z.email('Invalid Email address'),
    password: z.string().min(4,'Password should be minimum 4 characters'),
    role: z.enum(['admin','user']).optional(),
    profilePicture: z.string().optional()
})
// signin validation
export const createSigninSchema = z.object({
    email: z.email('Invalid Email address'),
    password: z.string().min(4,'Password should be minimum 4 characters'),
})
// transaction validation
export const createTransactionSchema = z.object({
    title: z.string().min(1,'Title is required'),
    amount: z.number({
        required_error: "Amount is required",
    }),
    type: z.enum(['income','expense']),
    category: z.string().min(1,'Category is required'),
}) 




