import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, Outlet } from 'react-router-dom';

import { getSession } from '../../store/user.slice.js';
import styles from './Layout.module.css';

function Layout() {
  const user = useSelector(state => state.user);

  return (
    <div className="h-full">
      <nav className={styles.header}>
        <div className="flex flex-row pr-10  basis-2/3 justify-self-start">
          <NavLink to={'/'} className={'flex flex-row'}>
            <img
              width={'40px'}
              height={'40px'}
              src="../../../ShiftDeliveryIcon.svg"
              alt="icon"
            />
            <div
              className={
                'pl-2 text-2xl font-bold hover:decoration-0 text-black '
              }
            >
              {' '}
              SHIFT DELIVERY
            </div>
          </NavLink>
        </div>

        {!user.userInfo._id ? (
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
    </div>
  );
}

export default Layout;
