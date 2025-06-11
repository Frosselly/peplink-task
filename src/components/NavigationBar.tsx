import { Link, Outlet } from 'react-router'
import '../App.css'

function NavigationBar() {
  return (
    <>
      <nav>
        <Link to={'/'}>Page One</Link>
        <Link to={'/two'}>Page Two</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default NavigationBar
