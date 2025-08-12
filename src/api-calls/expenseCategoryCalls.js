import axios from "axios";
import { toast } from "react-hot-toast";

export async function getExpenseCategories(user) {
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

    await axios.get("http://www.localhost:5000/api/expensecategories", { headers: { user_token: token } })
        .then(({ data }) => {
            result = data;
        })
        .catch(({ message }) => {
            result = message;
        });
    return result;
}

export async function createExpenseCategory(user, { name, colorCode }) {
    if (name === "") {
        toast.error("Name cannot be empty");
        return -1;
    }
    if (name.length > 15) {
        toast.error("Name can consist of a maximum of 15 characters");
        return -1;
    }

    if (colorCode.length !== 7 || colorCode[0] !== '#') {
        toast.error("Invalid color");
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
    await axios.post("http://www.localhost:5000/api/expensecategories", { name, colorCode }, { headers: { user_token: token } })
        .then(({ data }) => {
            const message = data.message;
            if (message === "Expense category created") {
                id = data.id;
                document.getElementById("categoryModalClose").click();
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