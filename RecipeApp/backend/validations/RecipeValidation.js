

import {z} from 'zod'

export const RecipeSchemaValidation = z.object({
    title: z.string().min(1, 'Title is required.'),
    ingredients: z.array(z.string()).min(1, 'At last one ingredients required'),
    instructions: z.string(),
    image: z.string().url('Please enter valid Image URL')
})