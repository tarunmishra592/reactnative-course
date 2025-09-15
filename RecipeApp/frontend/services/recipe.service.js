
import api from '../api/api'


export const CreateRecipeCall = (payload) => {
    return api.post('/recipes/create', payload)
}

export const GetMyRecipeCall = () => {
    return api.get('/recipes/my')
}

export const GetRecipeRating = (id) => {
    return api.get(`/recipes/${id}`)
}

export const PostRecipeRating = (id, payload) => {
    return api.post(`/recipes/${id}/rate`, payload)
}