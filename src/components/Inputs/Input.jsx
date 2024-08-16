import styled from '@emotion/styled'
import { toPersianNumber } from '../../utils/number'
import { Delete } from '../../assets/icons'
export default function Input({
  type,
  number,
  name,
  value,
  handleChange,
  labelText,
  placeholder,
  icon,
  onClick,
  errorText,
  required,
  informationText,
  inlineIcon,
  clearValue,
  leftSide = false,
  isLoading,
  ...props
}) {
  const styles = {
    onClick,
    required,
    errorText,
    informationText,
    inlineIcon,
    isLoading,
  }

  return (
    <Wrapper styles={styles}>
      <div className='input-wrapper'>
        {inlineIcon && (
          <span
            className='inline-icon'
            onClick={clearValue}
          >
            {value ? <Delete /> : inlineIcon}
          </span>
        )}
        <input
          {...props}
          placeholder={placeholder}
          id={name}
          name={name}
          type={type}
          value={number ? toPersianNumber(value) : value}
          onChange={handleChange}
        />
        {icon && (
          <span
            className='icon'
            onClick={onClick}
          >
            {icon}
          </span>
        )}
      </div>
      <span className={errorText ? 'error' : 'information'}>{errorText || informationText}</span>
    </Wrapper>
  )
}

const Wrapper = styled('div')(({ styles: { required, errorText, onClick, inlineIcon, isLoading } }) => ({
  direction: 'rtl',
  fontFamily: 'inherit',
  width: '100%',
  maxWidth: '500px',
  margin: 'auto',
  label: {
    display: 'block',
    fontSize: '0.8rem',
    marginBottom: '0.5rem',
    color: 'var(--text-main)',
    '::after': {
      content: "'*'",
      padding: '.2rem',
      display: errorText && required ? '' : 'none',
      color: 'var(--error-300)',
    },
  },
  input: {
    textTransform: 'none',
    width: '100%',
    background: 'var(--text-white)',
    height: '45px',
    padding: !inlineIcon && '.5rem',
    fontFamily: 'inherit',
    direction: 'rtl',
    fontSize: '1rem',
    border: ' 1px solid var(--text-200)',
    borderRight: inlineIcon && 'none',
    borderRadius: !inlineIcon && 'var(--md-radius)',
  },
  '.input-wrapper': {
    borderRadius: 'var(--md-radius)',
    display: 'flex',
    alignItems: 'center',
    span: {
      cursor: onClick ? 'pointer' : 'default',
      alignSelf: 'stretch',
      padding: '.375rem',
      background: 'var(--primary-500)',
      display: 'grid',
      placeItems: 'center',
      borderTopLeftRadius: 'var(--md-radius)',
      borderBottomLeftRadius: 'var(--md-radius)',
      svg: {
        color: 'var(--text-white)',
        width: '50px',
        height: '30px',
      },
      '*': {
        cursor: onClick ? 'pointer' : 'default',
      },
    },
    '.inline-icon': {
      border: ' 1px solid var(--text-200)',
      borderLeft: 'none',
      background: 'transparent',
      borderTopRightRadius: 'var(--md-radius)',
      borderBottomRightRadius: 'var(--md-radius)',
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0',

      svg: {
        color: 'var(--text-300)',
        width: '30px',
      },
    },
    '.icon': {
      pointerEvents: isLoading && 'none',
      background: isLoading && 'var(--text-500)',
    },
  },

  '.error': {
    color: 'var(--error-300)',
    fontSize: '.7rem',
    lineHeight: '1',
  },
  '.information': {
    color: 'var(--info-300)',
    fontSize: '.7rem',
    lineHeight: '1',
    '::selection': {
      background: 'var(--primary-500)',
      color: 'var(--text-white)',
    },
  },
  '::placeholder': {
    fontFamily: 'inherit',
    color: 'var(--text-400)',
    fontSize: '.4rem',
  },
}))
