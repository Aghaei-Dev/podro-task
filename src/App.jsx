import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Wrapper, Error, Auth, Home } from './pages'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path=''
          element={<Wrapper />}
        >
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/auth'
            element={<Auth />}
          />
          <Route
            path='*'
            element={<Error />}
          />
        </Route>
      </Routes>
    </Router>
  )
}
