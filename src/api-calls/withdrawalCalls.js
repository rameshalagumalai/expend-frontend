import axios from "axios";
import { toast } from "react-hot-toast";

export async function getWithdrawals(user) {
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

    await axios.get("http://www.localhost:5000/api/withdrawals", { headers: { user_token: token } })
        .then(({ data }) => {
            result = data;
        })
        .catch(({ message }) => {
            result = message;
        });
    return result;
}

export async function createWithdrawal(user, { amount, fromAccountId, toAccountId, date, time }, getAllWithdrawals) {
    if (isNaN(amount) || amount <= 0) {
        toast.error("Invalid withdrawal amount");
        return -1;
    }

    if (fromAccountId == toAccountId) {
        toast.error("Cannot make a withdrawal within the same account");
        return -1;
    }

    if (isNaN(fromAccountId) || fromAccountId < 1) {
        toast.error("Select from account");
        return -1;
    }

    if (isNaN(toAccountId) || toAccountId < 1) {
        toast.error("Select to account");
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
    await axios.post("http://www.localhost:5000/api/withdrawals", { amount, fromAccountId, toAccountId, date, time }, { headers: { user_token: token } })
        .then(async ({ data }) => {
            const message = data.message;
            if (message === "Withdrawal created") {
                id = data.id;
                await getAllWithdrawals();
                document.getElementById("withdrawalModalClose").click();
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

export async function deleteWithdrawal(user, withdrawalId) {
    if (isNaN(withdrawalId)) {
        toast.error("Invalid withdrawal");
        return;
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
        return false;
    }

    var deleted = false;
    await axios.delete(`http://localhost:5000/api/withdrawals/${withdrawalId}`, { headers: { user_token: token } })
        .then(({ data }) => {
            const message = data.message;
            if (message === "Withdrawal deleted") {
                deleted = true;
                toast.success(message);
            } else {
                toast.error(message);
            }
        })
        .catch(({ message }) => {
            toast.error(message);
        });
    return deleted;
}