export const validateEmail = (value: string) => {
    if (!value) return "";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return "Invalid email address";
    return "";
};

export const validatePassword = (value: string) => {
    if (!value) return "";
    if (value.length < 8) return "Password must be at least 8 characters";
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) return "Password must contain at least one letter and one number";
    return "";
};

export const validateUsername = (value: string) => {
    if (!value) return "";
    if (value.length < 3) return "Username must be at least 3 characters";
    return "";
};
