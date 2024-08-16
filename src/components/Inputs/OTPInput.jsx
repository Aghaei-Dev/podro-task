import styled from '@emotion/styled'
import { useRef, useState } from 'react'

export default function OTPInput({ length = 4, onComplete }) {
  const inputsRef = useRef([])
  const [otpValues, setOtpValues] = useState(new Array(length).fill(''))

  const handleChange = (e, index) => {
    const newValue = e.target.value.replace(/\D/g, '') 
    otpValues[index] = newValue
    setOtpValues([...otpValues])

    if (newValue.length === 1 && index < inputsRef.current.length - 1) {
      const nextInput = inputsRef.current[index + 1]
      nextInput.focus()
    }

    if (newValue.length === 0 && index > 0) {
      const prevInput = inputsRef.current[index - 1]
      prevInput.focus()
    }

    if (index === inputsRef.current.length - 1 && newValue.length === 1) {
      onComplete(otpValues.join(''))
    }
  }

  return (
    <Wrapper className='flex-between'>
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          type='text'
          maxLength={1}
          onChange={(e) => handleChange(e, i)}
          ref={(el) => (inputsRef.current[i] = el)}
          value={otpValues[i]}
        />
      ))}
    </Wrapper>
  )
}
const Wrapper = styled('div')(() => ({
  input: {
    width: '60px',
    height: '60px',
    borderRadius: 'var(--md-radius)',
    border: '1px solid var(--text-300)',
    textAlign: 'center',
    fontSize: '2rem',
  },
}))
