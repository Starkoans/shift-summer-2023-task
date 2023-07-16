import { useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

import { removeUser } from '../../../store/user.slice.js';
import styles from './AccountHeader.module.css';

function AccountHeader() {
  const dispatch = useDispatch();
  return (
    <div className={styles.account}>
      <header>
        <div>
          <Link to={'profile'}>Профиль</Link>
        </div>

        <div>
          <Link to={'history'}>История отправлений</Link>
        </div>

        <div className={'grow'}>
          <Link
            className={'text-red-500'}
            onClick={e => dispatch(removeUser())}
            to={'/'}
          >
            Выйти
          </Link>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
export default AccountHeader;
