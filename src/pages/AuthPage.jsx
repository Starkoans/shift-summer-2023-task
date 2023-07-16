import { Outlet } from 'react-router-dom';

function AuthPage() {
  return (
    <div className="flex justify-center">
      <div>
        <Outlet />
      </div>
    </div>
  );
}
export default AuthPage;
