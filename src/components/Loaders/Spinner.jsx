import styled from '@emotion/styled'

export default function Spinner({ size, color }) {
  return (
    <SpinnerWrapper
      size={size}
      color={color}
    />
  )
}
const SpinnerWrapper = styled.progress`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-sizing: border-box;
  border: none;
  border-radius: 50%;
  padding: 0.25em;
  width: 30px;
  height: 30px;
  color: ${({ color }) => color};
  background-color: transparent;
  font-size: ${({ size }) => `${size}px`};
  overflow: hidden;

  ::-webkit-progress-bar {
    background-color: transparent;
  }

  /* Indeterminate */
  :indeterminate {
    -webkit-mask-image: linear-gradient(transparent 50%, black 50%), linear-gradient(to right, transparent 50%, black 50%);
    mask-image: linear-gradient(transparent 50%, black 50%), linear-gradient(to right, transparent 50%, black 50%);
    animation: circular 6s infinite cubic-bezier(0.3, 0.6, 1, 1);
  }

  :-ms-lang(x),
  :indeterminate {
    animation: none;
  }

  :indeterminate::before,
  :indeterminate::-webkit-progress-value {
    content: '';
    display: block;
    box-sizing: border-box;
    margin-bottom: 0.25em;
    border: solid 0.25em transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    width: 100% !important;
    height: 100%;
    background-color: transparent;
    animation: pseudo 0.75s infinite linear alternate;
  }

  :indeterminate::-moz-progress-bar {
    box-sizing: border-box;
    border: solid 0.25em transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background-color: transparent;
    animation: pseudo 0.75s infinite linear alternate;
  }

  :indeterminate::-ms-fill {
    animation-name: -ms-ring;
  }

  @keyframes circular {
    0% {
      transform: rotate(0deg);
    }
    12.5% {
      transform: rotate(180deg);
      animation-timing-function: linear;
    }
    25% {
      transform: rotate(630deg);
    }
    37.5% {
      transform: rotate(810deg);
      animation-timing-function: linear;
    }
    50% {
      transform: rotate(1260deg);
    }
    62.5% {
      transform: rotate(1440deg);
      animation-timing-function: linear;
    }
    75% {
      transform: rotate(1890deg);
    }
    87.5% {
      transform: rotate(2070deg);
      animation-timing-function: linear;
    }
    100% {
      transform: rotate(2520deg);
    }
  }

  @keyframes pseudo {
    0% {
      transform: rotate(-30deg);
    }
    29.4% {
      border-left-color: transparent;
    }
    29.41% {
      border-left-color: currentColor;
    }
    64.7% {
      border-bottom-color: transparent;
    }
    64.71% {
      border-bottom-color: currentColor;
    }
    100% {
      border-left-color: currentColor;
      border-bottom-color: currentColor;
      transform: rotate(225deg);
    }
  }
`
