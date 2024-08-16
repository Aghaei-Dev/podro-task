import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { DotsLoader } from '../'

export default function Button({
  variant,
  text,
  disabled = false,
  loading = false,
  href,
  icon,
  img,
  pending = false,
  onClick = () => {},
  ...props
}) {
  const navigate = useNavigate()

  return (
    <Wrapper
      variant={variant}
      {...props}
      onClick={() => {
        navigate(href)
        onClick()
      }}
      style={{
        background: pending || disabled ? 'var(--text-600)' : '',
        pointerEvents: pending || disabled ? 'none' : 'all',
      }}
    >
      {pending ? (
        <DotsLoader />
      ) : (
        <>
          {img && (
            <img
              src={img}
              alt={text}
            />
          )}
          {icon}
          {text}
        </>
      )}
    </Wrapper>
  )
}

const BaseStyle = css`
  border-radius: var(--md-radius);
  padding: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-family: inherit;
  text-transform: capitalize;

  img {
    width: 40px;
  }
`

const variantStyles = {
  contained: css`
    background-color: var(--primary-600);
    color: var(--text-white);
    border: none;
  `,
  outlined: css`
    background-color: transparent;
    color: var(--primary-500);
    border: 1px solid var(--primary-500);
  `,
  ghost: css`
    background-color: transparent;
    color: var(--text-white);
  `,
  link: css`
    background-color: transparent;
    color: var(--primary-500);
    :hover {
      text-decoration: underline;
    }
  `,
}

const Wrapper = styled.button`
  ${BaseStyle};
  ${({ variant }) => variantStyles[variant]};
`
