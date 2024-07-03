import { QueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { loginUser } from '../../apis/author.api'
import { LoginReponse } from '../../types/author.type'
import { schema, Schema } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { boolean } from 'yup'
import { useAuth } from '../../contexts/AuthContextType'

type Login = Schema

const initTialFormLogin: Login = {
  username: '',
  password: ''
}

const initTialLoginRepond: LoginReponse = {
  token: '',
  username: '',
  email: '',
  roles: []
}
export default function Login() {
  const { login,logout } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<Login>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate()

  const [formLogin, setFormLogin] = useState<Login>(initTialFormLogin)
  const [loginRepond, setLoginRepond] = useState<LoginReponse>(initTialLoginRepond)
  const handleInput = (name: keyof Login) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormLogin((prev) => ({ ...prev, [name]: event.target.value }))
    console.log(event.target.value)
  }

  const handleSubmitLogin: SubmitHandler<Login> = async (data) => {
    try {
      const response = await loginUser(formLogin.username, formLogin.password);
      if (response.token) {
        login("Bearer " + response.token);
        if (response.roles.includes('ROLE_ADMIN')) {
          alert("Login thành công")
          navigate('/userList');
        } else if (response.roles.includes('ROLE_USER')) {
          navigate('/');
        }
      }
    } 
    catch (error) {
      console.error('Login failed:', error);
    }
  }
  return (
    <div>
      <form className='max-w-sm mx-auto' onSubmit={handleSubmit(handleSubmitLogin)}>
        <div className='mb-5'>
          <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            User name
          </label>
          <input
          {...register('username')} 
          name='username'
            value={formLogin?.username}
            onChange={handleInput('username')}
            type='text'
            id='username'
            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
            placeholder='name@flowbite.com'
            // required
          />
          {errors.username && <p className='text-red-600'>{errors.username.message}</p>}
        </div>
        <div className='mb-5'>
          <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Your password
          </label>
          <input
            {...register('password')} 
            name='password'
            value={formLogin?.password}
            onChange={handleInput('password')}
            type='password'
            id='password'
            className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
            // required
          />
               {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
        </div>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Đăng nhập
        </button>
      </form>
    </div>
  )
}
