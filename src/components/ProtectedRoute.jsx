import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';

export default function ProtectedRoute({ children }) {

    const [user] = useAuthState(auth);

    return (
        user ?
        children
        :
        <Navigate to='/signin' />
    );
}