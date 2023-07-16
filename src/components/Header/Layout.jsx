import { useSelector } from 'react-redux';
import { Link, NavLink, Outlet } from 'react-router-dom';

import Button from '../../atoms/Button.jsx';

function Layout() {
  const user = useSelector(state => state.user);

  return (
    <>
      <nav className="bg-white text-violet-700  flex justify-between w-screen px-10">
        <div className="self-center">
          <NavLink to={'/'}>
            <img
              width={'150px'}
              height={'150px'}
              src="../../../ShiftDeliveryIcon.svg"
              alt="icon"
            />
          </NavLink>
        </div>

        {!user.token ? (
          <>
            <NavLink to={'/auth/phone'}>
              <Button text="Войти в личный кабинет" type="login"></Button>
            </NavLink>
          </>
        ) : (
          <div className="flex content-center p-2">
            <img
              alt="Profile icon"
              width="20px"
              src="../../../ProfileIcon.svg"
              className="m-2"
            />
            <Link to={'/account'}>{user.phone.phoneNum}</Link>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;
