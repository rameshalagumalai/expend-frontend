import axios from "axios";

export async function getUnusedColors(user) {
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

    await axios.get("http://www.localhost:5000/api/categorycolors?unUsed=1", { headers: { user_token: token } })
        .then(({ data }) => {
            result = data;
        })
        .catch(({ message }) => {
            result = message;
        });
    return result;    
}