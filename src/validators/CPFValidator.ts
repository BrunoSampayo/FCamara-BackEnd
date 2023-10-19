export function checkValidCPF(cpf: string) {
    cpf = cpf.replace(/[^\d]/g, '');


    if (cpf.length !== 11) {
        return false;
    }

    // Check for repeated digits
    if (/(\d)\1{10}/.test(cpf)) {
        return false;
    }

    // Validate the first digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    if (remainder !== parseInt(cpf.charAt(9))) {
        return false;
    }

    // Validate the second digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    if (remainder !== parseInt(cpf.charAt(10))) {
        return false;
    }

    return true;

}