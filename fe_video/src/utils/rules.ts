import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export const schema = yup.object({
  username: yup.string().required('Username là bắt buộc'),
  password: yup.string().required('Password là bắt buộc')
})

export type Schema = yup.InferType<typeof schema>