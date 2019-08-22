const TokenKey = 'Admin-Token'
const RefreshTokenKey="refreshToken"

export const TokenName = 'Authorization'
export const RefreshTokenName = 'refreshAuthorization'

export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token);

}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}

export function getRefreshToken() {
  return localStorage.getItem(RefreshTokenKey);

}

export function setRefreshToken(_RefreshToken) {
  return localStorage.setItem(RefreshTokenKey, _RefreshToken);

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
