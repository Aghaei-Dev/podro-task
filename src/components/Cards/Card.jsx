import styled from '@emotion/styled'
import { toPersianNumber } from '../../utils/number'
import { map } from '../../assets/imgs'

export default function Card({ ip, location: { country, region, city, lat, lng }, domains, as, isp }) {
  return (
    <Wrapper className='flex-between'>
      <div className='left-side '>
        {ip && (
          <h1>
            Ip Address : <span>{toPersianNumber(ip)}</span>
          </h1>
        )}
        {!!lat && (
          <h1>
            latitude : <span>{toPersianNumber(lat)}</span>
          </h1>
        )}
        {country && (
          <h1>
            Country : <span>{country}</span>
          </h1>
        )}
        {!!lng && (
          <h1>
            Longitude : <span>{toPersianNumber(lng)}</span>
          </h1>
        )}
        {region && (
          <h1>
            Region : <span>{region}</span>
          </h1>
        )}
        {isp && (
          <h1>
            ISP : <span>{isp}</span>
          </h1>
        )}
        {city && (
          <h1>
            City : <span>{city}</span>
          </h1>
        )}
      </div>
      <img
        src={map}
        alt='map'
      />
    </Wrapper>
  )
}
const Wrapper = styled('article')(() => ({
  background: 'var(--primary-50)',
  borderRadius: 'var(--md-radius)',
  padding: '1rem',
  margin: 'auto',
  marginTop: '1.5rem',
  maxWidth: '600px',
  '.left-side': {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    textAlign: 'start',
    gap: '1rem 2rem',
  },
  img: {
    width: '161px',
    height: '147px',
    objectFit: 'contain',
    aspectRatio: '16/9',
  },
}))
