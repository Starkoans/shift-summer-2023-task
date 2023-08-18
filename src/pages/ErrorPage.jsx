import { Link, useRouteError } from 'react-router-dom';

import ErrorIcon from '../../public/img/ErrorIcon.svg';
import Button from '../atoms/Button.jsx';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="bg-gray-100 p-10 m-10 text-center flex flex-col"
    >
      <h1 className="text-lg font-bold">{error.statusText || 'Упс!'}</h1>
      <div className="self-center h-32 w-32 m-5 ">
        <img
          alt="Error icon"
          src={ErrorIcon}
          className="w-full h-full animate-pulse"
        />
      </div>
      <p>Что-то пошло не так.</p>
      <p className="m-5">
        <i>{error.message}</i>
      </p>
      <Link to={'/'}>
        <Button cn="secondary" child="Вернуться назад" />
      </Link>
    </div>
  );
}
