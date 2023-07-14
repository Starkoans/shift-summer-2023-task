import { Outlet } from 'react-router-dom';

function AuthPage() {
  return (
    <div className="flex justify-center">
      <div className="p-10 bg-white text-black  max-w-sm rounded-xl flex-col flex justify-center text-center m-10">
        <Outlet />
      </div>
    </div>
  );
}
export default AuthPage;
