function validatePassword(password) {
  const hasCapitalLetter = /[A-Z]/.test(password);
  const hasTwoNumbers = /\d.*\d/.test(password);

  if (!hasCapitalLetter) {
    return [true, 'La contraseña debe contener al menos una letra mayúscula'];
  }

  if (!hasTwoNumbers) {
    return [true, 'La contraseña debe contener al menos dos números'];
  }

  return [false, ''];
}

export function loginValidators(password, username) {
  if (username === '') {
    return [true, 'Debe proporcionar un usuario'];
  }
  if (password === '') {
    return [true, 'Debe proporcionar una contraseña'];
  }

  const passwordValidationResult = validatePassword(password);
  if (passwordValidationResult[0]) {
    return passwordValidationResult;
  }

  return [false, ''];
}

export function registerValidators(password, email) {
  if (email === '' || email === undefined) {
    return [true, 'Debe proporcionar un correo'];
  }
  if (password === '') {
    return [true, 'Debe proporcionar una contraseña'];
  }
  const passwordValidationResult = validatePassword(password);
  if (passwordValidationResult[0]) {
    return passwordValidationResult;
  }
  return [false, ''];
}