
import {z} from 'zod'

export const RecipeFormSchema = z.object({
    title: z.string().min(1, 'Please enter title.'),
    ingredients: z.array(z.string()).or(z.literal([])),
    instructions: z.string().min(1, 'Please enter instructions.'),
    imageUrl: z.string().url('Please enter valid Image URL')
})