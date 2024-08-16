import axios, { HttpStatusCode } from 'axios'
import { toast } from 'sonner'

export const AXIOS = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
})

const errorInterceptor = async (axiosError) => {
  axiosError.status = axiosError.response?.status

  if (axiosError.response?.status === HttpStatusCode.InternalServerError) localStorage.removeItem('token')
  if (axiosError.status === HttpStatusCode.Unauthorized) {
    localStorage.removeItem('token')
  } else if (axiosError.response?.status == HttpStatusCode.TooManyRequests) toast.error('درخواست خیلی زیاد! بعدا دوباره تلاش کنید')
  else if ((axiosError.response?.status ?? 0) >= HttpStatusCode.InternalServerError) toast.error('خطای غیر منتظره')

  return Promise.reject(axiosError)
}

// Response interceptors
AXIOS.interceptors.response.use((res) => res, errorInterceptor)
