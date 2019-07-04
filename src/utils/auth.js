// import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const RefreshTokenKey="refreshToken"

export const TokenName = 'Authorization'
export const RefreshTokenName = 'refreshAuthorization'

export function getToken() {
  return localStorage.getItem(TokenKey);
  // return Cookies.get(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token);
  // return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return localStorage.clear();
  // return Cookies.remove(TokenKey)
}

export function getRefreshToken() {
  return localStorage.getItem(RefreshTokenKey);
  // return Cookies.get(RefreshTokenKey)
}

export function setRefreshToken(_RefreshToken) {
  return localStorage.setItem(RefreshTokenKey, _RefreshToken);
  // return Cookies.set(RefreshTokenKey, _RefreshToken)
}

export function getTokenTime() {
  return localStorage.getItem("tokenTime");
}

export function setTokenTime(_tokenTime) {
  return localStorage.setItem("tokenTime", _tokenTime);
}

export function getExpires() {
  return localStorage.getItem("tokenExpires");
}

export function setExpires(_tokenExpires) {
  return localStorage.setItem("tokenExpires", _tokenExpires);
}
