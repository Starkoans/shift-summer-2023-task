import { useSelector } from 'react-redux';

export default function useAuth() {
  const { phone, code, token, username, email, status, error } = useSelector(
    state => state.user
  );

  return {
    phone,
    code,
    token,
    username,
    email,
    status,
    error,
  };
}
