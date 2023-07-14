import { useSelector } from 'react-redux';

import AccountHeader from '../components/Account/AccountHeader/AccountHeader.jsx';

function AccountPage() {
  const user = useSelector(state => state.user);

  return (
    <div className="bg-gray-100">
      {user.userInfo._id ? (
        <AccountHeader />
      ) : (
        <p className="text-center p-10">
          Авторизируйтесь, чтобы просмотреть профиль.
        </p>
      )}
    </div>
  );
}
export default AccountPage;
