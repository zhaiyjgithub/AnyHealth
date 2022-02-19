
export function validateNumber(str: string) {
    return /^[0-9]+.?[0-9]*$/.test(str)
}