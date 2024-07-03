import axios from 'axios'
import { Author, LoginReponse } from '../types/author.type'
import httpUser from '../utils/httpUser'

export const getAllUser = () => httpUser.get<Author[]>('allUserAdmin')

export const addUser = (author: Omit<Author, 'userId'>) => httpUser.post('signup', author)

export const getDetailUser = (id: string | number) => httpUser.get<Author>(`getDetail/${id}`)

export const deleteUser = (id: string | number) => httpUser.delete<Author>(`${id}`)

export const updateUser = (author: Omit<Author, 'id'>, id: string | number) =>
  httpUser.post<Author>(`update/${id}`, author)
  
  export const logoutUser = () => axios.post('/api/auth/logout')
  .then(response => {
    console.log('User logged out successfully');
  })
  .catch(error => {
    console.error('Logout error', error);
  });

  export const loginUser = async (username: string, password: string) => {
    try {
      const response = await axios.post<LoginReponse>('http://localhost:8081/api/auth/signin', {
        username,
        password
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      throw error
    }
  }
