import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';

export default function UnprotectedRoute({ children }) {

    const [user] = useAuthState(auth);

    return (
        user ?
        <Navigate to='/' />
        :
        children
    );
}