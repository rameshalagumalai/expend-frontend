import axios from "axios";
import { toast } from "react-hot-toast";

export async function getBalanceAccounts(user) {
    var result, token;

    user && await user.getIdToken(true)
        .then((idToken) => {
            token = idToken;
        })
        .catch(() => {
            result = "Something went wrong";
        });
    if (!token) {
        result = "Try again later";
        return result;
    }

    await axios.get("http://www.localhost:5000/api/balanceaccounts", { headers: { user_token: token } })
        .then(({ data }) => {
            result = data;
        })
        .catch(({ message }) => {
            result = message;
        });
    return result;
}

export async function createBalanceAccount(user, { name, isCash, openingBalance, minimumBalance }) {
    if (name === "") {
        toast.error("Name cannot be empty");
        return -1;
    }
    if (name.length > 15) {
        toast.error("Name can consist of a maximum of 15 characters");
        return -1;
    }

    if (isCash != 0 && isCash != 1) {
        toast.error("Select balance account type");
        return -1;
    }

    if (isNaN(openingBalance) || openingBalance < 0) {
        toast.error("Enter a valid opening balance");
        return -1;
    }

    if (isNaN(minimumBalance) || minimumBalance < 0) {
        toast.error("Enter a valid minimum balance");
        return -1;
    }

    var token;
    user && await user.getIdToken(true)
        .then((idToken) => {
            token = idToken;
        })
        .catch(() => {
            toast.error("Something went wrong");
        });
    if (!token) {
        toast.error("Try again later");
        return -1;
    }

    var id = -1;
    await axios.post("http://www.localhost:5000/api/balanceaccounts", { name, isCash: parseInt(isCash), openingBalance, minimumBalance }, { headers: { user_token: token } })
        .then(({ data }) => {
            const message = data.message;
            if (message === "Balance account created") {
                id = data.id;
                document.getElementById("balanceAccountModalClose").click();
                toast.success(message);
            } else {
                toast.error(message);
            }
        })
        .catch(({ message }) => {
            toast.error(message);
        });
    return id;
}