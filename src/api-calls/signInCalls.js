import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-hot-toast";
import { auth } from "../firebase/firebase";
import { validateEmail, validatePassword } from "../utils";

export async function signIn({ email, password }) {
    if (!validateEmail(email)) {
        toast.error("Invalid email");
        return;
    }

    if (!validatePassword(password)) {
        toast.error("Weak password");
        return;
    }

    await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            toast.success("Welcome Ramesh");
        })
        .catch((err) => {
            var message;
            switch (err.message) {
                case 'Firebase: Error (auth/wrong-password).':
                    message = 'Wrong password';
                    break;
                case 'Firebase: Error (auth/user-not-found).':
                    message = 'User not found';
                    break;
                case 'Firebase: Error (auth/invalid-email).':
                    message = 'Invalid email';
                    break;
                case 'Firebase: Error (auth/network-request-failed).':
                    message = 'Netword error';
                    break;
                case 'Firebase: Error (auth/internal-error).':
                    message = 'Login unsuccessful';
                    break;
                default:
                    message = "Something went wrong";
            }
            toast.error(message);
        });
}