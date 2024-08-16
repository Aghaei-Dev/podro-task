import styled from '@emotion/styled'
import { pattern } from '../assets/imgs'
import { Card, Input, Spinner } from '../components'
import { NotAllowed, Search } from '../assets/icons'
import { useEffect, useState } from 'react'
import { ipv4Validator, ipv6Validator } from '../utils/validation'
import { toast } from 'sonner'
import { toEnglishDigits } from '../utils/number'
import { AXIOS } from '../lib'
import { useLocalStorage, useThrottle } from '../hooks'
export default function Home() {
  const [ipAddress, setIpAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useLocalStorage('data', [])
  const [placeHolder, setPlaceHolder] = useState('جستجو')

  const clearValue = () => {
    setIpAddress('')
  }
  const handleSubmit = () => {
    if (ipv4Validator(toEnglishDigits(ipAddress)) || ipv6Validator(toEnglishDigits(ipAddress))) {
      setIsLoading(true)
      AXIOS.get(`country,city?apiKey=${import.meta.env.VITE_API_KEY}&ipAddress=${toEnglishDigits(ipAddress)}`)
        .then((response) => {
          if (data) {
            setData([...data, response.data])
          } else {
            setData([response.data])
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
          setIpAddress('')
        })
      toast.success('ای پی درست است')
    } else {
      toast.error('لطفا آی پی را به صورت صحیح وارد کنید')
    }
  }
  const [throttledSubmit, canInvoke] = useThrottle(handleSubmit, 12_000)
  useEffect(() => {
    if (canInvoke) {
      setPlaceHolder('جستجو')
    } else {
      setPlaceHolder('لطفا صبر کنید')
    }
  }, [canInvoke])
  return (
    <Wrapper>
      <section className='center'>
        <h1>آی پی مدنظر خود را پیدا کنید</h1>
        <p>
          اگر بتوانید آدرس IPv4 یا IPv6 یک کاربر اینترنت را بیابید، می توانید با استفاده از ابزار جستجوی IP ما، ایده ای از آن کشور یا جهان
          پیدا کنید. چه باید کرد: آدرس IP مورد نظر خود را در کادر زیر وارد کنید، سپس روی "دریافت جزئیات IP" کلیک کنید.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            throttledSubmit()
          }}
        >
          <Input
            number
            isLoading={isLoading || !canInvoke}
            value={ipAddress}
            handleChange={(e) => setIpAddress(e.target.value)}
            placeholder={placeHolder}
            icon={
              isLoading ? (
                <Spinner
                  size={5}
                  color='var(--text-white)'
                />
              ) : canInvoke ? (
                <Search />
              ) : (
                <NotAllowed />
              )
            }
            inlineIcon={<Search />}
            onClick={throttledSubmit}
            clearValue={clearValue}
          />
        </form>
        <section className={`list ${data?.length > 0 ? 'active' : ''}`}>
          {data?.length > 0 &&
            data.map((item, index) => {
              return (
                <Card
                  key={index}
                  {...item}
                />
              )
            })}
        </section>
      </section>
    </Wrapper>
  )
}
const Wrapper = styled('main')(() => ({
  backgroundImage: `url(${pattern})`,
  backgroundSize: 'contain',
  display: 'grid',
  placeItems: 'center',
  height: '100dvh',
  ' .center': {
    border: '1px solid var(--text-200)',
    textAlign: 'center',
    background: 'var(--bg-white)',
    borderRadius: 'var(--radius)',
    padding: '2rem 1.5rem',
    width: '800px',
    h1: { fontWeight: '400' },
    p: {
      direction: 'rtl',
      color: 'var(--text-500)',
      margin: '1rem 0',
    },
  },
  '.list': {
    transition: 'max-height 1s',
    maxHeight: '0',
    // overflow: 'auto',
  },
  '.active': {
    maxHeight: '680px',
  },
}))
