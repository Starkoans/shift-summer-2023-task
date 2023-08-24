import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getToken, isExpired } from '../Auth.js';
import AccountHeader from '../components/Account/AccountHeader.jsx';
import { getSession } from '../store/user/thunks/getSession.js';
import Unauthorized from '../../public/img/Unauthorized.svg'

function AccountPage() {
  const dispatch = useDispatch();
  const tkn = getToken();
  useEffect(() => {
    if (tkn && !isExpired(tkn.timeStamp)) {
      dispatch(getSession(tkn));
    }
  }, []);
  return (
    <div className="bg-gray-100 m-5">
      {tkn && !isExpired(tkn.timeStamp) ? (
        <AccountHeader />
      ) : (
        <div className="flex align-middle flex-col h-screen p-10">
          <div className="flex flex-col justify-center align-middle">
            <img
              alt="Unauthorized"
              src={Unauthorized}
              className="w-32 h-32 self-center animate-pulse mb-5"
            />
          </div>
          <p className="text-center">
            <Link
              to="/auth/phone"
              className="text-purple-900 font-bold hover:text-purple-700"
            >
              Авторизируйтесь
            </Link>
            , чтобы просмотреть профиль.
          </p>
        </div>
      )}
    </div>
  );
}
export default AccountPage;
