import { Link } from 'react-router'
import styles from './NavigationBar.module.css'

function NavigationBar() {
  return (
    <nav className={styles.nav}>
      <Link to={'/'}>Page One</Link>
      <Link to={'/two'}>Page Two</Link>
    </nav>
  )
}

export default NavigationBar
