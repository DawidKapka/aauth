export const emailValid = (email: string): boolean => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

export const passwordsMatch = (password: string, repeatedPassword: string) => {
    return password === repeatedPassword
}
