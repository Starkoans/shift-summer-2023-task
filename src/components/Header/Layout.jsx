import { Link, NavLink, Outlet } from 'react-router-dom';

import useAuth from '../../hooks/useAuth.js';
import styles from './Layout.module.css';

function Layout() {
  const user = useAuth();
  // const [user, setUser] = useState('+79137200000');

  // setUser()

  return (
    <>
      <nav className={styles.header}>
        {!user.isAuth ? (
          <>
            <button>
              <NavLink to={'/auth/phone'}>Войти в личный кабинет</NavLink>
            </button>
          </>
        ) : (
          <>
            <Link to={'/account'}>{user.phone}</Link>
          </>
        )}
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;
