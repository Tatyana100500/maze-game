import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000',
})

export const logIn = payload => api.post(`/login`, payload)
export const getAllPosts = () => api.get(`/posts`)


const apis = {
	logIn,
    getAllPosts,
}

export default apis
