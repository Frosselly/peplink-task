import { Outlet } from 'react-router'
import NavigationBar from '../components/NavBar/NavigationBar'

function App() {
  return (
    <>
      <NavigationBar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
