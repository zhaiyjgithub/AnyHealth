
export function validateNumber(number: string) {
    return number.length > 0 && /^[0-9]+.?[0-9]*$/.test(number)
}

export function validateEmail(email: string) {
    return email.length > 0 && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
}
