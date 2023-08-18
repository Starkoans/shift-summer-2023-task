import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet } from 'react-router-dom';

import GitHubIcon from '../../public/img/Github_Icon.svg';
import LOGO from '../../public/img/Logo.svg';
import { getToken, isExpired } from '../Auth.js';
import Button from '../atoms/Button.jsx';
import { getSession } from '../store/user/thunks/getSession.js';
import { setUserToken } from '../store/user/user.slice.js';

function Layout() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const tkn = getToken();

  useEffect(() => {
    if (tkn && !isExpired(tkn.timeStamp)) {
      setUserToken(tkn); //не устаналвиает??
      dispatch(getSession(tkn));
    }
  }, []);

  return (
    <>
      <nav className="bg-white text-violet-700  flex justify-between w-full px-10 py-3">
        <div className="self-center">
          <NavLink to={'/'}>
            <img width="150px" height="150px" src={LOGO} alt="icon" />
          </NavLink>
        </div>

        {!tkn || isExpired(tkn.timeStamp) ? (
          <NavLink to="/auth/phone">
            <Button type="button" child="Войти" cn="primary"></Button>
          </NavLink>
        ) : (
          <div className="flex content-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>

            <Link to="/account/profile" className="pl-2 hover:underline">
              {user.phone.phoneNum}
            </Link>
          </div>
        )}
      </nav>
      <Outlet />
      <footer className="bg-gray-950 text-gray-500 text-center p-3 justify-center flex flex-col w-full ">
        <div className="flex self-center">
          <img alt="Github" src={GitHubIcon} className="px-2.5" />
          <Link
            to={
              'https://github.com/Starkoans/shift-summer-2023-task/tree/dev-delivery-a-a-starkova'
            }
            className="hover:underline"
          >
            GitHub Source
          </Link>
        </div>
        <div>
          <p>&copy; 2023 Shift Delivery. Starkoans Pet Project.</p>
        </div>
      </footer>
    </>
  );
}

export default Layout;
