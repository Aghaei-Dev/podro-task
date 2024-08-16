import styled from '@emotion/styled'
import { useToggle, useCountdown } from '../hooks'
import { useState } from 'react'
import { Button, Input } from '../components'
import { toEnglishDigits, toPersianNumber } from '../utils/number'
import { toast } from 'sonner'
import { Back } from '../assets/icons'
import OtpInput from 'react-otp-input'
import { useNavigate } from 'react-router-dom'
import { phoneNumberValidator } from '../utils/validation'

export default function Auth() {
  const [hasAccount, toggleHasAccount] = useToggle(true)
  const timer = useCountdown(120, { startOnMount: false })

  // verification
  // mobile
  const [activeStep, setActiveStep] = useState('mobile')
  const [mobile, setMobile] = useState('')

  const validateMobile = () => {
    if (phoneNumberValidator(toEnglishDigits(mobile))) {
      setActiveStep('verification')
      timer.start()
    } else {
      toast.error('لظفا شماره موبایل را به صورت صحیح وارد کنید')
      setActiveStep('mobile')
    }
  }
  return (
    <Wrapper>
      <section className='center '>
        {activeStep === 'mobile' && (
          <AuthFormMobileStep
            hasAccount={hasAccount}
            toggleHasAccount={toggleHasAccount}
            onNext={() => validateMobile()}
            mobile={mobile}
            setMobile={setMobile}
          />
        )}

        {activeStep === 'verification' && (
          <AuthFormVerificationStep
            mobile={mobile}
            timer={timer}
            onBack={() => setActiveStep('mobile')}
          />
        )}
      </section>
    </Wrapper>
  )
}

const AuthFormMobileStep = ({ hasAccount, toggleHasAccount, onNext, mobile, setMobile }) => {
  return (
    <AuthFormMobileStepWrapper className='flex-column gap-2'>
      <h1>پادرو</h1>
      <span>
        <h3>به پنل مدیریت تسک پادرو خوش آمدید</h3>
        <p>برای ورود لطفا شماره موبایل خود را وارد کنید</p>
      </span>
      <form
        className='flex-column gap-2'
        onSubmit={(e) => {
          e.preventDefault()
          onNext()
        }}
      >
        <Input
          number
          placeholder='شماره موبایل'
          handleChange={(e) => setMobile(e.target.value)}
          value={mobile}
        />
        <Button
          type='submit'
          fullWidth
          text='ارسال کد تایید'
          variant='contained'
        />
      </form>

      <div className='bottom '>
        <span onClick={toggleHasAccount}>{hasAccount ? 'ثبت نام' : 'وارد شوید'}</span>
        {hasAccount ? 'حساب کاربری ندارید؟' : 'قبلا ثبت نام کرده اید؟'}
      </div>
    </AuthFormMobileStepWrapper>
  )
}
const AuthFormVerificationStep = ({ mobile, timer, onBack }) => {
  const [code, setCode] = useState('')
  const navigate = useNavigate()
  return (
    <AuthFormVerificationStepWrapper className='flex-column gap-2'>
      <Button
        onClick={() => onBack()}
        className='back-btn'
        icon={<Back />}
      />

      <h1>پادرو</h1>
      <div className='flex-column gap-1'>
        <h3>کد تایید را وارد کنید</h3>
        <p>کد تایید برای شماره {toPersianNumber(mobile)} پیامک شد</p>
        <Button
          onClick={() => onBack()}
          text='تغییر شماره'
          variant='link'
          className='change-mobile'
        />
      </div>

      <OtpInput
        containerStyle={{ display: 'flex', justifyContent: 'space-between' }}
        inputStyle={{
          textAlign: 'center',
          fontSize: '2rem',
          width: '60px',
          height: '60px',
          border: '1px solid var(--text-300)',
          borderRadius: 'var(--md-radius)',
        }}
        value={code}
        onChange={setCode}
        numInputs={4}
        renderInput={(props) => <input {...props} />}
      />
      {timer.timeLeft.total > 0 ? (
        <div className='flex-between timer'>
          <span>
            {timer.timeLeft.minutes}:{timer.timeLeft.seconds}
          </span>
          تا ارسال مجدد
        </div>
      ) : (
        <Button
          onClick={() => timer.reset()}
          text='ارسال مجدد'
          variant='link'
        />
      )}
      <Button
        text='تایید'
        variant='contained'
        onClick={() => {
          console.log(code)

          if (toEnglishDigits(code) === '1111') {
            navigate('/')
          } else {
            toast.error('کد اشتباه است.')
          }
        }}
      />
    </AuthFormVerificationStepWrapper>
  )
}

const Wrapper = styled('main')(() => ({
  display: 'grid',
  placeItems: 'center',
  height: '100dvh',
  margin: 'auto',
  '.center': {
    width: '400px',
    border: '1px solid var(--text-200)',
    textAlign: 'center',
    background: 'var(--bg-white)',
    borderRadius: 'var(--radius)',
    padding: '2rem 1.5rem',
    h1: {},
    h3: { fontWeight: 500 },
    p: {
      fontWeight: 300,
      color: 'var(--text-500)',
    },
    '.bottom': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '.5rem',
      span: {
        textDecoration: 'underline',
        cursor: 'pointer',
        color: 'var(--primary-500)',
        transition: '.3s all',
        ':hover': {
          color: 'var(--primary-600)',
        },
      },
    },
  },
}))
const AuthFormVerificationStepWrapper = styled('div')(() => ({
  position: 'relative',
  '.back-btn': { position: 'absolute', left: '0', top: '0', padding: '.5rem' },
  '.change-mobile': { width: '100px', padding: '0 .5rem', margin: 'auto' },
  '.timer': {
    span: {
      minWidth: '2.5rem',
      textAlign: 'center',
    },
  },
}))
const AuthFormMobileStepWrapper = styled('div')(() => ({}))
