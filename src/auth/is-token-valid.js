// src/auth/is-token-valid.js
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

function isTokenValid() {
  const token = Cookies.get("token");

  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.decode(token); // Используем decode вместо verify для проверки exp
    return decoded && !isTokenExpired(decoded.exp);
  } catch (error) {
    return false;
  }
}

function isTokenExpired(expiration) {
  return Date.now() >= expiration * 1000;
}

export default isTokenValid;
