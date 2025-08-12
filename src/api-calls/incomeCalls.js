import axios from "axios";
import { toast } from "react-hot-toast";

export async function getIncomes(user) {
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

    await axios.get("http://www.localhost:5000/api/incomes", { headers: { user_token: token } })
        .then(({ data }) => {
            result = data;
        })
        .catch(({ message }) => {
            result = message;
        });
    return result;
}

export async function createIncome(user, { title, amount, balanceAccountId, date, time }, getAllIncomes) {
    if (title === "") {
        toast.error("Name cannot be empty");
        return -1;
    }
    if (title.length > 15) {
        toast.error("Name can consist of a maximum of 15 characters");
        return -1;
    }

    if (isNaN(amount) || amount <= 0) {
        toast.error("Invalid expense amount");
        return -1;
    }

    if (isNaN(balanceAccountId) || balanceAccountId < 1) {
        toast.error("Select account");
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
    await axios.post("http://www.localhost:5000/api/incomes", { title, amount, balanceAccountId, date, time }, { headers: { user_token: token } })
        .then(async ({ data }) => {
            const message = data.message;
            if (message === "Income created") {
                id = data.id;
                await getAllIncomes();
                document.getElementById("incomeModalClose").click();
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

export async function deleteIncome(user, incomeId) {
    if (isNaN(incomeId)) {
        toast.error("Invalid expense");
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
    await axios.delete(`http://localhost:5000/api/incomes/${incomeId}`, { headers: { user_token: token } })
        .then(({ data }) => {
            const message = data.message;
            if (message === "Income deleted") {
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