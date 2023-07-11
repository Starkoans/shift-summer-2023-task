import { useSelector } from 'react-redux';
import { Link, NavLink, Outlet } from 'react-router-dom';

import styles from './Layout.module.css';

function Layout() {
  const user = useSelector(state => state.user);

  return (
    <>
      <nav className={styles.header}>
        {!user.token ? (
          <>
            <button>
              <NavLink to={'/auth/phone'}>Войти в личный кабинет</NavLink>
            </button>
          </>
        ) : (
          <>
            <Link to={'/account'}>{user.phone.phoneNum}</Link>
          </>
        )}
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;
