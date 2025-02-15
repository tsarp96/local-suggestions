import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth) as AuthState;
  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: !!auth.token,
    isAdmin: auth.user?.role === 'ADMIN'
  };
}; 