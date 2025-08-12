export function getFormattedDate(instance) {
    return new Date(instance).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" });
}

export function getFormattedTime(instance) {
    return new Date(instance).toLocaleString('en-us', { hour: "numeric", minute: "numeric" });
}

export function getDFormattedDateTime(instance) {
    return new Date(instance).toLocaleString('en-us', { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" });
}

export function validateEmail (email) {
    return (email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));
}

export function validatePassword (password) {
    return (password.match(/^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,16}$/));
}
