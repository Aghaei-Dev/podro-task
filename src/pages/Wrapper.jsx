import { Outlet } from 'react-router-dom'

import { Toaster } from 'sonner'

export default function Wrapper() {
  return (
    <main className='fixed-width'>
      <Outlet />

      <Toaster
        position='top-center'
        dir='rtl'
        toastOptions={{
          style: {
            padding: '.5rem',
            fontFamily: 'inherit',
            fontSize: '1rem',
            color: 'var(--text-800)',
          },
        }}
      />
    </main>
  )
}
