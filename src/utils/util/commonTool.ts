
export function validateNumber(str: string) {
    return /^[0-9]+.?[0-9]*$/.test(str)
}

export function validateEmail(email: string) {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
}