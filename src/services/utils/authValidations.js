import { jwtDecode } from "jwt-decode";
import { setNotification } from "../notification/actions";
import { useDispatch } from "react-redux";

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

export function registerValidators(name, surname, password, email) {
  if (name === '' || name === undefined) {
    return [true, 'Debe proporcionar un nombre'];
  }
  if (surname === '' || surname === undefined) {
    return [true, 'Debe proporcionar un apellido'];
  }
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

export function getIsThereToken() {
  const token = localStorage.getItem('access_token');
  if (token) {
    return true
  } else {
    return false
  }
}

export function getIsTokenExpired() {
  const token = localStorage.getItem('access_token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const tokenExpired = decoded.exp < currentTime;
      return tokenExpired
    } catch (error) {
      return false
    }
  } else {
    return false
  }
}

export function getUserRole() {
  const token = localStorage.getItem('access_token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.data.rol
    } catch (error) {
      return
    }
  } else {
    return false
  }
}

export function getIsUserActive() {
  const token = localStorage.getItem('access_token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.data.active
    } catch (error) {
      return
    }
  } else {
    return false
  }
}