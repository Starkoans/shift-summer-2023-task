import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

function AccountHeader() {
  const location = useSelector(state => state.user.location);
  const [accountLocation, setAccountLocation] = useState(location);
  const handleLocation = e => {
    setAccountLocation(e.target.id);
  };
  useEffect(() => {
    setAccountLocation(location);
  }, [location]);
  return (
    <div>
      <header className="bg-purple-300 text-gray-800 flex">
        <div
          className={
            accountLocation === 'profile'
              ? 'p-3 flex items-center justify-items-center w-auto sm:justify-center bg-gray-100 border-r-2 border-l-2 border-t-2'
              : 'm-3 flex items-center justify-items-center w-auto sm:justify-center'
          }
        >
          <div className="w-6 h-6 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <Link to="profile" id="profile" onClick={handleLocation}>
            Профиль
          </Link>
        </div>

        <div
          className={
            accountLocation === 'history'
              ? 'p-3 flex items-center justify-items-center w-auto sm:justify-center bg-gray-100 border-r-2 border-l-2 border-t-2'
              : 'm-3 flex items-center justify-items-center w-auto sm:justify-center'
          }
        >
          <div className="w-6 h-6 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <Link to="history" id="history" onClick={handleLocation}>
            История отправлений
          </Link>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
export default AccountHeader;
